import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { BranchContext } from '../context/BranchContext';

function Navbar() {
  const { clearBranch, selectBranch, showModal } = useContext(BranchContext);
  const navigate = useNavigate();

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
      </ul>

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