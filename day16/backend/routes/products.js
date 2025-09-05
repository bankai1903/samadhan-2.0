const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Seed some initial data if the DB is empty
const seedProducts = async () => {
    const count = await Product.countDocuments();
    if (count === 0) {
        await Product.insertMany([
            { name: 'Laptop Pro', description: 'A powerful laptop for professionals.', price: 120000, imageUrl: 'https://via.placeholder.com/150' },
            { name: 'Wireless Mouse', description: 'Ergonomic wireless mouse.', price: 2500, imageUrl: 'https://via.placeholder.com/150' },
            { name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard.', price: 7500, imageUrl: 'https://via.placeholder.com/150' }
        ]);
        console.log('Products seeded!');
    }
};
seedProducts();

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
