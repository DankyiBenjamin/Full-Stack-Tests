import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`auth/products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{product.name}</h2>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p>{product.description}</p>

      <h4>Farmer Info</h4>
      <p><strong>Name:</strong> {product.farmer_name}</p>
      <p><strong>Email:</strong> {product.farmer_email}</p>
      <p><strong>Phone:</strong> {product.farmer_phone}</p>
    </div>
  );
}

export default ProductDetail;
