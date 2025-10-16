require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('../config/db');
const apiRoutes = require('../routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Core middleware
app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));

// Routes
app.use('/api', apiRoutes);

// Health
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

async function start() {
  if (process.env.USE_MEMORY_DB === 'true') {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mem = await MongoMemoryServer.create();
    process.env.MONGO_URI = mem.getUri();
    console.log('⚙️ Using in-memory MongoDB');
  }
  await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017');
  app.listen(PORT, () => {
    console.log(`🚀 API listening on http://localhost:${PORT}`);
  });
}

start();

module.exports = app;

