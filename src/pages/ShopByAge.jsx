import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './ShopByAge.css'; // Importing styles for this page

const selectedBranch = localStorage.getItem('selectedBranch') || 'Lekki'; // Default to Lekki if not set

const products = selectedBranch === 'Lekki'
    ? require('../data/productsLekki').default
    : require('../data/productsIkoyi').default;

function ShopByAge() {
  const { age } = useParams(); // read URL param (e.g. "0-2")

  // If no age is selected, show list of age categories
  if (!age) {
    return (
      <div style={{ padding: 30, textAlign: 'center' }}>
            <h2>Shop by Age</h2>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {Object.keys(products.ageGroups).map((ageKey) => (
                    <li key={ageKey} style={{ margin: '10px 0' }}>
                        <Link to={`/shop-by-age/${ageKey}`} className=" age-link">
                            Age {ageKey} Years
                        </Link>
                    </li>
                ))}
            </ul>
      </div>

    );
  }

  // If age is selected, show its product items
  const ageProducts = products.ageGroups[age];

  if (!ageProducts) {
    return (
      <div style={{ padding: 30 }}>
        <h2>No Products Found for Age Group: {age}</h2>
        <Link to="/shop-by-age" style={{ color: 'blue' }}>← Go Back</Link>
      </div>
    );
  }

  const seeMoreLinks = {
        "0-3": "https://thelittlebigkidcompany.com/collections/0-3-years",
        "3-6": "https://thelittlebigkidcompany.com/collections/3-6-years",
        "6-9": "https://thelittlebigkidcompany.com/collections/6-9-years",
        "9-12": "https://thelittlebigkidcompany.com/collections/9-12-years",
        "12-16": "https://thelittlebigkidcompany.com/collections/age-16",
    };

  return (
    <div style={{ padding: 30 }}>
      <h2>Gifts for Age {age}</h2>
      <Link to="/shop-by-age" style={{ color: 'blue' }}>← Back to Age Groups</Link>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
        {ageProducts.map((item, i) => <ProductCard key={i} product={item} />)}
      </div>

      {/* SeeMore Link */}
        <div style={{ marginTop: 40, textAlign: 'center' }}>
                <a
                href={`${seeMoreLinks[age]}?branch=Lekki`}
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