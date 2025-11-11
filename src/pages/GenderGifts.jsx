import React, { useContext, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { BranchContext } from '../context/BranchContext';
import './GenderGifts.css';

function GenderGifts() {
  const { selectedBranch } = useContext(BranchContext);
  const { gender } = useParams();
  const navigate = useNavigate();

  // Dynamically load product data based on selected branch
  const products = useMemo(() => {
    if (selectedBranch === 'Ikoyi') {
      return require('../data/productsIkoyi').default;
    }
    return require('../data/productsLekki').default;
  }, [selectedBranch]);

  // Redirect to home if branch not selected
  if (!selectedBranch) {
    navigate('/');
    return null;
  }

  // If no gender is selected, show options
  if (!gender) {
    return (
      <div style={{ padding: 30 }}>
        <h2>Gifts by Gender ({selectedBranch} Branch)</h2>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li style={{ margin: '10px 0' }}>
            <Link to="/gender-gifts/boys" className="boys-link">Boys Gifts</Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link to="/gender-gifts/girls" className="girls-link">Girls Gifts</Link>
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

  // Shopify “See More” links by branch
  const seeMoreLinks = {
    Lekki: {
      boys: "https://thelittlebigkidcompany.com/collections/boys-gift",
      girls: "https://thelittlebigkidcompany.com/collections/girls-gift",
    },
    Ikoyi: {
      boys: "https://thelittlebigkidcompany.com/collections/boys-gift-ikoyi",
      girls: "https://thelittlebigkidcompany.com/collections/girls-gift-ikoyi",
    },
  };

  const branchLinks = seeMoreLinks[selectedBranch];

  return (
    <div style={{ padding: 30 }}>
      <h2>{gender.charAt(0).toUpperCase() + gender.slice(1)} Gifts ({selectedBranch} Branch)</h2>
      <Link to="/gender-gifts" style={{ color: 'blue' }}>← Back to Gender List</Link>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
        {genderProducts.map((item, i) => (
          <ProductCard key={i} product={item} />
        ))}
      </div>

      {/* See More Link */}
      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <a
          href={branchLinks[gender]}
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
