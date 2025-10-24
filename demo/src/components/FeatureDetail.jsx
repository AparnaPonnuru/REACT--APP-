// FeatureDetail.jsx (update)
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import features from '../data/features';

export default function FeatureDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // robust comparison — make sure types don't break matching
  const item = features.find(f => String(f.id) === String(id));

  if (!item) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>Feature not found</h2>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '30px auto', padding: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>← Back</button>
      <h1 style={{ marginBottom: 8 }}>{item.title}</h1>
      <p style={{ color: '#555' }}>{item.description}</p>

      <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
        {item.images.map((src, i) => (
          <div key={i} style={{ flex: '1 1 300px', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
            <img src={src} alt={`${item.title}-${i}`} style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
