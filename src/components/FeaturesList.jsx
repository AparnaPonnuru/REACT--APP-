// src/components/FeaturesList.jsx
import React from 'react';
import FeatureCard from './FeatureCard';
import features from '../data/features';

export default function FeaturesList() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', padding: '24px 16px' }}>
      {features.map(item => <FeatureCard key={item.id} item={item} />)}
    </div>
  );
}
