import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './DetailPage.css'; // styling file

const selectedBranch = localStorage.getItem('selectedBranch');
const products = selectedBranch === 'Lekki'
  ? require('../data/productsLekki').default
  : require('../data/productsIkoyi').default;

// SeeMore links for different age groups
  const seeMoreLinks = {
        "0-3": "https://thelittlebigkidcompany.com/collections/0-3-years",
        "3-6": "https://thelittlebigkidcompany.com/collections/3-6-years",
        "6-9": "https://thelittlebigkidcompany.com/collections/6-9-years",
        "9-12": "https://thelittlebigkidcompany.com/collections/9-12-years",
        "12-16": "https://thelittlebigkidcompany.com/collections/age-16",
    };
    
function AgeDetail() {
  const { age } = useParams();
  const ageItems = products.ageGroups[age] || [];

  // Shopify collection URL for that age group
  // const shopifyLink = selectedBranch === 'Lekki'
  //   ? `https://thelittlebigkidcompany.com/collections/${age}?branch=Lekki`
  //   : `https://thelittlebigkidcompany.com/collections/${age}?branch=Ikoyi`;


  return (
    <div className="detail-page-container">
      <h2>Gifts for Age {age}</h2>

      <div className="product-grid">
        {ageItems.map((item, index) => (
          <ProductCard key={index} product={item} />
        ))}
      </div>

      <div className="detail-links">
        <Link to="/shop-by-age" className="back-link">← Go Back</Link>
        <a href={`${seeMoreLinks[age]}?branch=${selectedBranch}`} target="_blank" rel="noopener noreferrer" className="see-more-link">
          See More →
        </a>
      </div>
    </div>
  );
}

export default AgeDetail;