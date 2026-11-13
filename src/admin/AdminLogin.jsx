import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getToken, login, setToken } from '../api';
import './Admin.css';

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (getToken()) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await login(email, password);
      setToken(token);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message === 'Failed to fetch' ? 'Cannot reach the server. Please try again.' : err.message);
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <img
          src="https://thelittlebigkidcompany.com/cdn/shop/files/The-Little-Big_Kid-Company-Logo_400x.png?v=1698256457"
          alt="The Little Big Kid Co."
          className="admin-login-logo"
        />
        <h2>Admin Sign In</h2>

        <div className="form-field">
          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>

        <Link to="/" className="admin-back-link">← Back to catalog</Link>
      </form>
    </div>
  );
}

export default AdminLogin;
