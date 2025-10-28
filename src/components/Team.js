import React from 'react';
import './Team.css';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Former university dean with 15+ years in education technology and academic innovation.',
      image: '/team/sarah-chen.jpg',
      expertise: ['EdTech Strategy', 'Academic Partnerships', 'Leadership'],
      email: 'sarah@edubase.com'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Head of Consultations',
      bio: 'Education consultant with expertise in international student placements and career development.',
      image: '/team/michael-rodriguez.jpg',
      expertise: ['Student Counseling', 'Career Guidance', 'Visa Processes'],
      email: 'michael@edubase.com'
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'Legal Advisor',
      bio: 'Specialized in education law, international student visas, and compliance documentation.',
      image: '/team/emily-watson.jpg',
      expertise: ['Legal Compliance', 'Visa Processing', 'Documentation'],
      email: 'emily@edubase.com'
    }
  ];

  return (
    <section className="team-section" id="team">
      <div className="team-container">
        {/* Header */}
        <div className="team-header">
          <span className="team-eyebrow">Our Team</span>
          <h2 className="team-title">Meet Our Expert Team</h2>
          <p className="team-subtitle">
            Dedicated professionals committed to transforming education through technology and personalized guidance
          </p>
        </div>
        
        {/* Team Grid */}
        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.id} className="team-card">
              <div className="team-card-image">
                <div className="image-placeholder">
                  <span className="initials">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="card-overlay">
                  <div className="social-links">
                    <a href={`mailto:${member.email}`} aria-label="Email">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </a>
                    <a href="#" aria-label="LinkedIn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="team-card-content">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
                
                <div className="member-expertise">
                  <h4>Areas of Expertise:</h4>
                  <div className="expertise-tags">
                    {member.expertise.map(skill => (
                      <span key={skill} className="expertise-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <a href={`mailto:${member.email}`} className="contact-link">
                  {member.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;