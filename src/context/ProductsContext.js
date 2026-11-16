// src/context/ProductsContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { BranchContext } from './BranchContext';
import { fetchProducts, groupProducts } from '../api';

export const ProductsContext = createContext();

const emptyGroups = groupProducts([]);

export const ProductsProvider = ({ children }) => {
  const { selectedBranch } = useContext(BranchContext);
  // Remember which branch the loaded products (or error) belong to
  const [result, setResult] = useState({ branch: null, products: emptyGroups, error: null });

  useEffect(() => {
    if (!selectedBranch) return;
    let cancelled = false;

    fetchProducts(selectedBranch)
      .then((list) => {
        if (!cancelled) setResult({ branch: selectedBranch, products: groupProducts(list), error: null });
      })
      .catch(() => {
        if (!cancelled) {
          setResult({ branch: selectedBranch, products: emptyGroups, error: 'Could not load products. Please try again shortly.' });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedBranch]);

  // Still loading until products for the current branch have arrived, so pages never
  // flash "no products" (or the other branch's products) right after a branch is picked
  const loading = Boolean(selectedBranch) && result.branch !== selectedBranch;

  return (
    <ProductsContext.Provider
      value={{ products: loading ? emptyGroups : result.products, loading, error: loading ? null : result.error }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
