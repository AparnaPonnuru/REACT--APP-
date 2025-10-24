import React, { useState } from 'react';
import './Questions.css';




const FAQS = [
  {
    id: 'f1',
    q: 'What types of internships are available on the platform?',
    a: 'We offer internships across technology, business, design, marketing, data science and more — from short term projects to long-term internships with mentorship and certificates.',
  },
  {
    id: 'f2',
    q: 'How does the platform match students with internships?',
    a: 'Students complete a short profile and skill assessment. Our matching engine then recommends roles based on skills, interests and location — mentors can also hand-pick candidates.',
  },
  {
    id: 'f3',
    q: 'Is there a fee to use the platform?',
    a: 'Basic student access is free. Premium features such as mentor-reviewed portfolios and interview prep may be paid. Employers pay to post positions.',
  },
  {
    id: 'f4',
    q: 'Can students receive academic credit for their internships?',
    a: 'Many partner universities accept internships for credit; acceptance depends on individual college policies — we provide documentation you can submit to your department.',
  },
  {
    id: 'f5',
    q: 'How do I apply for an internship through the platform?',
    a: 'Open the internship listing, complete the short application form, upload your resume/portfolio and optionally request a mock interview. Employers review and invite selected candidates.',
  },
];
export default function Questions() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="signup" className="signup-hero">
      <div className="signup-container">
        {/* Left column: big headline */}
        <div className="signup-left">
          <span className="eyebrow">Frequently Asked Questions</span>
          <h1 className="signup-title">
            Answers to the
            <br />
            Frequently
            <br />
            asked questions
          </h1>
          <p className="signup-desc">
            Learn how our platform works — from matching and applications to credits and fees. Click the plus icons to reveal each answer.
          </p>
          <div className="cta-row">
            <button className="primary-cta">Get Started</button>
            <button className="secondary-cta">Request Demo</button>
          </div>
        </div>

        {/* Right column: accordion list */}
        <div className="signup-right" aria-label="FAQ list">
          {FAQS.map(({ id, q, a }) => {
            const isOpen = openId === id;
            return (
              <div
                key={id}
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  className="faq-toggle"
                  onClick={() => toggle(id)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${id}`}
                >
                  <span className="faq-question">{q}</span>
                  <span className="faq-icon" aria-hidden>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <div
                  id={`panel-${id}`}
                  className="faq-panel"
                  role="region"
                  aria-labelledby={`btn-${id}`}
                  style={{ maxHeight: isOpen ? '400px' : 0 }}
                >
                  <p>{a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
