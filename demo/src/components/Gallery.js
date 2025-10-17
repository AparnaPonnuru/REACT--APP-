// src/components/Gallery.js
import React from 'react';
import './Gallery.css';

// import local images from src/assets
import img1 from '../assets/photo1.jpg';
import img2 from '../assets/photo2.jpg';
import img3 from '../assets/photo3.jpg';

export default function Gallery() {
  const images = [img1, img2, img3];

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <h2 className="gallery-title">Your world, your internship </h2>
        <p className="gallery-sub">Discover Global Internships Designed Just for You</p>

        <div className="gallery-grid">
          {images.map((src, idx) => (
            <figure key={idx} className="gallery-card">
              <img src={src} alt= " " loading="lazy" />
              <figcaption>Enable students to explore various career paths, helping them make informed decisions about their future professions.</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
