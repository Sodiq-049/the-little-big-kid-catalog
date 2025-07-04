import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './DetailPage.css';

const selectedBranch = localStorage.getItem('selectedBranch');
const products = selectedBranch === 'Lekki'
  ? require('../data/productsLekki').default
  : require('../data/productsIkoyi').default;

// SeeMore links for different age groups
  const seeMoreLinks = {
        boys: "https://thelittlebigkidcompany.com/collections/boys-gift",
        girls: "https://thelittlebigkidcompany.com/collections/girls-gift"
    };

function GenderDetail() {
  const { gender } = useParams();
  const genderItems = products.genderGroups[gender] || [];

  // Dynamic Shopify link for gender group
//   const shopifyLink = selectedBranch === 'Lekki'
//     ? `https://thelittlebigkidcompany.com/collections/${gender}?branch=Lekki`
//     : `https://thelittlebigkidcompany.com/collections/${gender}?branch=Ikoyi`;

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