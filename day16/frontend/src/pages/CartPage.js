import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../context/CartContext';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CartPage = () => {
    const { cart, fetchCart } = useCart();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => { fetchCart() }, []);

    const handleCheckout = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/payment/create-payment-intent', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setClientSecret(data.clientSecret);
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.map(item => (
                <div key={item._id} className="cart-item">
                    <span>{item.product.name} (x{item.quantity})</span>
                    <span>₹{item.product.price / 100}</span>
                </div>
            ))}
            <button onClick={handleCheckout}>Proceed to Checkout</button>
            {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
};

export default CartPage;
