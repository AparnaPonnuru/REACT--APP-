import React from 'react';
import { Link } from 'react-router-dom';
import NavItem from './NavItem';
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

        {/* Navigation Links */}
        <nav className="main-nav" aria-label="Primary navigation">
          <NavItem to="/#features" hash="#features">features</NavItem>
          <NavItem to="/#team" hash="#team">team</NavItem>
          <NavItem to="/#about" hash="#about">about</NavItem>
          <NavItem to="/#contact" hash="#contact">contact us</NavItem>
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
