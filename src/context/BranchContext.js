// src/context/BranchContext.js
import { createContext, useState, useEffect } from 'react';

export const BranchContext = createContext();

export const BranchProvider = ({ children }) => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('reset') === 'true') {
    localStorage.removeItem('selectedBranch');
  }

  const stored = localStorage.getItem('selectedBranch');
  if (stored) {
    setSelectedBranch(stored);
    setShowModal(false);
  } else {
    setShowModal(true);
  }
    }, []);

    const selectBranch = (branch, onComplete) => {
  localStorage.setItem('selectedBranch', branch);
  setSelectedBranch(branch);
  setShowModal(false);

  if (onComplete && typeof onComplete === 'function') {
    onComplete();
  }
    };

  const clearBranch = () => {
    localStorage.removeItem('selectedBranch');
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