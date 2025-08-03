import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { parseJwt } from '../services/auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post('auth/token/', { username, password })
      .then(res => {
        const { access, refresh } = res.data;

        // Store tokens
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        // Decode token to get user info
        const user = parseJwt(access);
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect to marketplace
        navigate('/marketplace');
      })
      .catch(() => setError('Invalid credentials.'));
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
