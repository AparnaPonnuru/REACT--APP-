// routes/users.js
const express = require('express');
const router = express.Router();

// use the controller file you actually have on disk (lowercase name)
// adjust the filename only if your controller file is named differently
const {
  signup,
  login,
  requestReset,
  verifyOtp,
  resetPassword
} = require('../controllers/userController'); // <-- note: usercontroller.js

// simple health check (optional)
// router.get('/', (req, res) => res.send('Users route working'));

// POST /api/users/signup
router.post('/signup', signup);

// POST /api/users/login
router.post('/login', login);

// auth / password reset endpoints under same router
// POST /api/users/request-reset
router.post('/request-reset', requestReset);

// POST /api/users/verify-otp
router.post('/verify-otp', verifyOtp);

// POST /api/users/reset-password
router.post('/reset-password', resetPassword);

module.exports = router;