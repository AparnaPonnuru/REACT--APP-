import React from 'react';
import '../'; // optional, or keep it in App.css

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      alert(`Subscribed: ${email}`);
      e.target.reset();
    }
  };

  return (
    <footer className="site-footer-rect">
      <div className="footer-container">
        <div className="footer-col">
          <div className="logo-placeholder">SkillNaav</div>
          <p>Email: info@eduease.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
        <div className="footer-col">
          <h3>Features</h3>
          <ul>
            <li>Expert Consultations</li>
            <li>Visa Assessment</li>
            <li>Document Assistance</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Team</h3>
          <ul>
            <li>Founder</li>
            <li>Head of Consultations</li>
            <li>Legal Advisor</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>About Us</h3>
          <p>Email: about@eduease.com</p>
          <p>Phone: +91 99887 76655</p>
          <form onSubmit={handleSubscribe}>
            <input type="email" name="email" placeholder="Your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
}

