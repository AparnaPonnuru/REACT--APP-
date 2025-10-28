import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Header.css';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Brand Section with Logo */}
        <div className="brand">
          <Link to="/" className="brand-link">
            <img src="/logo.png" alt="EduBase Logo" className="logo" />
            <span className="brand-name">EduBase</span>
          </Link>
        </div>

        {/* Navigation Links - Updated with HashLink */}
        <nav className="main-nav" aria-label="Primary navigation">
          <HashLink 
            to="/#about" 
            className="nav-link"
            scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            About
          </HashLink>
          <HashLink 
            to="/#features" 
            className="nav-link"
            scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            Features
          </HashLink>
          <HashLink 
            to="/#faqs" 
            className="nav-link"
            scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            FAQ
          </HashLink>
          <HashLink 
            to="/#team" 
            className="nav-link"
            scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            Team
          </HashLink>
          <HashLink 
            to="/#contact" 
            className="nav-link"
            scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            Contact Us
          </HashLink>
        </nav>

        {/* Signup / Login Links */}
        <div className="auth-links">
          <Link to="/signup" className="btn-link">Signup</Link>
          <Link to="/login" className="btn-link">Login</Link>
        </div>
      </div>
    </header>
  );
}