import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div style={styles.card}>
      <Link to={`/product/${product.id}`} style={styles.link}>
        <h3 style={styles.name}>{product.name}</h3>
      </Link>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>

      {product.farmer_name && (
        <div style={styles.farmer}>
          <p><em>Farmer: {product.farmer_name}</em></p>
          <p><strong>Email:</strong> {product.farmer_email}</p>
          <p><strong>Phone:</strong> {product.farmer_phone}</p>
        </div>
      )}
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
    transition: 'all 0.2s ease',
  },
  name: {
    marginBottom: '0.5rem',
    color: '#333'
  },
  link: {
    textDecoration: 'none',
    color: '#333'
  },
  farmer: {
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#444',
    backgroundColor: '#f0f0f0',
    padding: '0.5rem',
    borderRadius: '4px',
  }
};

export default ProductCard;
