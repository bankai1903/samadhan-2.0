const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Product = require('../models/Product');

// Get user's cart
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.product');
        res.json(user.cart);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add item to cart
router.post('/', auth, async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user.id);
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ msg: 'Product not found' });
        
        const itemIndex = user.cart.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            user.cart[itemIndex].quantity += 1;
        } else {
            user.cart.push({ product: productId, quantity: 1 });
        }
        await user.save();
        res.json(user.cart);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
