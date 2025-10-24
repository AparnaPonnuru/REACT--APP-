// utils/otp.js
const crypto = require('crypto');

// Generate numeric OTP of given length (default 6)
function generateOtp(length = 6) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  return otp.toString();
}

// Hash OTP using SHA256
function hashOtp(otp) {
  return crypto.createHash('sha256').update(otp).digest('hex');
}

module.exports = { generateOtp, hashOtp };
