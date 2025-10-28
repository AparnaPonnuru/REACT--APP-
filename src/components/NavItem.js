import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavItem({ to, children, hash }) {
  const location = useLocation();
  // If you want active state for hash routes
  const isActive = hash ? location.hash === hash : location.pathname === to;

  return (
    <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
      {children}
    </Link>
  );
}
