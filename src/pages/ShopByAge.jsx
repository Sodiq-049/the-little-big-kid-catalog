import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { BranchContext } from '../context/BranchContext';
import './ShopByAge.css';

function ShopByAge({ products }) {
  const { selectedBranch } = useContext(BranchContext);
  const { age } = useParams();
  const navigate = useNavigate();

  if (!selectedBranch) {
    navigate('/');
    return null;
  }

  // If no age selected → show age categories
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

  const ageProducts = products.ageGroups[age];

  if (!ageProducts) {
    return (
      <div style={{ padding: 30 }}>
        <h2>No Products Found for Age Group: {age}</h2>
        <Link to="/shop-by-age" style={{ color: 'blue' }}>← Go Back</Link>
      </div>
    );
  }

  // Correct See More Links
  const seeMoreLinks = {
    "0-3": "https://thelittlebigkidcompany.com/collections/0-3-years",
    "3-6": "https://thelittlebigkidcompany.com/collections/3-6-years",
    "6-9": "https://thelittlebigkidcompany.com/collections/6-9-years",
    "9-12": "https://thelittlebigkidcompany.com/collections/9-12-years",
    "12-16": "https://thelittlebigkidcompany.com/collections/age-16",
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Gifts for Age {age} ({selectedBranch} Branch)</h2>
      <Link to="/shop-by-age" style={{ color: 'blue' }}>← Back to Age Groups</Link>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
        {ageProducts.map((item, i) => <ProductCard key={i} product={item} />)}
      </div>

      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <a
          href={`${seeMoreLinks[age]}?branch=${selectedBranch}`}
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
