import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { BranchContext } from '../context/BranchContext';
import { AGE_GROUPS, findAgeGroup } from '../api';
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
          {AGE_GROUPS.map(({ key, label }) => (
            <li key={key} style={{ margin: '10px 0' }}>
              <Link to={`/shop-by-age/${key}`} className="age-link">
                {label}
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

  const ageGroup = findAgeGroup(age);

  return (
    <div style={{ padding: 30 }}>
      <h2>Gifts for {ageGroup.label} ({selectedBranch} Branch)</h2>
      <Link to="/shop-by-age" style={{ color: 'blue' }}>← Back to Age Groups</Link>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
        {ageProducts.map((item, i) => <ProductCard key={item._id || i} product={item} />)}
      </div>

      {ageGroup.seeMore && (
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <a
            href={`${ageGroup.seeMore}?branch=${selectedBranch}`}
            target="_blank"
            rel="noopener noreferrer"
            className="see-more-link"
          >
            SEE MORE →
          </a>
        </div>
      )}
    </div>
  );
}

export default ShopByAge;
