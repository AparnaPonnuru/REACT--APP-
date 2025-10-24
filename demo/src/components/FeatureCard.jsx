// src/components/FeatureCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function FeatureCard({ item }) {
  return (
    <div className="feature-card" style={{ width: 320, borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.1)', background: '#fff', margin: 12 }}>
      <Link to={`/feature/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ height: 180, overflow: 'hidden', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
          <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ padding: 12 }}>
          <h4 style={{ margin: '6px 0' }}>{item.title}</h4>
          <p style={{ fontSize: 14, color: '#444' }}>{item.short}</p>
        </div>
      </Link>
    </div>
  );
}
