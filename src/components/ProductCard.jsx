import React, { useState, useContext } from 'react';
import { BranchContext } from '../context/BranchContext';

function ProductCard({ product }) {
  const { selectedBranch } = useContext(BranchContext);
  const [showModal, setShowModal] = useState(false);

  // Branch-specific WhatsApp numbers
  const whatsappNumbers = {
    Lekki: "234 810 100 7614", // <-- PUT LEKKI NUMBER
    Ikoyi: "234 908 746 6702"  // <-- PUT IKOYI NUMBER
  };

  const phone = whatsappNumbers[selectedBranch];

  // WhatsApp message with item details
  const whatsappMessage = encodeURIComponent(
    `Hello! I am interested in this item:\n\n${product.name}\nPrice: ${product.price}\n\nImage: ${product.img}`
  );

  const whatsappLink = `https://wa.me/${phone}?text=${whatsappMessage}`;

  return (
    <>
      {/* PRODUCT CARD */}
      <div
        onClick={() => setShowModal(true)}
        style={{ ...cardStyle, cursor: 'pointer' }}
      >
        <div style={textStyle}>
          <img src={product.img} alt={product.name} style={imageStyle} />
          <div><strong>{product.name}</strong></div>
          <div style={{ color: '#555', marginTop: 4 }}>{product.price}</div>
        </div>
      </div>

      {/* POPUP MODAL */}
      {showModal && (
        <div style={modalOverlay} onClick={() => setShowModal(false)}>
          <div style={modalBox} onClick={(e) => e.stopPropagation()}>
            
            {/* Close button */}
            <button style={closeBtn} onClick={() => setShowModal(false)}>✖</button>

            <h3>{product.name}</h3>
            <img src={product.img} alt={product.name} style={modalImage} />

            <p style={{ marginTop: 10, fontSize: 16 }}>
              {product.price}
            </p>

            {/* BUTTONS */}
            <div style={{ marginTop: 20 }}>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={whatsappBtn}>
                Continue Order on WhatsApp
              </a>

              <a href={product.url} target="_blank" rel="noopener noreferrer" style={checkoutBtn}>
                Checkout on Website
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------- STYLES ------------------------ */

const cardStyle = {
  width: 230,
  textDecoration: 'none',
  color: 'black',
  border: '1px solid #ddd',
  borderRadius: 6,
  padding: 10,
  textAlign: 'center',
  backgroundColor: '#fff',
};

const imageStyle = {
  width: '100%',
  height: 230,
  objectFit: 'cover',
  borderRadius: 4,
};

const textStyle = {
  marginTop: 10,
  fontSize: 14,
};

/* ------------------ MODAL STYLES ------------------- */

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const modalBox = {
  width: 340,
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 10,
  position: 'relative',
  textAlign: 'center'
};

const closeBtn = {
  position: 'absolute',
  top: 10,
  right: 10,
  background: 'transparent',
  border: 'none',
  fontSize: 20,
  cursor: 'pointer'
};

const modalImage = {
  width: '100%',
  borderRadius: 8,
  marginTop: 10
};

const whatsappBtn = {
  display: 'block',
  padding: '10px 15px',
  margin: '10px 0',
  backgroundColor: '#25D366',
  color: '#fff',
  borderRadius: 5,
  textDecoration: 'none',
  fontWeight: 'bold'
};

const checkoutBtn = {
  display: 'block',
  padding: '10px 15px',
  backgroundColor: '#007bff',
  color: '#fff',
  borderRadius: 5,
  textDecoration: 'none',
  fontWeight: 'bold'
};

export default ProductCard;
