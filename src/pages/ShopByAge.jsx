import React, { useContext, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { BranchContext } from '../context/BranchContext';
import './ShopByAge.css';

function ShopByAge() {
  const { selectedBranch } = useContext(BranchContext);
  const { age } = useParams();
  const navigate = useNavigate();

  // Dynamically load products based on branch
  const products = useMemo(() => {
    if (selectedBranch === 'Ikoyi') {
      return require('../data/productsIkoyi').default;
    }
    return require('../data/productsLekki').default;
  }, [selectedBranch]);

  // If no branch selected (e.g. first visit), redirect home to select
  if (!selectedBranch) {
    navigate('/');
    return null;
  }

  // If no age group selected, show list of age categories
  if (!age) {
    return (
      <div style={{ padding: 30, textAlign: 'center' }}>
        <h2>Shop by Age ({selectedBranch} Branch)</h2>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {Object.keys(products.ageGroups).map((ageKey) => (
            <li key={ageKey} style={{ margin: '10px 0' }}>
              <Link to={`/shop-by-age/${ageKey}`} className="age-link">
                Age {ageKey} Years
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Display products for that age group
  const ageProducts = products.ageGroups[age];

  if (!ageProducts) {
    return (
      <div style={{ padding: 30 }}>
        <h2>No Products Found for Age Group: {age}</h2>
        <Link to="/shop-by-age" style={{ color: 'blue' }}>← Go Back</Link>
      </div>
    );
  }

  // Dynamic “See More” links based on branch
  const seeMoreLinks = {
    Lekki: {
      "0-3": "https://lekki-store.myshopify.com/collections/0-3-years",
      "3-6": "https://lekki-store.myshopify.com/collections/3-6-years",
      "6-9": "https://lekki-store.myshopify.com/collections/6-9-years",
      "9-12": "https://lekki-store.myshopify.com/collections/9-12-years",
      "12-16": "https://lekki-store.myshopify.com/collections/age-16",
    },
    Ikoyi: {
      "0-3": "https://ikoyi-store.myshopify.com/collections/0-3-years",
      "3-6": "https://ikoyi-store.myshopify.com/collections/3-6-years",
      "6-9": "https://ikoyi-store.myshopify.com/collections/6-9-years",
      "9-12": "https://ikoyi-store.myshopify.com/collections/9-12-years",
      "12-16": "https://ikoyi-store.myshopify.com/collections/age-16",
    },
  };

  const branchLinks = seeMoreLinks[selectedBranch];

  return (
    <div style={{ padding: 30 }}>
      <h2>Gifts for Age {age} ({selectedBranch} Branch)</h2>
      <Link to="/shop-by-age" style={{ color: 'blue' }}>← Back to Age Groups</Link>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
        {ageProducts.map((item, i) => <ProductCard key={i} product={item} />)}
      </div>

      {/* See More Link */}
      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <a
          href={branchLinks[age]}
          target="_blank"
          rel="noopener noreferrer"
          className="see-more-link"
        >
          SEE MORE →
        </a>
      </div>
    </div>
  );
}

export default ShopByAge;
