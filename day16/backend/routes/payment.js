const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');
const User = require('../models/User');

router.post('/create-payment-intent', auth, async (req, res) => {
    try {
        // For this example, we'll calculate the total on the server
        // In a real app, you'd fetch this from your DB
        const user = await User.findById(req.user.id).populate('cart.productId');
        if (!user.cart || user.cart.length === 0) {
            return res.status(400).json({ msg: 'Cart is empty' });
        }

        const totalAmount = user.cart.reduce((total, item) => {
            return total + item.productId.price * item.quantity;
        }, 0);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount, // Amount in cents
            currency: 'inr',
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
