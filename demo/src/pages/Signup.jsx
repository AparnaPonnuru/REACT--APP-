// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forms.css';

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!form.username || !form.email || !form.password) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.username,
          email: form.email,
          password: form.password
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || data.message || 'Signup failed');

      // Success
      console.log('Signup success:', data);
      setMessage('Signup successful! Redirecting to login...');
      
      // Optional: store token if you want auto-login
      // localStorage.setItem('token', data.token);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      console.error(err);
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-page">
      <form className="card form-card" onSubmit={handleSubmit}>
        <h2>Create account</h2>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <label>
          Username
          <input name="username" value={form.username} onChange={handleChange} placeholder="Enter username" />
        </label>

        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@domain.com" />
        </label>

        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter password" />
        </label>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
    </div>
  );
}
