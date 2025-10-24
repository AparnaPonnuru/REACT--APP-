// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile'; // <-- NEW
import FeaturesList from './components/FeaturesList';
import FeatureDetail from './components/FeatureDetail';
// in App.jsx or wherever you define routes
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';
// eslint-disable-next-line no-unused-vars

import './App.css';
import './pages/forms.css';

export default function App() {
  return (
    <div className="app-root">
      <main>
        <Routes>
          {/* Home renders the full page (Header, Features, Questions, Footer) */}
          <Route path="/" element={<Home />} />

          {/* Optional feature list/detail pages (these render without the full home layout) */}
          <Route path="/features" element={<FeaturesList />} />
          <Route path="/feature/:id" element={<FeatureDetail />} />

          {/* Signup / Login => render ONLY these pages (no header/footer/etc) */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Profile page (after login) */}
          <Route path="/profile" element={<Profile />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-otp" element={<VerifyOtp />} />
<Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>
    </div>
  );
}
