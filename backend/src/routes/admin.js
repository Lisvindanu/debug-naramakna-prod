const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const ContentController = require('../controllers/contentController');
const CommentController = require('../controllers/commentController');
const { authenticate, requireAdmin } = require('../middleware/auth');

// All admin routes require authentication + admin privileges
router.use(authenticate);
router.use(requireAdmin);

// User Management
router.get('/users', AdminController.getAllUsers);
router.delete('/users/:id', AdminController.deleteUser);
router.patch('/users/:id/suspend', AdminController.suspendUser);

// Article Management
router.delete('/articles/:id', ContentController.adminDeleteArticle);

// Comment Management  
router.delete('/comments/:id', CommentController.adminDeleteComment);

module.exports = router;