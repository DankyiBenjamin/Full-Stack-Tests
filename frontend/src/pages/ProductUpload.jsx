import React, { useState, useEffect } from 'react';
import API from '../services/api';
import './ProductUpload.css';

function ProductUpload() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch user's products
  useEffect(() => {
    API.get('auth/products/?view=mine')
      .then(res => setProducts(res.data))
      .catch(() => setError('Could not fetch products'));
  }, []);

  // Fetch categories for dropdown
  useEffect(() => {
    API.get('auth/categories/')
      .then(res => setCategories(res.data))
      .catch(() => setError('Could not load categories'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('auth/products/', formData);
      setProducts(prev => [res.data, ...prev]);
      setFormData({ name: '', description: '', price: '', category: '' });
      setSuccess(true);
      setError(null);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError('Error submitting product');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Product</h2>

      {success && <p className="success-msg">✅ Product created!</p>}
      {error && <p className="error-msg">⚠️ {error}</p>}

      <form onSubmit={handleSubmit} className="upload-form">
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
        />

        <label>Price ($)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <button type="submit">Upload Product</button>
      </form>

      <hr />
      <h3>My Products</h3>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h4>{product.name}</h4>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Category:</strong> {product.category_name || product.category}</p>
            {product.description && <p>{product.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductUpload;
