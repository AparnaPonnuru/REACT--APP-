// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const usersRouter = require('./routes/users');
const studentsRouter = require('./routes/students');
const contactRoutes = require('./routes/contact'); // Keep import here

const app = express(); // Initialize app FIRST

// Config from env
const PORT = parseInt(process.env.PORT, 10) || 5000;
const HOST = process.env.HOST || '0.0.0.0'; // bind to all interfaces by default
const MONGO_URI =
  process.env.MONGO_URI || process.env.DATABASE_URL 
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// CORS: allow origins from environment variable or all origins if not provided
// Set REACT_APP_CLIENT_ORIGINS as a comma-separated list in production, e.g. "https://app.example.com,https://www.example.com"
const rawOrigins = process.env.CLIENT_ORIGINS || process.env.CORS_ORIGIN || '';
let originOption = true; // default = allow all
if (rawOrigins && rawOrigins.trim() !== '') {
  const list = rawOrigins.split(',').map(s => s.trim()).filter(Boolean);
  originOption = (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser clients like curl/postman
    if (list.indexOf(origin) !== -1) return callback(null, true);
    return callback(new Error('CORS not allowed for ' + origin), false);
  };
}
app.use(cors({
  origin: originOption,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// API routes - MOVE THIS SECTION AFTER app initialization
app.use('/api/users', usersRouter);
app.use('/api/students', studentsRouter);
app.use('/api', contactRoutes); // MOVED HERE - after app is initialized

// Simple health route
app.get('/', (req, res) => res.json({ ok: true, env: NODE_ENV }));

// Serve React build when in production (optional)
if (NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, 'build'); // adjust if needed
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => res.sendFile(path.join(clientBuildPath, 'index.html')));
}

// Error handler
app.use((err, req, res, next) => {
  console.error('ERROR:', err && err.message ? err.message : err);
  const status = err && err.status ? err.status : 500;
  res.status(status).json({ success: false, message: err && err.message ? err.message : 'Server error' });
});

// Start server binding to HOST (0.0.0.0 allows external access)
const server = app.listen(PORT, HOST, () => {
  const addr = server.address();
  console.log(`Server listening at http://${addr.address === '0.0.0.0' ? '0.0.0.0 (all interfaces)' : addr.address}:${addr.port}`);
});