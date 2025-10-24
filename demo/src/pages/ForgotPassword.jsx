// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  async function handleSendOtp(e){
    e.preventDefault();
    if(!email) return alert('Enter email');
    try {
      const res = await fetch('http://localhost:5000/api/auth/request-reset', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || data.message || 'Request failed');
      alert('OTP sent to email');
      // navigate to OTP page and pass email via state
      navigate('/verify-otp', { state: { email } });
    } catch(err) {
      alert(err.message);
    }
  }

  return (
    <div className="form-page">
      <form className="card form-card" onSubmit={handleSendOtp}>
        <h2>Forgot Password</h2>
        <label>
          Enter your email
          <input value={email} onChange={e=>setEmail(e.target.value)} />
        </label>
        <button type="submit" className="btn">Send OTP</button>
      </form>
    </div>
  );
}
