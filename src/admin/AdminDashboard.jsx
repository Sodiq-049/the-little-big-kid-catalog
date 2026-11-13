import React, { useCallback, useEffect } from 'react';
import { Link, Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { checkSession, clearToken, getToken, UnauthorizedError } from '../api';
import './Admin.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const token = getToken();

  const logout = useCallback(() => {
    clearToken();
    navigate('/admin/login', { replace: true });
  }, [navigate]);

  // Child pages call this with any API error; an expired session sends the admin back to sign in
  const handleApiError = useCallback(
    (err) => {
      if (err instanceof UnauthorizedError) {
        logout();
        return true;
      }
      return false;
    },
    [logout]
  );

  useEffect(() => {
    if (token) checkSession().catch(handleApiError);
  }, [token, handleApiError]);

  if (!token) return <Navigate to="/admin/login" replace />;

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-title">The Little Big Kid Co. · Admin</div>
        <div className="admin-header-actions">
          <Link to="/" className="admin-header-link">View Catalog</Link>
          <button onClick={logout} className="admin-logout-btn">Log Out</button>
        </div>
      </header>

      <nav className="admin-tabs">
        <NavLink to="add-product" className="admin-tab">Add Product</NavLink>
        <NavLink to="products" className="admin-tab">Products</NavLink>
      </nav>

      <main className="admin-main">
        <Outlet context={{ handleApiError }} />
      </main>

      <footer className="admin-footer">
        <a href="https://www.flaticon.com/free-icons/admin-panel" title="admin panel icons" target="_blank" rel="noopener noreferrer">
          Admin panel icons created by SBTS2018 - Flaticon
        </a>
      </footer>
    </div>
  );
}

export default AdminDashboard;
