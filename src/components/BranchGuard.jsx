import { useContext } from 'react';
import { BranchContext } from '../context/BranchContext';
import { Navigate } from 'react-router-dom';

export default function BranchGuard({ children }) {
  const { selectedBranch } = useContext(BranchContext);

  if (!selectedBranch) return <Navigate to="/" />;

  return children;
}
