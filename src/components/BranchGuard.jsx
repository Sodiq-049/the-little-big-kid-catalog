// src/components/BranchGuard.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const BranchGuard = ({ children }) => {
  const selectedBranch = localStorage.getItem('selectedBranch');

  if (!selectedBranch) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default BranchGuard;