const crypto = require('crypto');
const CodeFile = require('../models/CodeFile');
const { z } = require('zod');

const uploadSchema = z.object({
  filename: z.string().min(1),
  language: z.string().min(1),
  content: z.string().min(1)
});

async function uploadFile(req, res, next) {
  try {
    const parsed = uploadSchema.parse(req.body);
    const hash = crypto.createHash('sha256').update(parsed.content).digest('hex');
    let existing = await CodeFile.findOne({ hash });
    if (existing) return res.json({ reused: true, fileId: existing._id });
    const file = await CodeFile.create({
      filename: parsed.filename,
      language: parsed.language,
      content: parsed.content,
      size: Buffer.byteLength(parsed.content, 'utf8'),
      hash
    });
    res.status(201).json({ fileId: file._id });
  } catch (e) {
    if (e.name === 'ZodError') return res.status(400).json({ error: e.errors });
    next(e);
  }
}

async function listFiles(req, res, next) {
  try {
    const files = await CodeFile.find({}, 'filename language createdAt').sort({ createdAt: -1 }).lean();
    res.json({ files });
  } catch (e) { next(e); }
}

module.exports = { uploadFile, listFiles };
