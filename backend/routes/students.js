// routes/students.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { saveStudentProfile, getStudentProfile } = require('../controllers/studentController');

// All student routes require authentication
router.use(authenticate);

// GET /api/students/profile - Get student profile
router.get('/profile', getStudentProfile);

// POST /api/students/profile - Save/update student profile
router.post('/profile', saveStudentProfile);

module.exports = router;