// src/pages/Register.jsx
import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    is_farmer: true, // default to true for now
  });

  // Error & success states
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('auth/register/', formData);
      setSuccess(true);
      setErrors(null);
      setTimeout(() => navigate('/login'), 1500); // redirect after 1.5s
    } catch (err) {
      setSuccess(false);
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ detail: 'Something went wrong. Try again.' });
      }
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      {success && <p style={{ color: 'green' }}>Registration successful!</p>}
      {errors && (
        <ul style={{ color: 'red' }}>
          {Object.entries(errors).map(([field, msg], idx) => (
            <li key={idx}>
              {field}: {Array.isArray(msg) ? msg[0] : msg}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label><br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

         <div>
        <label>Phone Number:</label><br />
        <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
        />
        </div>


        <div>
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Confirm Password:</label><br />
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="is_farmer"
              checked={formData.is_farmer}
              onChange={handleChange}
            />
            Are you a farmer?
          </label>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
