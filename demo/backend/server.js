// server.js
require('dotenv').config(); // loads .env into process.env

const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const usersRouter = require('./routes/users');
const studentRoutes = require('./routes/students'); // Add this line

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // must be provided in .env

// -- Basic validation of MONGO_URI to fail fast with a clear message --
if (!MONGO_URI || !(typeof MONGO_URI === 'string')) {
  console.error('FATAL: MONGO_URI is not set. Add MONGO_URI to your .env file.');
  process.exit(1);
}
const uriTrim = MONGO_URI.trim();
if (!(uriTrim.startsWith('mongodb://') || uriTrim.startsWith('mongodb+srv://'))) {
  console.error('FATAL: MONGO_URI must start with "mongodb://" or "mongodb+srv://".');
  console.error('Your MONGO_URI:', uriTrim);
  process.exit(1);
}

// -- Middlewares --
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' })); // frontend URL
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Basic rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP per window
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// -- Routes --
app.get('/', (req, res) => res.send('API running'));
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

// Mount users routes - FIXED: Only mount once
app.use('/api/users', usersRouter);

// Mount student routes
app.use('/api/students', studentRoutes);

// Optional: Also mount under /api/auth if you want both endpoints
app.use('/api/auth', usersRouter);
console.log('Mounted user routes under both /api/users and /api/auth');
console.log('Mounted student routes under /api/students');

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Centralized error handler
// controllers should call next(err) or throw; this will catch unhandled errors
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && err.stack ? err.stack : err);
  const status = err && err.status ? err.status : 500;
  const message = process.env.NODE_ENV === 'production' ? 'Server error' : (err && err.message ? err.message : 'Server error');
  res.status(status).json({ error: message });
});

// -- DB + Server startup/shutdown --
let server;

const start = async () => {
  try {
    mongoose.set('strictQuery', true);

    console.log('Connecting to MongoDB...');
    await mongoose.connect(uriTrim, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');

    server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.error('DB connection error:', err && err.message ? err.message : err);
    process.exit(1);
  }
};

start();

// Graceful shutdown
const shutdown = async (signal) => {
  try {
    console.log(`Received ${signal}. Closing server...`);
    if (server) await new Promise((resolve) => server.close(resolve));
    await mongoose.disconnect();
    console.log('Shutdown complete');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown', err);
    process.exit(1);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Handle unhandled rejections and uncaught exceptions (log then shutdown)
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at Promise', p, 'reason:', reason);
  shutdown('unhandledRejection');
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown', err);
  shutdown('uncaughtException');
});