const { Post, PostMeta, User, sequelize } = require('../models');
const { Op } = require('sequelize');
const path = require('path');

class WriterController {
  /**
   * Create new article
   * POST /api/writer/articles
   */
  static async createArticle(req, res) {
    const transaction = await sequelize.transaction();
    
    try {
      // console.log('🔧 Debug: Create article called');
      // console.log('🔧 Debug: Request user:', req.user?.ID, req.user?.login);
      
      const {
        title,
        content,
        description,
        summary_social,
        channel,
        topic,
        keyword,
        publish_date,
        location,
        mark_as_18_plus,
        status = 'draft',
        featured_image
      } = req.body;



      // Validate required fields
      if (!title || !content || !description || !summary_social || !channel) {
        return res.status(400).json({
          success: false,
          message: 'Title, content, description, summary social, and channel are required'
        });
      }

      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);

      // Create post
      const post = await Post.create({
        post_author: req.user.ID,
        post_date: publish_date ? new Date(publish_date) : new Date(),
        post_date_gmt: publish_date ? new Date(publish_date) : new Date(),
        post_content: content,
        post_title: title,
        post_excerpt: description,
        post_status: status === 'published' ? 'publish' : 'draft',
        comment_status: 'closed',
        ping_status: 'closed',
        post_name: slug,
        post_type: 'post',
        to_ping: '', // Required field
        pinged: '', // Required field
        post_content_filtered: '', // Required field
        guid: '', // Will be updated after creation
        post_password: ''
      }, { transaction });

      // Handle featured image
      let thumbnailId = null;
      
      if (featured_image) {
        
        try {
          // Find existing attachment post for the image
          const existingAttachment = await Post.findOne({
            where: { guid: featured_image, post_type: 'attachment' }
          });

          if (existingAttachment) {
            thumbnailId = existingAttachment.ID;
          } else {
            // Create new attachment post
            const attachmentPost = await Post.create({
              post_author: req.user.ID,
              post_date: new Date(),
              post_date_gmt: new Date(),
              post_content: '',
              post_title: `Attachment for ${title}`,
              post_excerpt: '',
              post_status: 'inherit',
              comment_status: 'closed',
              ping_status: 'closed',
              post_name: '',
              post_type: 'attachment',
              to_ping: '',
              pinged: '',
              post_content_filtered: '',
              guid: featured_image,
              post_password: '',
              post_mime_type: 'image/jpeg'
            }, { transaction });
            
            thumbnailId = attachmentPost.ID;
          }
        } catch (attachmentError) {
          console.error('❌ Error handling featured image attachment:', attachmentError);
          // Continue without featured image instead of failing entire article creation
          thumbnailId = null;
        }
      }

      // Create post meta
      const metaData = [
        { post_id: post.ID, meta_key: '_aioseo_description', meta_value: description },
        { post_id: post.ID, meta_key: '_summary_social', meta_value: summary_social },
        { post_id: post.ID, meta_key: '_channel', meta_value: channel },
        { post_id: post.ID, meta_key: '_topic', meta_value: topic || '' },
        { post_id: post.ID, meta_key: '_keyword', meta_value: keyword || '' },
        { post_id: post.ID, meta_key: '_location', meta_value: location || '' },
        { post_id: post.ID, meta_key: '_mark_as_18_plus', meta_value: mark_as_18_plus ? '1' : '0' },
        { post_id: post.ID, meta_key: '_edit_last', meta_value: req.user.ID.toString() }
      ];

      // Add thumbnail ID if we have featured image
      if (thumbnailId) {
        metaData.push({ post_id: post.ID, meta_key: '_thumbnail_id', meta_value: thumbnailId.toString() });
      }

      await PostMeta.bulkCreate(metaData, { transaction });

      await transaction.commit();

      res.status(201).json({
        success: true,
        message: 'Article created successfully',
        data: {
          id: post.ID,
          slug: post.post_name,
          status: post.post_status
        }
      });
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating article:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Update article
   * PUT /api/writer/articles/:id
   */
  static async updateArticle(req, res) {
    console.log('🚀 Debug: updateArticle method called for ID:', req.params.id);
    console.log('🚀 Debug: Request method:', req.method);
    console.log('🚀 Debug: User:', req.user?.ID, req.user?.user_login);
    
    const transaction = await sequelize.transaction();
    
    try {
      const { id } = req.params;
      
      // console.log('🔧 Debug: Update article called for ID:', id);
      // console.log('🔧 Debug: Request user:', req.user?.ID, req.user?.login);
      const {
        title,
        content,
        description,
        summary_social,
        channel,
        topic,
        keyword,
        publish_date,
        location,
        mark_as_18_plus,
        status,
        featured_image
      } = req.body;

      // Debug log untuk featured image
      console.log('🔧 Debug Update Article - featured_image:', featured_image);

      // Find article
      const post = await Post.findOne({
        where: { 
          ID: id,
          post_author: req.user.ID,
          post_type: 'post'
        }
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Article not found'
        });
      }

      // Update slug if title changed
      let slug = post.post_name;
      if (title && title !== post.post_title) {
        slug = title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .substring(0, 50);
      }

      // Update post
      await post.update({
        post_title: title || post.post_title,
        post_content: content || post.post_content,
        post_excerpt: description || post.post_excerpt,
        post_name: slug,
        post_status: status === 'published' ? 'publish' : post.post_status,
        post_date: publish_date ? new Date(publish_date) : post.post_date,
        post_modified: new Date(),
        post_modified_gmt: new Date()
      }, { transaction });

      // Handle featured image for update
      console.log('🖼️ Debug: Checking featured_image:', featured_image);
      let thumbnailId = null;
      if (featured_image) {
        console.log('🖼️ Debug: Processing featured_image:', featured_image);
        // Find or create attachment post for the image
        const existingAttachment = await Post.findOne({
          where: { guid: featured_image, post_type: 'attachment' }
        });

        if (existingAttachment) {
          thumbnailId = existingAttachment.ID;
        } else {
          // Create new attachment post
          const attachmentPost = await Post.create({
            post_author: req.user.ID,
            post_date: new Date(),
            post_date_gmt: new Date(),
            post_content: '',
            post_title: `Attachment for ${title}`,
            post_excerpt: '',
            post_status: 'inherit',
            comment_status: 'closed',
            ping_status: 'closed',
            post_name: '',
            post_type: 'attachment',
            to_ping: '',
            pinged: '',
            post_content_filtered: '',
            guid: featured_image,
            post_password: '',
            post_mime_type: 'image/jpeg'
          }, { transaction });
          
          thumbnailId = attachmentPost.ID;
        }
      }

      // Update meta data
      const metaUpdates = [
        { key: '_aioseo_description', value: description },
        { key: '_summary_social', value: summary_social },
        { key: '_channel', value: channel },
        { key: '_topic', value: topic },
        { key: '_keyword', value: keyword },
        { key: '_location', value: location },
        { key: '_mark_as_18_plus', value: mark_as_18_plus ? '1' : '0' },
        { key: '_edit_last', value: req.user.ID.toString() }
      ].filter(item => item.value !== undefined);

      // Add thumbnail ID if we have featured image
      console.log('🖼️ Debug: thumbnailId result:', thumbnailId);
      if (thumbnailId) {
        console.log('🖼️ Debug: Adding _thumbnail_id to metaUpdates:', thumbnailId);
        metaUpdates.push({ key: '_thumbnail_id', value: thumbnailId.toString() });
      }

      for (const meta of metaUpdates) {
        await PostMeta.upsert({
          post_id: post.ID,
          meta_key: meta.key,
          meta_value: meta.value || ''
        }, { transaction });
      }

      await transaction.commit();

      res.status(200).json({
        success: true,
        message: 'Article updated successfully',
        data: {
          id: post.ID,
          slug: post.post_name,
          status: post.post_status
        }
      });
    } catch (error) {
      await transaction.rollback();
      console.error('Error updating article:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Auto-save article
   * POST /api/writer/articles/:id/autosave
   */
  static async autoSaveArticle(req, res) {
    console.log('🔄 Debug: autoSaveArticle method called for ID:', req.params.id);
    console.log('🔄 Debug: autoSave body:', req.body);
    try {
      const { id } = req.params;
      const { title, content, description } = req.body;

      // Find article
      const post = await Post.findOne({
        where: { 
          ID: id,
          post_author: req.user.ID,
          post_type: 'post'
        }
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Article not found'
        });
      }

      // Update only basic fields for auto-save
      await post.update({
        post_title: title || post.post_title,
        post_content: content || post.post_content,
        post_excerpt: description || post.post_excerpt,
        post_modified: new Date(),
        post_modified_gmt: new Date()
      });

      res.status(200).json({
        success: true,
        message: 'Article auto-saved',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error auto-saving article:', error);
      res.status(500).json({
        success: false,
        message: 'Auto-save failed'
      });
    }
  }

  /**
   * Get writer's articles
   * GET /api/writer/articles
   */
  static async getMyArticles(req, res) {
    try {
      const { page = 1, limit = 10, status = 'all' } = req.query;
      const offset = (page - 1) * limit;

      const whereClause = {
        post_author: req.user.ID,
        post_type: 'post'
      };

      if (status !== 'all') {
        whereClause.post_status = status === 'published' ? 'publish' : 'draft';
      }

      const { count, rows } = await Post.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: PostMeta,
            as: 'meta'
          }
        ],
        order: [['post_modified', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.status(200).json({
        success: true,
        data: {
          articles: rows,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            pages: Math.ceil(count / limit)
          }
        }
      });
    } catch (error) {
      console.error('Error fetching articles:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get single article
   * GET /api/writer/articles/:id
   */
  static async getArticle(req, res) {
    try {
      const { id } = req.params;

      const post = await Post.findOne({
        where: { 
          ID: id,
          post_author: req.user.ID,
          post_type: 'post'
        },
        include: [
          {
            model: PostMeta,
            as: 'meta'
          }
        ]
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Article not found'
        });
      }

      // Process metadata
      const metadata = {};
      if (post.meta) {
        post.meta.forEach(meta => {
          metadata[meta.meta_key] = meta.meta_value;
        });
      }

      // console.log('🔧 Debug: Found post for edit:', {
      //   ID: post.ID,
      //   title: post.post_title,
      //   content: post.post_content,
      //   status: post.post_status
      // });

      res.status(200).json({
        success: true,
        data: {
          id: post.ID,
          title: post.post_title,
          content: post.post_content,
          excerpt: post.post_excerpt,
          slug: post.post_name,
          status: post.post_status,
          type: post.post_type,
          date: post.post_date,
          modified: post.post_modified,
          author_id: post.post_author,
          publish_date: post.post_date,
          location: metadata.location || '',
          channel: metadata.channel || 'news',
          topic: metadata.topic || '',
          keyword: metadata.keyword || '',
          summary_social: metadata.summary_social || '',
          mark_as_18_plus: metadata.mark_as_18_plus === 'true' || false,
          metadata
        }
      });
    } catch (error) {
      console.error('Error fetching article:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Upload image for article
   * POST /api/writer/upload-image
   */
  static async uploadImage(req, res) {
    try {
      if (!req.files || !req.files.image) {
        return res.status(400).json({
          success: false,
          message: 'No image file provided'
        });
      }

      const imageFile = req.files.image[0]; // Get first file from array
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      
      // Get relative path from uploads directory
      const relativePath = path.relative(
        path.join(__dirname, '../../../public'), 
        imageFile.path
      );
      const imageUrl = `${baseUrl}/${relativePath.replace(/\\/g, '/')}`;

      res.status(200).json({
        success: true,
        message: 'Image uploaded successfully',
        data: {
          url: imageUrl,
          filename: imageFile.filename,
          originalName: imageFile.originalname,
          size: imageFile.size
        }
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Delete article
   * DELETE /api/writer/articles/:id
   */
  static async deleteArticle(req, res) {
    const transaction = await sequelize.transaction();
    
    try {
      const { id } = req.params;

      const post = await Post.findOne({
        where: { 
          ID: id,
          post_author: req.user.ID,
          post_type: 'post'
        }
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Article not found'
        });
      }

      // Delete meta data
      await PostMeta.destroy({
        where: { post_id: post.ID },
        transaction
      });

      // Delete post
      await post.destroy({ transaction });

      await transaction.commit();

      res.status(200).json({
        success: true,
        message: 'Article deleted successfully'
      });
    } catch (error) {
      await transaction.rollback();
      console.error('Error deleting article:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = WriterController;
