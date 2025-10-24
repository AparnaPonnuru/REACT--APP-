// controllers/userController.js
const User = require('../models/user'); // your User model
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendOtpEmail } = require('../utils/mailer'); // make sure you have this

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Signup
 */
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: 'Name, email and password are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const user = new User({ name, email });
    await user.setPassword(password); // hashes password
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.status(201).json({ message: 'User registered', user: user.toJSON(), token });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' });

    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.json({ message: 'Login successful', user: user.toJSON(), token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Request password reset (send OTP)
 */
exports.requestReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const otp = user.setOtp(6, 10); // 6-digit OTP, 10 mins expiry
    await user.save();

    await sendOtpEmail(email, otp);
    return res.json({ message: 'OTP sent to email' });
  } catch (err) {
    console.error('requestReset error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Verify OTP
 */
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });

    const user = await User.findOne({ email });
    if (!user || !user.otpHash) return res.status(400).json({ error: 'No OTP requested' });

    if (!user.verifyOtp(otp)) {
      if (user.otpExpires && user.otpExpires < Date.now()) {
        user.clearOtp();
        await user.save();
        return res.status(400).json({ error: 'OTP expired' });
      }
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    user.clearOtp();
    const resetToken = user.setResetToken(15); // 15 mins
    await user.save();

    return res.json({ message: 'OTP verified', resetToken });
  } catch (err) {
    console.error('verifyOtp error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Reset password using resetToken
 */
exports.resetPassword = async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;
    if (!email || !resetToken || !newPassword)
      return res.status(400).json({ error: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user || !user.resetToken) return res.status(400).json({ error: 'Invalid or expired reset token' });

    if (!user.verifyResetToken(resetToken))
      return res.status(400).json({ error: 'Invalid or expired reset token' });

    await user.setPassword(newPassword);
    user.clearResetToken();
    await user.save();

    return res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('resetPassword error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};