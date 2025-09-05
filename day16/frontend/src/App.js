import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
