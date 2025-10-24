// utils/mailer.js
const nodemailer = require('nodemailer');

// transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT) || 587, // ensure port is a number
  secure: process.env.EMAIL_PORT == 465,         // true for 465, false for others
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send OTP email
async function sendOtpEmail(to, otp) {
  try {
    const info = await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
      html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
    });

    console.log(`OTP email sent to ${to}: ${otp}`);
    return info;
  } catch (err) {
    console.error('Failed to send OTP email:', err);
    throw new Error('Failed to send OTP email');
  }
}

module.exports = { sendOtpEmail };
