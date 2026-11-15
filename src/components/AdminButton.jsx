import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../api';

// Admin icon + "Are you an Admin?" prompt. Used in the navbar and on the location popup.
function AdminButton({ className = '' }) {
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);
  const [iconFailed, setIconFailed] = useState(false);

  const handleYes = () => {
    setShowPrompt(false);
    navigate(getToken() ? '/admin' : '/admin/login');
  };

  return (
    <>
      <button
        onClick={() => setShowPrompt(true)}
        className={`admin-icon-btn ${className}`.trim()}
        aria-label="Admin"
        title="Admin"
      >
        {iconFailed ? (
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
            <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm0 5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm0 12.2c-2-.7-3.7-2.2-4.5-4 .6-1.2 2.6-2 4.5-2s3.9.8 4.5 2c-.8 1.8-2.5 3.3-4.5 4Z" />
          </svg>
        ) : (
          <img src="/admin-icon.png" alt="" onError={() => setIconFailed(true)} />
        )}
      </button>

      {showPrompt && (
        <div className="modal-overlay admin-prompt-overlay" onClick={() => setShowPrompt(false)}>
          <div className="modal-content admin-prompt" onClick={(e) => e.stopPropagation()}>
            <h2>Are you an Admin?</h2>
            <div className="admin-prompt-actions">
              <button onClick={handleYes} className="admin-prompt-yes">Yes</button>
              <button onClick={() => setShowPrompt(false)} className="admin-prompt-no">No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminButton;
