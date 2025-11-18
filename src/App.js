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

import { useState } from 'react';

function App() {
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Choose which products to show based on selected branch
  const products =
    selectedBranch === "Ikoyi" ? productsIkoyi : productsLekki;

  return (
    <Router>
      {/* Navbar can switch branch */}
      <Navbar
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/shop-by-age"
          element={
            <BranchGuard selectedBranch={selectedBranch}>
              <ShopByAge products={products} />
            </BranchGuard>
          }
        />

        <Route
          path="/shop-by-age/:age"
          element={
            <BranchGuard selectedBranch={selectedBranch}>
              <AgeDetail products={products} />
            </BranchGuard>
          }
        />

        <Route
          path="/gender-gifts"
          element={
            <BranchGuard selectedBranch={selectedBranch}>
              <GenderGifts products={products} />
            </BranchGuard>
          }
        />

        <Route
          path="/gender-gifts/:gender"
          element={
            <BranchGuard selectedBranch={selectedBranch}>
              <GenderDetail products={products} />
            </BranchGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
