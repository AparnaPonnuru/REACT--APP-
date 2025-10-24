// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forms.css';
import { Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert('Please enter both email and password');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || 'Login failed');

      const payload = data.data || data;
      const token = payload.token || payload.accessToken || null;
      const user = payload.user || payload;

      if (token) localStorage.setItem('token', token);
      if (user) {
        const safeUser = { ...user };
        if (safeUser.password) delete safeUser.password;
        localStorage.setItem('user', JSON.stringify(safeUser));
      }

      console.log('Login success:', payload);
      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Login failed');
    }
  }

  return (
    <div className="form-page">
      <form className="card form-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>
          Email
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            autoComplete="username"
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            autoComplete="current-password"
          />
        </label>

        <button type="submit" className="btn">Login</button>

        {/* Forgot password link */}
        <p className="forgot-password-text">
  <Link to="/forgot-password" className="forgot-link">
    Forgot your password?
  </Link>
  
</p>
      </form>
    </div>
  );
}
