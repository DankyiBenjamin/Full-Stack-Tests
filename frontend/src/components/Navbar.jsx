import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!token;
  const isFarmer = user?.is_farmer;

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h3 className="navbar-title">🌾 FarmDirect</h3>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            {isFarmer && <Link className="nav-link" to="/products">My Products</Link>}
            <Link className="nav-link" to="/marketplace">Marketplace</Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
