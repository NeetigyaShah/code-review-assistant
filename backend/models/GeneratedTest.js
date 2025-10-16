const mongoose = require('mongoose');

const generatedTestSchema = new mongoose.Schema({
  file: { type: mongoose.Schema.Types.ObjectId, ref: 'CodeFile', required: true, index: true },
  language: { type: String, required: true },
  testCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GeneratedTest', generatedTestSchema);
