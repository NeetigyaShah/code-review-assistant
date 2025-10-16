const express = require('express');
const { uploadFile, listFiles } = require('../controllers/fileController');
const { createReview, getReview, listReviews } = require('../controllers/reviewController');
const { createTests, getTests } = require('../controllers/testController');

const router = express.Router();

// Files
router.post('/files', uploadFile);
router.get('/files', listFiles);

// Reviews
router.post('/reviews', createReview);
router.get('/reviews', listReviews);
router.get('/reviews/:id', getReview);

// Tests
router.post('/tests', createTests);
router.get('/tests', getTests);

module.exports = router;
