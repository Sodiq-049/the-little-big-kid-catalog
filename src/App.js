import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShopByAge from './pages/ShopByAge';
import GenderGifts from './pages/GenderGifts';
import AgeDetail from './pages/AgeDetail';
import GenderDetail from './pages/GenderDetail';
import BranchGuard from './components/BranchGuard';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Make sure this comes before Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop-by-age"
          element={
            <BranchGuard>
              <ShopByAge />
            </BranchGuard>
          }
        />
        <Route
          path="/shop-by-age/:age"
          element={
            <BranchGuard>
              <AgeDetail />
            </BranchGuard>
          }
        />
        <Route
          path="/gender-gifts"
          element={
            <BranchGuard>
              <GenderGifts />
            </BranchGuard>
          }
        />
        <Route
          path="/gender-gifts/:gender"
          element={
            <BranchGuard>
              <GenderDetail />
            </BranchGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;