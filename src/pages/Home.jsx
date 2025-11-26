// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';
import CardImages from '../components/FeaturesList'; // your "card images" component
import Features from '../components/Features';       // your detailed features component
import Questions from '../components/Questions';
import Team from '../components/Team';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';
import About from '../components/About';

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero / Intro */}
        <section style={{ padding: '24px 16px', textAlign: 'center' }}>
          <h2>Your world, yourrrrrrrr</h2>
          <p>Discover Global Internships Designed Just for You</p>
        </section>

        {/* Card images section (cards gallery) */}
        <CardImages />
        <About/>
        {/* Detailed Features / Our Services (images + descriptions alternating) */}
        <Features />

        {/* FAQ / Questions */}
        <Questions />
        <Team/>
        <ContactUs/>
      </main>

      <Footer />
    </>
  );
}
