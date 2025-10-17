import React from 'react';
import './Header.css'; // optional if you want separate CSS for header

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="brand">EduEase</div>
        <nav className="nav">
          <a href="#features">features</a>
          <a href="#team">team</a>
          <a href="#about">about</a>
          <a href="#contact us">contact us</a>
        </nav>
        <nav className="nav">
          <a href="#signup">Signup</a>
          <a href="#login">Login</a>
        </nav>
      </div>
    </header>
  );
}
