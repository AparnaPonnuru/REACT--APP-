// routes/contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/contact', async (req, res) => {
  try {
    console.log('📨 Contact form submission received:', req.body);
    
    const { name, email, topic, message } = req.body;

    if (!name || !email || !topic || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const newContact = new Contact({ name, email, topic, message });
    const savedContact = await newContact.save();
    
    console.log('✅ Contact saved to database:', savedContact._id);
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

module.exports = router; // Make sure this line exists