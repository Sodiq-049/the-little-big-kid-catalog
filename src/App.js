import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ShopByAge from './pages/ShopByAge';
import GenderGifts from './pages/GenderGifts';
import AgeDetail from './pages/AgeDetail';
import GenderDetail from './pages/GenderDetail';
import BranchGuard from './components/BranchGuard';
import Navbar from './components/Navbar';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AddProduct from './admin/AddProduct';
import ProductList from './admin/ProductList';

import { useContext } from 'react';
import { ProductsContext } from './context/ProductsContext';

// Branch check plus loading/error states for pages that show products
function CatalogPage({ children }) {
  const { loading, error } = useContext(ProductsContext);

  let content = children;
  if (error) content = <p style={{ padding: 30, textAlign: 'center' }}>{error}</p>;
  else if (loading) content = <p style={{ padding: 30, textAlign: 'center' }}>Loading products…</p>;

  return <BranchGuard>{content}</BranchGuard>;
}

function AppRoutes() {
  const { products } = useContext(ProductsContext);
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {/* The admin area has its own header and doesn't need a branch */}
      {!isAdmin && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/shop-by-age"
          element={
            <CatalogPage>
              <ShopByAge products={products} />
            </CatalogPage>
          }
        />

        <Route
          path="/shop-by-age/:age"
          element={
            <CatalogPage>
              <AgeDetail products={products} />
            </CatalogPage>
          }
        />

        <Route
          path="/gender-gifts"
          element={
            <CatalogPage>
              <GenderGifts products={products} />
            </CatalogPage>
          }
        />

        <Route
          path="/gender-gifts/:gender"
          element={
            <CatalogPage>
              <GenderDetail products={products} />
            </CatalogPage>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Navigate to="add-product" replace />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<ProductList />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
