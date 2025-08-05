/**
 * Universal Content Controller
 * Handles all content types: articles, YouTube videos, TikTok videos
 */

const { Post, PostMeta, User, TermTaxonomy, TermRelationship, Analytics } = require('../models');
const ContentHelpers = require('../models/ContentHelpers');
const { Op } = require('sequelize');

class ContentController {
  
  /**
   * Get mixed content feed (all content types)
   * GET /api/content/feed
   */
  static async getFeed(req, res) {
    try {
      const { 
        page = 1, 
        limit = 20, 
        type = null, 
        category = null,
        search = null,
        status = 'publish'
      } = req.query;

      const offset = (page - 1) * limit;
      const whereClause = { post_status: status };

      // Filter by content type
      if (type) {
            const validTypes = ['post', 'youtube_video', 'tiktok_video', 'page'];
    if (validTypes.includes(type)) {
          whereClause.post_type = type;
        }
      }

      // Search functionality
      if (search) {
        whereClause[Op.or] = [
          { post_title: { [Op.like]: `%${search}%` } },
          { post_content: { [Op.like]: `%${search}%` } }
        ];
      }

      const include = [
        {
          model: PostMeta,
          as: 'meta'
        },
        {
          model: User,
          as: 'author',
          attributes: ['ID', 'display_name', 'user_email']
        }
      ];

      // Filter by category if specified
      if (category) {
        include.push({
          model: TermTaxonomy,
          as: 'categories',
          where: { taxonomy: 'category' },
          include: [{
            model: require('../models/Term'),
            as: 'term',
            where: { slug: category }
          }]
        });
      }

      const result = await Post.findAndCountAll({
        where: whereClause,
        include,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['post_date', 'DESC']],
        distinct: true
      });

      // Format response with metadata
      const formattedPosts = result.rows.map(post => ContentController.formatPostWithMeta(post));

      res.json({
        success: true,
        data: {
          posts: formattedPosts,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(result.count / limit),
            totalItems: result.count,
            itemsPerPage: parseInt(limit)
          }
        }
      });

    } catch (error) {
      console.error('Error fetching content feed:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch content feed',
        error: error.message
      });
    }
  }

  /**
   * Get single content by ID
   * GET /api/content/:id
   */
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const post = await Post.findByPk(id, {
        include: [
          {
            model: PostMeta,
            as: 'meta'
          },
          {
            model: User,
            as: 'author',
            attributes: ['ID', 'display_name', 'user_email']
          },
          {
            model: TermTaxonomy,
            as: 'categories',
            include: [{
              model: require('../models/Term'),
              as: 'term'
            }]
          }
        ]
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Content not found'
        });
      }

      // Track view
      await ContentController.trackAnalytics(req, post.ID, post.post_type, 'view');

      const formattedPost = ContentController.formatPostWithMeta(post);

      res.json({
        success: true,
        data: formattedPost
      });

    } catch (error) {
      console.error('Error fetching content:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch content',
        error: error.message
      });
    }
  }

  /**
   * Get content by type (articles, youtube videos, tiktok videos)
   * GET /api/content/type/:type
   */
  static async getByType(req, res) {
    try {
      const { type } = req.params;
      const { page = 1, limit = 20 } = req.query;

      // Validate content type
      const validTypes = ['post', 'youtube_video', 'tiktok_video', 'page'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          success: false,
          message: `Invalid content type. Valid types: ${validTypes.join(', ')}`
        });
      }

      const result = await ContentHelpers.getContentByType(type, {
        limit: parseInt(limit),
        offset: (page - 1) * limit
      });

      const formattedPosts = result.rows.map(post => ContentController.formatPostWithMeta(post));

      res.json({
        success: true,
        data: {
          posts: formattedPosts,
          contentType: type,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(result.count / limit),
            totalItems: result.count,
            itemsPerPage: parseInt(limit)
          }
        }
      });

    } catch (error) {
      console.error('Error fetching content by type:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch content by type',
        error: error.message
      });
    }
  }

  /**
   * Create new content (article, video)
   * POST /api/content
   */
  static async create(req, res) {
    try {
      console.log('Content controller - req.body:', req.body);
      console.log('Content controller - req.files:', req.files);
      
      // Handle both JSON and FormData requests with validation
      const type = req.body.type || 'post';
      const title = req.body.title || 'Untitled Post';
      const content = req.body.content || '';
      const excerpt = req.body.excerpt || '';
      const status = req.body.status || 'draft';
      // Always use authenticated user's ID for security - handle both 'id' and 'ID'
      const author_id = req.user?.id || req.user?.ID;
      
      console.log('req.user:', req.user);
      console.log('author_id from req.user:', author_id);
      
      // Validate author exists in database
      if (!author_id) {
        return res.status(400).json({
          success: false,
          message: 'User not authenticated properly'
        });
      }
      const meta = req.body.meta ? JSON.parse(req.body.meta) : {};
      const categories = req.body.categories ? JSON.parse(req.body.categories) : [];
      
      console.log('Parsed data:', { type, title, content, status, author_id });

      // TEMPORARILY DISABLED - Debug content type validation
      console.log('Content type received:', type);
      console.log('Type of type:', typeof type);
      console.log('Is type valid?', ['post', 'youtube_video', 'tiktok_video', 'page'].includes(type));
      
      // Skip validation to debug FormData issue
      // const validTypes = ['post', 'youtube_video', 'tiktok_video', 'page'];
      // if (!validTypes.includes(type)) {
      //   return res.status(400).json({
      //     success: false,
      //     message: `Invalid content type. Valid types: ${validTypes.join(', ')}`
      //   });
      // }

      // Create post with all required fields
      const post = await Post.create({
        post_author: author_id,
        post_title: title,
        post_content: content,
        post_excerpt: excerpt,
        post_type: type,
        post_status: status,
        post_name: title ? ContentController.generateSlug(title) : `post-${Date.now()}`,
        post_date: new Date(),
        post_modified: new Date(),
        post_parent: 0,
        menu_order: 0,
        comment_count: 0,
        to_ping: '',
        pinged: '',
        post_content_filtered: '',
        guid: `${req.protocol}://${req.get('host')}/content/${type}/${Date.now()}`
      });

      // Add metadata
      if (Object.keys(meta).length > 0) {
        for (const [key, value] of Object.entries(meta)) {
          await PostMeta.create({
            post_id: post.ID,
            meta_key: key,
            meta_value: typeof value === 'object' ? JSON.stringify(value) : value.toString()
          });
        }
      }

      // Add categories
      if (categories.length > 0) {
        for (const categoryId of categories) {
          await TermRelationship.create({
            object_id: post.ID,
            term_taxonomy_id: categoryId,
            term_order: 0
          });
        }
      }

      res.status(201).json({
        success: true,
        message: 'Content created successfully',
        data: {
          id: post.ID,
          type: post.post_type,
          title: post.post_title,
          status: post.post_status
        }
      });

    } catch (error) {
      console.error('Error creating content:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create content',
        error: error.message
      });
    }
  }

  /**
   * Update existing content
   * PUT /api/content/:id
   */
  static async update(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        content,
        excerpt,
        status,
        meta = {},
        categories = []
      } = req.body;

      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Content not found'
        });
      }

      // Update post
      await post.update({
        ...(title && { post_title: title }),
        ...(content && { post_content: content }),
        ...(excerpt && { post_excerpt: excerpt }),
        ...(status && { post_status: status }),
        post_modified: new Date()
      });

      // Update metadata
      if (Object.keys(meta).length > 0) {
        for (const [key, value] of Object.entries(meta)) {
          await PostMeta.upsert({
            post_id: post.ID,
            meta_key: key,
            meta_value: typeof value === 'object' ? JSON.stringify(value) : value.toString()
          });
        }
      }

      res.json({
        success: true,
        message: 'Content updated successfully',
        data: {
          id: post.ID,
          title: post.post_title,
          status: post.post_status
        }
      });

    } catch (error) {
      console.error('Error updating content:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update content',
        error: error.message
      });
    }
  }

  /**
   * Delete content
   * DELETE /api/content/:id
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const { permanent = false } = req.query;

      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Content not found'
        });
      }

      if (permanent === 'true') {
        // Permanent deletion
        await PostMeta.destroy({ where: { post_id: id } });
        await TermRelationship.destroy({ where: { object_id: id } });
        await post.destroy();
      } else {
        // Soft deletion (move to trash)
        await post.update({ 
          post_status: 'trash',
          post_modified: new Date()
        });
      }

      res.json({
        success: true,
        message: permanent === 'true' ? 'Content permanently deleted' : 'Content moved to trash'
      });

    } catch (error) {
      console.error('Error deleting content:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete content',
        error: error.message
      });
    }
  }

  /**
   * Get content statistics
   * GET /api/content/stats
   */
  static async getStats(req, res) {
    try {
      const stats = await Promise.all([
        Post.count({ where: { post_type: 'post', post_status: 'publish' } }),
        Post.count({ where: { post_type: 'youtube_video', post_status: 'publish' } }),
        Post.count({ where: { post_type: 'tiktok_video', post_status: 'publish' } }),
        Post.count({ where: { post_status: 'draft' } }),
        Post.count({ where: { post_status: 'trash' } })
      ]);

      res.json({
        success: true,
        data: {
          articles: stats[0],
          youtube_videos: stats[1],
          tiktok_videos: stats[2],
          drafts: stats[3],
          trash: stats[4],
          total_published: stats[0] + stats[1] + stats[2]
        }
      });

    } catch (error) {
      console.error('Error fetching content stats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch content statistics',
        error: error.message
      });
    }
  }

  /**
   * Helper: Format post with metadata
   */
  static formatPostWithMeta(post) {
    const postData = post.toJSON();
    
    // Convert meta array to object
    const metadata = {};
    if (postData.meta) {
      postData.meta.forEach(meta => {
        metadata[meta.meta_key] = meta.meta_value;
      });
    }

    return {
      id: postData.ID,
      title: postData.post_title,
      content: postData.post_content,
      excerpt: postData.post_excerpt,
      type: postData.post_type,
      status: postData.post_status,
      slug: postData.post_name,
      date: postData.post_date,
      modified: postData.post_modified,
      author: postData.author,
      categories: postData.categories || [],
      metadata,
      // Content type specific formatting
      ...(postData.post_type === 'youtube_video' && {
        youtube: {
          videoId: metadata._external_id,
          channelTitle: metadata._youtube_channel_title,
          viewCount: parseInt(metadata._youtube_view_count) || 0,
          likeCount: parseInt(metadata._youtube_like_count) || 0,
          thumbnailUrl: metadata._thumbnail_url,
          sourceUrl: metadata._source_url
        }
      }),
      ...(postData.post_type === 'tiktok_video' && {
        tiktok: {
          videoId: metadata._external_id,
          username: metadata._tiktok_author_username,
          displayName: metadata._tiktok_author_display_name,
          playCount: parseInt(metadata._tiktok_play_count) || 0,
          likeCount: parseInt(metadata._tiktok_like_count) || 0,
          coverUrl: metadata._tiktok_cover_url,
          sourceUrl: metadata._source_url
        }
      })
    };
  }

  /**
   * Helper: Generate URL slug
   */
  static generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  /**
   * Helper: Track analytics
   */
  static async trackAnalytics(req, contentId, contentType, eventType) {
    try {
      await Analytics.create({
        content_id: contentId,
        content_type: contentType,
        event_type: eventType,
        user_ip: req.ip || req.connection.remoteAddress,
        user_agent: req.get('User-Agent'),
        referrer: req.get('Referer'),
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error tracking analytics:', error);
    }
  }
}

module.exports = ContentController;