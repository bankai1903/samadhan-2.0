import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch('/api/cart', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setCart(data);
    };

    const addToCart = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to add items to the cart');
            return;
        }
        await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ productId })
        });
        fetchCart(); // Refresh cart
    };

    return (
        <CartContext.Provider value={{ cart, setCart, fetchCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
