import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './GenderGifts.css';

const selectedBranch = localStorage.getItem('selectedBranch') || 'Lekki'; // Default to Lekki if not set

const products = selectedBranch === 'Lekki'
    ? require('../data/productsLekki').default
    : require('../data/productsIkoyi').default;

function GenderGifts() {
  const { gender } = useParams();

  // If no gender is selected, show the list of genders

if (!gender) {
  return (
    <div style={{ padding: 30 }}>
      <h2>Gifts by Gender</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        <li style={{ margin: '10px 0' }}>
          <Link to="/gender-gifts/boys" className=" boys-link">Boys Gifts</Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link to="/gender-gifts/girls" className=" girls-link">Girls Gifts</Link>
        </li>
      </ul>
    </div>
  );
}

  const genderProducts = products.genders[gender];

  if (!genderProducts) {
    return (
      <div style={{ padding: 30 }}>
        <h2>No Products Found for Gender: {gender}</h2>
        <Link to="/gender-gifts" style={{ color: 'blue' }}>← Go Back</Link>
      </div>
    );
  }

  // SeeMore links for different age groups (if needed elsewhere)
  const seeMoreLinks = {
    boys: "https://thelittlebigkidcompany.com/collections/boys-gift",
    girls: "https://thelittlebigkidcompany.com/collections/girls-gift",
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>{gender.charAt(0).toUpperCase() + gender.slice(1)} Gifts</h2>
      <Link to="/gender-gifts" style={{ color: 'blue' }}>← Back to Gender List</Link>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
        {genderProducts.map((item, i) => <ProductCard key={i} product={item} />)}
      </div>

      {/* SeeMore Link */}
      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <a
            href={`${seeMoreLinks[gender]}?branch=Lekki`}
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

export default GenderGifts;