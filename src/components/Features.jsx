// src/components/Features.jsx
import React from 'react';
import './Features.css';

const fallback = '/logo.png'; // fallback if feature image missing

export default function Features() {
  return (
    <section id="features" className="features-section">
      <div className="container features-inner">
        <h2 className="section-title">Our Services</h2>

        <div className="feature-item">
          <div className="feature-image">
            <img
              src="/feature1.png"
              alt="Personalized Consultations"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallback; }}
            />
          </div>
          <div className="feature-content">
            <h3>Personalized Consultations</h3>
            <p>Get one-on-one expert sessions tailored to your academic and career goals.</p>
          </div>
        </div>

        <div className="feature-item reverse">
          <div className="feature-image">
            <img
              src="/feature2.png"
              alt="Visa Assistance"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallback; }}
            />
          </div>
          <div className="feature-content">
            <h3>Visa Assistance</h3>
            <p>Receive full support for your visa process — eligibility checks, docs and prep.</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-image">
            <img
              src="/feature3.png"
              alt="Document Preparation"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallback; }}
            />
          </div>
          <div className="feature-content">
            <h3>Document Preparation</h3>
            <p>We help you prepare, review, and format documents to meet requirements.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
