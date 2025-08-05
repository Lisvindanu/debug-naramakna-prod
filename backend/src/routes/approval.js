const express = require('express');
const router = express.Router();
const ContentApprovalController = require('../controllers/contentApprovalController');
const { authenticate, requireAdmin, requireWriter } = require('../middleware/auth');

/**
 * Content Approval Routes
 * For managing the content review and approval workflow
 */

/**
 * @route   GET /api/approval/pending
 * @desc    Get pending posts for review
 * @access  Admin+
 * @query   { page?, limit?, author_id?, post_type? }
 */
router.get('/pending', authenticate, requireAdmin, ContentApprovalController.getPendingPosts);

/**
 * @route   GET /api/approval/stats
 * @desc    Get review queue statistics
 * @access  Admin+
 */
router.get('/stats', authenticate, requireAdmin, ContentApprovalController.getReviewStats);

/**
 * @route   GET /api/approval/my-pending
 * @desc    Get current user's pending posts
 * @access  Writer+ (own posts only)
 */
router.get('/my-pending', authenticate, requireWriter, ContentApprovalController.getMyPendingPosts);

/**
 * @route   POST /api/approval/:id/review
 * @desc    Approve or reject a post
 * @access  Admin+
 * @body    { action: 'approve' | 'reject', feedback? }
 */
router.post('/:id/review', authenticate, requireAdmin, ContentApprovalController.reviewPost);

/**
 * @route   POST /api/approval/bulk-review
 * @desc    Bulk approve or reject posts
 * @access  Admin+
 * @body    { post_ids: number[], action: 'approve' | 'reject', feedback? }
 */
router.post('/bulk-review', authenticate, requireAdmin, ContentApprovalController.bulkReviewPosts);

module.exports = router;