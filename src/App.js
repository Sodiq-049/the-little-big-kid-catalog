import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShopByAge from './pages/ShopByAge';
import GenderGifts from './pages/GenderGifts';
import AgeDetail from './pages/AgeDetail';
import GenderDetail from './pages/GenderDetail';
import BranchGuard from './components/BranchGuard';
import Navbar from './components/Navbar';

import productsLekki from './data/productsLekki';
import productsIkoyi from './data/productsIkoyi';

import { useContext } from 'react';
import { BranchContext } from './context/BranchContext';

function App() {
  const { selectedBranch } = useContext(BranchContext);

  // Choose correct product set
  const products =
    selectedBranch === "Ikoyi" ? productsIkoyi : productsLekki;

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/shop-by-age"
          element={
            <BranchGuard>
              <ShopByAge products={products} />
            </BranchGuard>
          }
        />

        <Route
          path="/shop-by-age/:age"
          element={
            <BranchGuard>
              <AgeDetail products={products} />
            </BranchGuard>
          }
        />

        <Route
          path="/gender-gifts"
          element={
            <BranchGuard>
              <GenderGifts products={products} />
            </BranchGuard>
          }
        />

        <Route
          path="/gender-gifts/:gender"
          element={
            <BranchGuard>
              <GenderDetail products={products} />
            </BranchGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
