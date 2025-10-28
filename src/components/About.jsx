import React from 'react';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        {/* Header Section */}
        <div className="about-header">
          <span className="about-eyebrow">About Us</span>
        </div>

        {/* Main Content Grid */}
        <div className="about-content">
          <div className="about-card vision-card">
            <div className="card-icon">🎯</div>
            <h3>Our Vision</h3>
            <p>To create a world where every student has access to meaningful internship experiences that accelerate their career growth and personal development.</p>
            <div className="card-highlight">
              <span>Accessible Education</span>
              <span>Career Acceleration</span>
              <span>Global Opportunities</span>
            </div>
          </div>

          <div className="about-card mission-card">
            <div className="card-icon">🚀</div>
            <h3>Our Mission</h3>
            <p>To provide a seamless platform that connects students with industry partners and offers personalized guidance throughout their educational journey.</p>
            <div className="card-highlight">
              <span>Industry Connections</span>
              <span>Personalized Guidance</span>
              <span>Seamless Experience</span>
            </div>
          </div>

          <div className="about-card values-card">
            <div className="card-icon">⭐</div>
            <h3>Why Choose EduBase</h3>
            <p>We stand out with our comprehensive approach to student success and career development.</p>
            <div className="features-grid">
              <div className="feature">
                <span className="feature-icon">👥</span>
                <span>Expert Consultations</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✅</span>
                <span>Verified Internships</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🎓</span>
                <span>Academic Credit Support</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📊</span>
                <span>Career Guidance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="about-stats">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Students Placed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Partner Companies</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
}