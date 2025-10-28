import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage(data.message);
        // Reset form
        setFormData({
          name: '',
          email: '',
          topic: '',
          message: ''
        });
      } else {
        setSubmitMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <h2>Have Questions? Get in Touch</h2>
      <p className="contact-email">Email to: info@edubase.com</p>
      
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Enter Your Name*</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Enter Your Email*</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className="form-group full-width">
          <label htmlFor="topic">Your Question About...</label>
          <select 
            id="topic" 
            name="topic" 
            value={formData.topic}
            onChange={handleChange}
            required
          >
            <option value="">Select a topic</option>
            <option value="internships">Internships</option>
            <option value="academic-credit">Academic Credit</option>
            <option value="fees">Platform Fees</option>
            <option value="team">Team Consultation</option>
            <option value="technical">Technical Support</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="form-group full-width">
          <label htmlFor="message">Your Message...</label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        <div className="form-group full-width">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {submitMessage && (
          <div className={`submit-message ${submitMessage.includes('Thank you') ? 'success' : 'error'}`}>
            {submitMessage}
          </div>
        )}
      </form>
    </section>
  );
};

export default ContactUs;