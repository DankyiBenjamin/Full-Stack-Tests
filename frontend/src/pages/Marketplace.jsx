import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (token) {
      API.get('auth/products/')
        .then(res => setProducts(res.data))
        .catch(err => {
          console.error(err);
          setError('Failed to load products.');
        });
    }
  }, [token]);

  if (!token) {
    return (
      <div className="container">
        <h2>Marketplace</h2>
        <p>
          You must be logged in to view the marketplace.{' '}
          <Link to="/login">Log in</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Marketplace</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div style={styles.grid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem',
  }
};

export default Marketplace;
