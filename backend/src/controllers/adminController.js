const { User, Post, Comment, UserProfile, sequelize } = require('../models');
const { Op } = require('sequelize');

class AdminController {
  /**
   * Admin: Delete user account
   * DELETE /api/admin/users/:id
   */
  static async deleteUser(req, res) {
    const transaction = await sequelize.transaction();
    
    try {
      const { id } = req.params;

      // Check if user is admin or superadmin
      if (!req.user || (req.user.user_role !== 'admin' && req.user.user_role !== 'superadmin')) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Admin privileges required.'
        });
      }

      // Prevent deleting superadmin (only superadmin can delete superadmin)
      const targetUser = await User.findByPk(id);
      if (!targetUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      if (targetUser.user_role === 'superadmin' && req.user.user_role !== 'superadmin') {
        return res.status(403).json({
          success: false,
          message: 'Only SuperAdmin can delete SuperAdmin accounts'
        });
      }

      // Prevent deleting self
      if (parseInt(id) === req.user.ID) {
        return res.status(400).json({
          success: false,
          message: 'You cannot delete your own account'
        });
      }

      // Delete user's profile
      await UserProfile.destroy({
        where: { user_id: id },
        transaction
      });

      // Update user's posts to mark as deleted author
      await Post.update(
        { 
          post_author: null,
          post_title: `[DELETED USER] ${new Date().toISOString().split('T')[0]} - ` + sequelize.col('post_title')
        },
        { 
          where: { post_author: id },
          transaction
        }
      );

      // Update user's comments to mark as deleted author
      await Comment.update(
        { 
          comment_author: '[DELETED USER]',
          comment_author_email: 'deleted@example.com',
          user_id: null
        },
        { 
          where: { user_id: id },
          transaction
        }
      );

      // Delete the user
      await targetUser.destroy({ transaction });

      await transaction.commit();

      res.json({
        success: true,
        message: `User "${targetUser.display_name || targetUser.user_login}" has been deleted.`,
        data: {
          deletedUser: {
            id: targetUser.ID,
            login: targetUser.user_login,
            display_name: targetUser.display_name,
            role: targetUser.user_role
          }
        }
      });

    } catch (error) {
      await transaction.rollback();
      console.error('Admin delete user error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete user'
      });
    }
  }

  /**
   * Admin: Suspend/Unsuspend user (toggle posting ability)
   * PATCH /api/admin/users/:id/suspend
   */
  static async suspendUser(req, res) {
    try {
      const { id } = req.params;
      const { suspend } = req.body; // true to suspend, false to unsuspend

      // Check if user is admin or superadmin
      if (!req.user || (req.user.user_role !== 'admin' && req.user.user_role !== 'superadmin')) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Admin privileges required.'
        });
      }

      const targetUser = await User.findByPk(id);
      if (!targetUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Prevent suspending superadmin (only superadmin can suspend superadmin)
      if (targetUser.user_role === 'superadmin' && req.user.user_role !== 'superadmin') {
        return res.status(403).json({
          success: false,
          message: 'Only SuperAdmin can suspend SuperAdmin accounts'
        });
      }

      // Prevent suspending self
      if (parseInt(id) === req.user.ID) {
        return res.status(400).json({
          success: false,
          message: 'You cannot suspend your own account'
        });
      }

      // Update user status
      const newStatus = suspend ? 'suspended' : 'active';
      await targetUser.update({ user_status: newStatus });

      const action = suspend ? 'suspended' : 'unsuspended';
      const message = suspend 
        ? `User "${targetUser.display_name || targetUser.user_login}" has been suspended and cannot post content.`
        : `User "${targetUser.display_name || targetUser.user_login}" has been unsuspended and can post content.`;

      res.json({
        success: true,
        message,
        data: {
          user: {
            id: targetUser.ID,
            login: targetUser.user_login,
            display_name: targetUser.display_name,
            status: newStatus,
            action
          }
        }
      });

    } catch (error) {
      console.error('Admin suspend user error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update user status'
      });
    }
  }

  /**
   * Admin: Get all users for management
   * GET /api/admin/users
   */
  static async getAllUsers(req, res) {
    try {
      const { page = 1, limit = 20, role, status, search } = req.query;
      const offset = (page - 1) * limit;

      // Check if user is admin or superadmin
      if (!req.user || (req.user.user_role !== 'admin' && req.user.user_role !== 'superadmin')) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Admin privileges required.'
        });
      }

      let whereClause = {};

      // Filter by role
      if (role && role !== 'all') {
        whereClause.user_role = role;
      }

      // Filter by status
      if (status && status !== 'all') {
        whereClause.user_status = status;
      }

      // Search by username or email
      if (search) {
        whereClause[Op.or] = [
          { user_login: { [Op.like]: `%${search}%` } },
          { user_email: { [Op.like]: `%${search}%` } },
          { display_name: { [Op.like]: `%${search}%` } }
        ];
      }

      const result = await User.findAndCountAll({
        where: whereClause,
        attributes: ['ID', 'user_login', 'user_email', 'display_name', 'user_role', 'user_status', 'user_registered'],
        include: [
          {
            model: UserProfile,
            as: 'profile',
            attributes: ['profile_image', 'birth_date', 'gender', 'city', 'profession'],
            required: false
          }
        ],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['user_registered', 'DESC']]
      });

      const users = result.rows.map(user => ({
        id: user.ID,
        login: user.user_login,
        email: user.user_email,
        display_name: user.display_name,
        role: user.user_role,
        status: user.user_status || 'active',
        registered: user.user_registered,
        profile_image: user.profile?.profile_image ? `http://localhost:3001${user.profile.profile_image}` : null,
        profile_complete: !!(user.profile?.birth_date && user.profile?.gender && user.profile?.city)
      }));

      res.json({
        success: true,
        data: {
          users,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(result.count / parseInt(limit)),
            totalItems: result.count,
            itemsPerPage: parseInt(limit)
          }
        }
      });

    } catch (error) {
      console.error('Admin get users error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch users'
      });
    }
  }
}

module.exports = AdminController;