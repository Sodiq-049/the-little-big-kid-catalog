// src/context/ProductsContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { BranchContext } from './BranchContext';
import { fetchProducts, groupProducts } from '../api';

export const ProductsContext = createContext();

const emptyGroups = groupProducts([]);

export const ProductsProvider = ({ children }) => {
  const { selectedBranch } = useContext(BranchContext);
  const [products, setProducts] = useState(emptyGroups);
  // Start in the loading state when a branch is already saved (e.g. after a page refresh)
  const [loading, setLoading] = useState(Boolean(selectedBranch));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedBranch) return;
    let cancelled = false;

    setLoading(true);
    setError(null);
    fetchProducts(selectedBranch)
      .then((list) => {
        if (!cancelled) setProducts(groupProducts(list));
      })
      .catch(() => {
        if (!cancelled) setError('Could not load products. Please try again shortly.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedBranch]);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};
