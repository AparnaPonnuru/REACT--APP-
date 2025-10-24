// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required'],
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password required']
  },

  // OTP fields for forgot-password flow
  otpHash: {
    type: String
  },
  otpExpires: {
    type: Date
  },
  resetToken: {
    type: String
  },
  resetTokenExpires: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add pre-save middleware to update updatedAt
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

/**
 * Remove sensitive fields when converting to JSON
 */
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.otpHash;
  delete obj.otpExpires;
  delete obj.resetToken;
  delete obj.resetTokenExpires;
  return obj;
};

/**
 * Hash and set password (use before saving plain password)
 * Usage: await user.setPassword('plainPassword');
 */
userSchema.methods.setPassword = async function (plainPassword) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(plainPassword, salt);
  return this.password;
};

/**
 * Compare provided password with stored hash
 * Usage: const ok = await user.comparePassword('candidate');
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Set OTP: accepts plain otp string, stores its hash and expiry
 * Returns the plain otp (so caller can email it).
 *
 * Example:
 * const otp = await user.setOtp(6, 10); // 6 digits, 10 minutes expiry
 * await user.save();
 * sendOtpEmail(user.email, otp);
 */
userSchema.methods.setOtp = function (length = 6, ttlMinutes = 10) {
  // generate numeric OTP (leading zeros allowed)
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  const otpNum = Math.floor(Math.random() * (max - min + 1)) + min;
  const otp = otpNum.toString();

  // hash OTP with sha256 (do not store plain OTP)
  const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

  this.otpHash = otpHash;
  this.otpExpires = new Date(Date.now() + ttlMinutes * 60 * 1000);

  return otp;
};

/**
 * Verify OTP: checks plain otp against stored hash and expiry
 * Returns true if valid, false otherwise. If invalid or expired, it will NOT clear OTP;
 * caller can choose to clear on success or expiry.
 *
 * Usage:
 * const ok = user.verifyOtp('123456');
 */
userSchema.methods.verifyOtp = function (candidateOtp) {
  if (!this.otpHash || !this.otpExpires) return false;
  if (this.otpExpires < Date.now()) return false;
  const candidateHash = crypto.createHash('sha256').update(candidateOtp).digest('hex');
  return candidateHash === this.otpHash;
};

/**
 * Clear OTP fields (call after successful verification or on expiry handling)
 */
userSchema.methods.clearOtp = function () {
  this.otpHash = undefined;
  this.otpExpires = undefined;
};

/**
 * Create a one-time reset token (random hex) and set expiry (minutes)
 * Returns the plain resetToken (so caller can include it in response or email link).
 *
 * Example:
 * const token = user.setResetToken(15); // 15 minutes expiry
 * await user.save();
 * // send token to client to allow password reset
 */
userSchema.methods.setResetToken = function (ttlMinutes = 15) {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetToken = resetToken;
  this.resetTokenExpires = new Date(Date.now() + ttlMinutes * 60 * 1000);
  return resetToken;
};

/**
 * Validate provided reset token
 */
userSchema.methods.verifyResetToken = function (candidateToken) {
  if (!this.resetToken || !this.resetTokenExpires) return false;
  if (this.resetTokenExpires < Date.now()) return false;
  return this.resetToken === candidateToken;
};

/**
 * Clear reset token fields (call after successful password change)
 */
userSchema.methods.clearResetToken = function () {
  this.resetToken = undefined;
  this.resetTokenExpires = undefined;
};

module.exports = mongoose.model('User', userSchema);