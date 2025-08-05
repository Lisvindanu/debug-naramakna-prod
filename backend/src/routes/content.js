/**
 * Universal Content Routes
 * Handles all content types: articles, YouTube videos, TikTok videos
 */

const express = require('express');
const router = express.Router();
const ContentController = require('../controllers/contentController');
const { authenticate, requireWriter, requireAdmin, canEditPost, canCreateVideo } = require('../middleware/auth');
const { uploadPostImages, handleUploadError } = require('../middleware/upload');

// Content feed and discovery
router.get('/feed', ContentController.getFeed);
router.get('/stats', ContentController.getStats);

// Content by type
router.get('/type/:type', ContentController.getByType);

// Individual content CRUD
router.get('/:id', ContentController.getById);
router.post('/', authenticate, uploadPostImages, handleUploadError, canCreateVideo, ContentController.create);
router.put('/:id', authenticate, canEditPost, ContentController.update);
router.delete('/:id', authenticate, canEditPost, ContentController.delete);

module.exports = router;