import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './DetailPage.css';
import { BranchContext } from '../context/BranchContext';

import productsLekki from '../data/productsLekki';
import productsIkoyi from '../data/productsIkoyi';

const seeMoreLinks = {
  boys: "https://thelittlebigkidcompany.com/collections/boys-gift",
  girls: "https://thelittlebigkidcompany.com/collections/girls-gift"
};

function GenderDetail() {
  const { gender } = useParams();
  const { selectedBranch } = useContext(BranchContext);

  // Load products based on branch
  const products =
    selectedBranch === "Ikoyi" ? productsIkoyi : productsLekki;

  // FIXED: use the correct key
  const genderItems = products.genderGroups[gender] || [];

  return (
    <div className="detail-page-container">
      <h2>Gifts for {gender === 'boys' ? 'Boys' : 'Girls'}</h2>

      <div className="product-grid">
        {genderItems.map((item, index) => (
          <ProductCard key={index} product={item} />
        ))}
      </div>

      <div className="detail-links">
        <Link to="/gender-gifts" className="back-link">← Go Back</Link>

        <a
          href={`${seeMoreLinks[gender]}?branch=${selectedBranch}`}
          target="_blank"
          rel="noopener noreferrer"
          className="see-more-link"
        >
          See More →
        </a>
      </div>
    </div>
  );
}

export default GenderDetail;
