// src/context/BranchContext.js
import { createContext, useState, useEffect } from 'react';

export const BranchContext = createContext();

export const BranchProvider = ({ children }) => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const branch = localStorage.getItem('selectedBranch');
    if (branch) {
      setSelectedBranch(branch);
      setShowModal(false);
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