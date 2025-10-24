// controllers/studentController.js
const StudentProfile = require('../models/studentProfile');
const User = require('../models/user');

/**
 * Save or update student profile
 */
exports.saveStudentProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('Saving profile for user:', userId);
    
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phoneNumber,
      alternateContact,
      address,
      education,
      technicalSkills,
      languagesKnown,
      resumePath
    } = req.body;

    console.log('Received data:', req.body);

    // Find existing profile or create new one
    let studentProfile = await StudentProfile.findOne({ userId });

    if (studentProfile) {
      // Update existing profile
      studentProfile = await StudentProfile.findOneAndUpdate(
        { userId },
        {
          $set: {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            phoneNumber,
            alternateContact,
            address,
            education,
            technicalSkills,
            languagesKnown,
            resumePath,
            updatedAt: new Date()
          }
        },
        { new: true, runValidators: true }
      );
    } else {
      // Create new profile
      studentProfile = new StudentProfile({
        userId,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phoneNumber,
        alternateContact,
        address,
        education,
        technicalSkills,
        languagesKnown,
        resumePath
      });
      await studentProfile.save();
    }

    console.log('Profile saved successfully for user:', userId);
    
    return res.status(200).json({
      message: 'Student profile saved successfully',
      profile: studentProfile.toJSON()
    });

  } catch (err) {
    console.error('Save student profile error:', err);
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

/**
 * Get student profile
 */
exports.getStudentProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Find student profile and populate user data if needed
    const studentProfile = await StudentProfile.findOne({ userId })
      .populate('userId', 'name email'); // Populate user name and email

    if (!studentProfile) {
      return res.status(404).json({ 
        error: 'Student profile not found',
        profile: null 
      });
    }

    return res.json({
      message: 'Student profile retrieved successfully',
      profile: studentProfile.toJSON()
    });

  } catch (err) {
    console.error('Get student profile error:', err);
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
};