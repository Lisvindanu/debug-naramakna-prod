/**
 * Analytics Controller
 * Handles analytics tracking and reporting
 */

const { Analytics, Post, User } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

class AnalyticsController {

  /**
   * Track user interaction
   * POST /api/analytics/track
   */
  static async track(req, res) {
    try {
      const {
        content_id,
        content_type,
        event_type,
        additional_data = {}
      } = req.body;

      // Validate required fields
      if (!content_id || !content_type || !event_type) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: content_id, content_type, event_type'
        });
      }

      // Verify content exists
      const content = await Post.findByPk(content_id);
      if (!content) {
        return res.status(404).json({
          success: false,
          message: 'Content not found'
        });
      }

      // Create analytics record
      const analyticsData = {
        content_id,
        content_type,
        event_type,
        user_ip: req.ip || req.connection.remoteAddress,
        user_agent: req.get('User-Agent'),
        referrer: req.get('Referer'),
        additional_data,
        timestamp: new Date()
      };

      // Add user_id if authenticated
      if (req.user) {
        analyticsData.user_id = req.user.id;
      }

      await Analytics.create(analyticsData);

      res.json({
        success: true,
        message: 'Event tracked successfully'
      });

    } catch (error) {
      console.error('Error tracking analytics:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to track event',
        error: error.message
      });
    }
  }

  /**
   * Get content performance metrics
   * GET /api/analytics/content/:id
   */
  static async getContentMetrics(req, res) {
    try {
      const { id } = req.params;
      const { 
        period = 'week', // week, month, year, all
        group_by = 'day' // hour, day, week, month
      } = req.query;

      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      
      switch (period) {
        case 'week':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(endDate.getMonth() - 1);
          break;
        case 'year':
          startDate.setFullYear(endDate.getFullYear() - 1);
          break;
        default:
          startDate.setFullYear(2020, 0, 1); // All time
      }

      // Get event counts by type
      const eventCounts = await Analytics.findAll({
        where: {
          content_id: id,
          timestamp: {
            [Op.between]: [startDate, endDate]
          }
        },
        attributes: [
          'event_type',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['event_type'],
        raw: true
      });

      // Get time series data
      let dateFormat;
      switch (group_by) {
        case 'hour':
          dateFormat = '%Y-%m-%d %H:00:00';
          break;
        case 'day':
          dateFormat = '%Y-%m-%d';
          break;
        case 'week':
          dateFormat = '%Y-%u';
          break;
        case 'month':
          dateFormat = '%Y-%m';
          break;
        default:
          dateFormat = '%Y-%m-%d';
      }

      const timeSeriesData = await Analytics.findAll({
        where: {
          content_id: id,
          timestamp: {
            [Op.between]: [startDate, endDate]
          }
        },
        attributes: [
          [sequelize.fn('DATE_FORMAT', sequelize.col('timestamp'), dateFormat), 'period'],
          'event_type',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['period', 'event_type'],
        order: [['period', 'ASC']],
        raw: true
      });

      // Get geographic data
      const geoData = await Analytics.findAll({
        where: {
          content_id: id,
          timestamp: {
            [Op.between]: [startDate, endDate]
          },
          country: { [Op.not]: null }
        },
        attributes: [
          'country',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['country'],
        order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
        limit: 10,
        raw: true
      });

      res.json({
        success: true,
        data: {
          content_id: id,
          period: period,
          metrics: {
            events: eventCounts.reduce((acc, item) => {
              acc[item.event_type] = parseInt(item.count);
              return acc;
            }, {}),
            timeline: timeSeriesData,
            geography: geoData
          }
        }
      });

    } catch (error) {
      console.error('Error fetching content metrics:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch content metrics',
        error: error.message
      });
    }
  }

  /**
   * Get overall platform analytics
   * GET /api/analytics/dashboard
   */
  static async getDashboard(req, res) {
    try {
      const { period = 'month' } = req.query;

      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      
      switch (period) {
        case 'week':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(endDate.getMonth() - 1);
          break;
        case 'year':
          startDate.setFullYear(endDate.getFullYear() - 1);
          break;
        default:
          startDate.setMonth(endDate.getMonth() - 1);
      }

      // Get content type performance
      const contentTypeMetrics = await Analytics.findAll({
        where: {
          timestamp: {
            [Op.between]: [startDate, endDate]
          }
        },
        attributes: [
          'content_type',
          'event_type',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['content_type', 'event_type'],
        raw: true
      });

      // Get top performing content
      const topContent = await Analytics.findAll({
        where: {
          event_type: 'view',
          timestamp: {
            [Op.between]: [startDate, endDate]
          }
        },
        attributes: [
          'content_id',
          'content_type',
          [sequelize.fn('COUNT', sequelize.col('Analytics.id')), 'views']
        ],
        include: [{
          model: Post,
          as: 'content',
          attributes: ['post_title', 'post_type']
        }],
        group: ['content_id'],
        order: [[sequelize.fn('COUNT', sequelize.col('Analytics.id')), 'DESC']],
        limit: 10,
        raw: true
      });

      // Get daily activity
      const dailyActivity = await Analytics.findAll({
        where: {
          timestamp: {
            [Op.between]: [startDate, endDate]
          }
        },
        attributes: [
          [sequelize.fn('DATE', sequelize.col('timestamp')), 'date'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'total_events']
        ],
        group: [sequelize.fn('DATE', sequelize.col('timestamp'))],
        order: [[sequelize.fn('DATE', sequelize.col('timestamp')), 'ASC']],
        raw: true
      });

      // Get user engagement metrics
      const engagementMetrics = await Analytics.findAll({
        where: {
          timestamp: {
            [Op.between]: [startDate, endDate]
          }
        },
        attributes: [
          'event_type',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
          [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('user_ip'))), 'unique_users']
        ],
        group: ['event_type'],
        raw: true
      });

      res.json({
        success: true,
        data: {
          period,
          contentTypes: this.formatContentTypeMetrics(contentTypeMetrics),
          topContent: topContent.map(item => ({
            id: item.content_id,
            title: item['content.post_title'],
            type: item.content_type,
            views: parseInt(item.views)
          })),
          dailyActivity,
          engagement: engagementMetrics
        }
      });

    } catch (error) {
      console.error('Error fetching dashboard analytics:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch dashboard analytics',
        error: error.message
      });
    }
  }

  /**
   * Get real-time analytics
   * GET /api/analytics/realtime
   */
  static async getRealtime(req, res) {
    try {
      // Last 30 minutes
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

      const realtimeData = await Analytics.findAll({
        where: {
          timestamp: {
            [Op.gte]: thirtyMinutesAgo
          }
        },
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('id')), 'total_events'],
          [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('user_ip'))), 'active_users'],
          [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('content_id'))), 'content_viewed']
        ],
        raw: true
      });

      // Recent events
      const recentEvents = await Analytics.findAll({
        where: {
          timestamp: {
            [Op.gte]: thirtyMinutesAgo
          }
        },
        include: [{
          model: Post,
          as: 'content',
          attributes: ['post_title', 'post_type']
        }],
        order: [['timestamp', 'DESC']],
        limit: 20
      });

      res.json({
        success: true,
        data: {
          timeframe: '30 minutes',
          summary: realtimeData[0] || {
            total_events: 0,
            active_users: 0,
            content_viewed: 0
          },
          recentEvents: recentEvents.map(event => ({
            id: event.id,
            contentId: event.content_id,
            contentTitle: event.content?.post_title,
            contentType: event.content_type,
            eventType: event.event_type,
            timestamp: event.timestamp,
            userIp: event.user_ip?.replace(/\.\d+$/, '.xxx') // Anonymize IP
          }))
        }
      });

    } catch (error) {
      console.error('Error fetching realtime analytics:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch realtime analytics',
        error: error.message
      });
    }
  }

  /**
   * Helper: Format content type metrics
   */
  static formatContentTypeMetrics(metrics) {
    const formatted = {};
    
    metrics.forEach(metric => {
      if (!formatted[metric.content_type]) {
        formatted[metric.content_type] = {};
      }
      formatted[metric.content_type][metric.event_type] = parseInt(metric.count);
    });

    return formatted;
  }
}

module.exports = AnalyticsController;