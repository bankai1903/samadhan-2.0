import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <h1><Link to="/">E-Store</Link></h1>
            <ul>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                {token ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
