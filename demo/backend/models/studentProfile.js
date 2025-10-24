// models/studentProfile.js
const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Personal Details
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  alternateContact: {
    type: String,
    trim: true
  },
  
  // Address
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true }
  },
  
  // Education
  education: {
    classCourse: { type: String, trim: true },
    collegeInstitute: { type: String, trim: true },
    graduationYear: { type: String, trim: true },
    cgpaPercentage: { type: String, trim: true },
    other: { type: String, trim: true }
  },
  
  // Skills
  technicalSkills: [{
    type: String,
    trim: true
  }],
  
  languagesKnown: [{
    type: String,
    trim: true
  }],
  
  resumePath: {
    type: String,
    trim: true
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
studentProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

/**
 * Remove sensitive fields when converting to JSON
 */
studentProfileSchema.methods.toJSON = function () {
  const obj = this.toObject();
  return obj;
};

module.exports = mongoose.model('StudentProfile', studentProfileSchema);