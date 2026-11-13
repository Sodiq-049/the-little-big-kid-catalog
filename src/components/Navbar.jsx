import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { BranchContext } from '../context/BranchContext';
import { getToken } from '../api';

function Navbar() {
  const { clearBranch, selectBranch, showModal } = useContext(BranchContext);
  const navigate = useNavigate();
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [iconFailed, setIconFailed] = useState(false);

  const handleAdminYes = () => {
    setShowAdminPrompt(false);
    navigate(getToken() ? '/admin' : '/admin/login');
  };

  const handleSwitchBranch = () => {
    clearBranch(); // This opens the modal by resetting selectedBranch
  };

  const handleSelectNewBranch = (branch) => {
    selectBranch(branch, () => {
      navigate('/'); // ✅ Redirect after selection
    });
  };

  return (
    <nav className="navbar">
      <div className="logo">The Little Big Kid Co.</div>

      <ul className="nav-links">
        <li className="home"><Link to="/">Home</Link></li>
        <li>
          <button onClick={handleSwitchBranch} className="switch-branch-btn">
            Switch Branch
          </button>
        </li>
        <li>
          <button
            onClick={() => setShowAdminPrompt(true)}
            className="admin-icon-btn"
            aria-label="Admin"
            title="Admin"
          >
            {/* Admin panel icon by SBTS2018 - Flaticon (https://www.flaticon.com/free-icons/admin-panel) */}
            {iconFailed ? (
              <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
                <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm0 5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm0 12.2c-2-.7-3.7-2.2-4.5-4 .6-1.2 2.6-2 4.5-2s3.9.8 4.5 2c-.8 1.8-2.5 3.3-4.5 4Z" />
              </svg>
            ) : (
              <img src="/admin-icon.png" alt="" onError={() => setIconFailed(true)} />
            )}
          </button>
        </li>
      </ul>

      {showAdminPrompt && (
        <div className="modal-overlay" onClick={() => setShowAdminPrompt(false)}>
          <div className="modal-content admin-prompt" onClick={(e) => e.stopPropagation()}>
            <h2>Are you an Admin?</h2>
            <div className="admin-prompt-actions">
              <button onClick={handleAdminYes} className="admin-prompt-yes">Yes</button>
              <button onClick={() => setShowAdminPrompt(false)} className="admin-prompt-no">No</button>
            </div>
          </div>
        </div>
      )}

      {/* Branch modal shown here so it works across all pages */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Select Your Store Location</h2>
            <button onClick={() => handleSelectNewBranch('Lekki')} className="branch-btn lekki">Lekki Branch</button>
            <button onClick={() => handleSelectNewBranch('Ikoyi')} className="branch-btn ikoyi">Ikoyi Branch</button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;