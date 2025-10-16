const CodeFile = require('../models/CodeFile');
const GeneratedTest = require('../models/GeneratedTest');
const { generateTests } = require('../services/geminiService');
const { z } = require('zod');

const testSchema = z.object({ fileId: z.string() });

async function createTests(req, res, next) {
  try {
    const { fileId } = testSchema.parse(req.body);
    const file = await CodeFile.findById(fileId);
    if (!file) return res.status(404).json({ error: 'File not found' });
    const testCode = await generateTests({ sourceCode: file.content, language: file.language, filename: file.filename });
    const doc = await GeneratedTest.create({ file: file._id, language: file.language, testCode });
    res.status(201).json({ testId: doc._id, testCode });
  } catch (e) {
    if (e.name === 'ZodError') return res.status(400).json({ error: e.errors });
    next(e);
  }
}

async function getTests(req, res, next) {
  try {
    const tests = await GeneratedTest.find({ file: req.query.fileId }).sort({ createdAt: -1 });
    res.json({ tests });
  } catch (e) { next(e); }
}

module.exports = { createTests, getTests };
