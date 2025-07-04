import React from 'react';

function ProductCard({ product }) {
  return (
    <a href={product.url} target="_blank" rel="noopener noreferrer" style={cardStyle}>
      <div style={textStyle}>
        <img src={product.img} alt={product.name} style={imageStyle} />
        <div><strong>{product.name}</strong></div>
        <div style={{ color: '#555', marginTop: 4 }}>{product.price}</div>
      </div>
    </a>
  );
}

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
  width: '',
  height: 230,
  objectFit: 'cover',
  borderRadius: 4,
};

const textStyle = {
  marginTop: 10,
  fontSize: 14,
};

export default ProductCard;