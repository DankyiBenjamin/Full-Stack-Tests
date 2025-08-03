import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState(null);

  const token = localStorage.getItem('access_token');

  // Fetch products
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

  // Fetch categories
  useEffect(() => {
    if (token) {
      API.get('auth/categories/')
        .then(res => setCategories(res.data))
        .catch(err => {
          console.error(err);
          setError('Failed to load categories.');
        });
    }
  }, [token]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => String(product.category) === selectedCategory)
    : products;

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

      {/* Category filter dropdown */}
      <div>
        <label htmlFor="category-select"><strong>Filter by Category:</strong></label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ marginLeft: '10px' }}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div style={styles.grid}>
          {filteredProducts.map(product => (
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
