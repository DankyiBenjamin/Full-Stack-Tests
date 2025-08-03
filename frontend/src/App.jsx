import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductUpload from './pages/ProductUpload';
import Marketplace  from './pages/MarketPlace';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<div>Welcome to the dashboard!</div>} />
      <Route path="/products" element={<ProductUpload />} />
      <Route path="/marketplace" element={<Marketplace />} />

    </Routes>
    </>
  );
}

export default App;
