// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import FeaturesList from './components/FeaturesList';
import FeatureDetail from './components/FeatureDetail';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';

import './App.css';
import './pages/forms.css';

export default function App() {
  return (
    <div className="app-root">
      <main>
        <Routes>
          {/* Home renders the full page with all sections (About, Features, FAQ, Team, Contact) */}
          <Route path="/" element={<Home />} />
          <Route path="/#about" element={<Home />} />
          <Route path="/#features" element={<Home />} />
          <Route path="/#faqs" element={<Home />} />
          <Route path="/#team" element={<Home />} />
          <Route path="/#contact" element={<Home />} />

          {/* Optional feature list/detail pages (these render without the full home layout) */}
          <Route path="/features" element={<FeaturesList />} />
          <Route path="/feature/:id" element={<FeatureDetail />} />

          {/* Signup / Login => render ONLY these pages (no header/footer/etc) */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Profile page (after login) */}
          <Route path="/profile" element={<Profile />} />

          {/* Password reset flow */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}