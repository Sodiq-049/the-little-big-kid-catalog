import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { BranchContext } from '../context/BranchContext';
import AdminButton from './AdminButton';

function Navbar() {
  const { clearBranch, selectBranch, showModal } = useContext(BranchContext);

  const handleSwitchBranch = () => {
    clearBranch(); // This opens the modal by resetting selectedBranch
  };

  // Stay on the current page after choosing, so shared links like /shop-by-age/1 open as sent
  const handleSelectNewBranch = (branch) => {
    selectBranch(branch);
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
          <AdminButton />
        </li>
      </ul>

      {/* Branch modal shown here so it works across all pages */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content branch-modal">
            {/* The overlay covers the navbar, so admins get their own button here */}
            <AdminButton className="admin-icon-btn--modal" />
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
