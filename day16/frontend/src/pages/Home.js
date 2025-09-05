import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const Home = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Products</h2>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>₹{product.price / 100}</p>
                        <button onClick={() => addToCart(product._id)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
