import { useContext } from 'react';
import { BranchContext } from '../context/BranchContext';

export default function BranchGuard({ children }) {
  const { selectedBranch } = useContext(BranchContext);

  // No branch yet (e.g. a customer opened a shared link): stay on this URL and
  // show nothing while the location popup asks for a branch. Once they pick one,
  // the page they were sent to appears.
  if (!selectedBranch) return null;

  return children;
}
