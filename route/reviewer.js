const express = require('express');
const router = express.Router();
const reviewerController = require('../controllers/admin/reviewer'); // Import the reviewer controller

router.post('/reviewers', reviewerController.createReviewer);
router.get('/reviewers', reviewerController.getAllReviewerspopulate);
router.get('/reviewers/:id', reviewerController.getReviewerByIdpopulate);
router.put('/reviewers/:id', reviewerController.updateReviewerById);
router.delete('/reviewers/:id', reviewerController.deleteReviewerById);

module.exports = router;
