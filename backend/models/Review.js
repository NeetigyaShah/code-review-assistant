const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  category: String,
  severity: { type: String, index: true },
  title: String,
  description: String,
  lineStart: Number,
  lineEnd: Number,
  codeSnippet: String,
  suggestion: String,
  impact: String
}, { _id: false });

const reviewSchema = new mongoose.Schema({
  file: { type: mongoose.Schema.Types.ObjectId, ref: 'CodeFile', required: true, index: true },
  overallScore: Number,
  summary: String,
  categories: Object,
  issues: [issueSchema],
  positives: [String],
  metrics: Object,
  rawProviderResponse: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
