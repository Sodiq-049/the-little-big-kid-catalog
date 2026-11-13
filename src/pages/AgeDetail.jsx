import React, { useContext } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './DetailPage.css';
import { BranchContext } from '../context/BranchContext';
import { findAgeGroup } from '../api';

function AgeDetail({ products }) {
  const { age } = useParams();
  const { selectedBranch } = useContext(BranchContext);

  const ageGroup = findAgeGroup(age);

  // Unknown age in the URL (e.g. an old /shop-by-age/0-3 link) → back to the age list
  if (!ageGroup) return <Navigate to="/shop-by-age" replace />;

  const ageItems = products.ageGroups[age] || [];

  return (
    <div className="detail-page-container">
      <h2>{ageGroup.key === 'adult' ? 'Gifts for Adults' : `Gifts for ${ageGroup.label}`}</h2>

      {ageItems.length === 0 && <p>No products yet for this age. Please check back soon!</p>}

      <div className="product-grid">
        {ageItems.map((item, index) => (
          <ProductCard key={item._id || index} product={item} />
        ))}
      </div>

      <div className="detail-links">
        <Link to="/shop-by-age" className="back-link">← Go Back</Link>

        {ageGroup.seeMore && (
          <a
            href={`${ageGroup.seeMore}?branch=${selectedBranch}`}
            target="_blank"
            rel="noopener noreferrer"
            className="see-more-link"
          >
            See More →
          </a>
        )}
      </div>
    </div>
  );
}

export default AgeDetail;
