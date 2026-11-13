// src/context/BranchContext.js
import { createContext, useState, useEffect } from 'react';

export const BranchContext = createContext();

export const WHATSAPP_NUMBERS = {
  Lekki: "+2348101007614",   
  Ikoyi: "+2349087466702"
};


export const BranchProvider = ({ children }) => {
  // Read the saved branch on the first render so a page refresh (e.g. on /shop-by-age/3)
  // stays on the same page instead of being redirected home by BranchGuard
  const [selectedBranch, setSelectedBranch] = useState(() => sessionStorage.getItem('selectedBranch'));
  const [showModal, setShowModal] = useState(() => !sessionStorage.getItem('selectedBranch'));

  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('reset') === 'true') {
    localStorage.removeItem('selectedBranch');
  }
    }, []);

    const selectBranch = (branch, onComplete) => {
  sessionStorage.setItem('selectedBranch', branch);
  setSelectedBranch(branch);
  setShowModal(false);

  if (onComplete && typeof onComplete === 'function') {
    onComplete();
  }
    };

  const clearBranch = () => {
    sessionStorage.removeItem('selectedBranch');
    setSelectedBranch(null);
    setShowModal(true); // Force modal to show
  };

  return (
    <BranchContext.Provider
      value={{ selectedBranch, showModal, selectBranch, clearBranch }}
    >
      {children}
    </BranchContext.Provider>
  );
};