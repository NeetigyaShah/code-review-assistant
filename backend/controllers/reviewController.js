const CodeFile = require('../models/CodeFile');
const Review = require('../models/Review');
const { generateReview } = require('../services/geminiService');
const { z } = require('zod');

const reviewSchema = z.object({ fileId: z.string() });

async function createReview(req, res, next) {
  try {
    const { fileId } = reviewSchema.parse(req.body);
    const file = await CodeFile.findById(fileId);
    if (!file) return res.status(404).json({ error: 'File not found' });
    const aiReview = await generateReview({ sourceCode: file.content, language: file.language, filename: file.filename });
    const review = await Review.create({
      file: file._id,
      overallScore: aiReview.overallScore || aiReview.overall_score || 0,
      summary: aiReview.summary,
      categories: aiReview.categories,
      issues: (aiReview.issues || []).map(i => ({
        category: i.category,
        severity: i.severity,
        title: i.title,
        description: i.description,
        lineStart: i.lineStart || i.line_start,
        lineEnd: i.lineEnd || i.line_end,
        codeSnippet: i.codeSnippet || i.code_snippet,
        suggestion: i.suggestion,
        impact: i.impact
      })),
      positives: aiReview.positives || [],
      metrics: aiReview.metrics || {},
      rawProviderResponse: aiReview
    });
    res.status(201).json({ reviewId: review._id });
  } catch (e) {
    if (e.name === 'ZodError') return res.status(400).json({ error: e.errors });
    next(e);
  }
}

async function getReview(req, res, next) {
  try {
    const review = await Review.findById(req.params.id).populate('file');
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json({ review });
  } catch (e) { next(e); }
}

async function listReviews(req, res, next) {
  try {
    const reviews = await Review.find({}, 'file overallScore summary createdAt').populate('file', 'filename language').sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (e) { next(e); }
}

module.exports = { createReview, getReview, listReviews };
