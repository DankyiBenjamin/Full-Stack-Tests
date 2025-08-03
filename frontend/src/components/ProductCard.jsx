import React from 'react';

function ProductCard({ product }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.name}>{product.name}</h3>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p style={styles.farmer}><em>Farmer #{product.farmer}</em></p>
    </div>
  );
}

const styles = {
  card: {
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    background: '#fafafa',
    boxShadow: '0 0 5px rgba(0,0,0,0.05)',
  },
  name: {
    marginBottom: '0.5rem',
    color: '#333'
  },
  farmer: {
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#666',
  }
};

export default ProductCard;
