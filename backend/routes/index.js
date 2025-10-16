const express = require('express');
const { uploadFile, listFiles } = require('../controllers/fileController');
const { createReview, getReview, listReviews } = require('../controllers/reviewController');

const router = express.Router();

// Files
router.post('/files', uploadFile);
router.get('/files', listFiles);

// Reviews
router.post('/reviews', createReview);
router.get('/reviews', listReviews);
router.get('/reviews/:id', getReview);

module.exports = router;
