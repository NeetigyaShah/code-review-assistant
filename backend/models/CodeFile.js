const mongoose = require('mongoose');

const codeFileSchema = new mongoose.Schema({
  filename: { type: String, required: true, index: true },
  language: { type: String, required: true, index: true },
  content: { type: String, required: true },
  size: { type: Number },
  hash: { type: String, index: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CodeFile', codeFileSchema);
