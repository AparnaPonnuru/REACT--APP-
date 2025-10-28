// src/pages/VerifyOtp.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const email = location.state?.email || '';

  async function handleVerify(e){
    e.preventDefault();
    if(!email) return alert('Missing email, go back to Forgot Password');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/verify-otp`, {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || data.message || 'Invalid OTP');
      // we get resetToken from backend
      const resetToken = data.resetToken;
      alert('OTP verified');
      // navigate to reset page and pass email + resetToken
      navigate('/reset-password', { state: { email, resetToken }});
    } catch(err) {
      alert(err.message);
    }
  }

  return (
    <div className="form-page">
      <form className="card form-card" onSubmit={handleVerify}>
        <h2>Enter OTP</h2>
        <p>We sent an OTP to <strong>{email}</strong></p>
        <label>
          OTP
          <input value={otp} onChange={e=>setOtp(e.target.value)} />
        </label>
        <button type="submit" className="btn">Verify OTP</button>
      </form>
    </div>
  );
}
