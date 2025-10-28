// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  const resetToken = location.state?.resetToken || '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  async function handleReset(e){
    e.preventDefault();
    if(!password || password !== confirm) return alert('Passwords must match');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/reset-password`, {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email, resetToken, newPassword: password })
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || data.message || 'Reset failed');
      alert('Password updated. Please login with new password.');
      navigate('/login');
    } catch(err) {
      alert(err.message);
    }
  }

  return (
    <div className="form-page">
      <form className="card form-card" onSubmit={handleReset}>
        <h2>Reset Password</h2>
        <label>
          New Password
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </label>
        <label>
          Confirm Password
          <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} />
        </label>
        <button type="submit" className="btn">Set New Password</button>
      </form>
    </div>
  );
}
