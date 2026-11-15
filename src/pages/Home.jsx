import React, { useContext } from 'react';
import './Home.css';
import { BranchContext } from '../context/BranchContext';
import { Link } from 'react-router-dom';

function Home() {
  // The "Select Your Store Location" popup lives in Navbar so it works on every page
  const { showModal } = useContext(BranchContext);

  return (
    <div className="home-container">
      {!showModal && (
        <>
          <img
            src="https://thelittlebigkidcompany.com/cdn/shop/files/The-Little-Big_Kid-Company-Logo_400x.png?v=1698256457"
            alt="Logo"
          />
          <h1>Welcome to The Little Big Kid Company 🎁</h1>
          <p>Your go-to store for the cutest gifts for boys and girls of all ages!</p>
          <div className="link-buttons">
            <Link to="/shop-by-age" className="category-link">Shop by Age</Link>
            <Link to="/gender-gifts" className="category-link">Shop by Gender</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;