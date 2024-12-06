const express = require('express');
const authenticateToken = require('./jwt');
const cors = require('cors');

const router = express.Router();

// Middleware
router.use(cors());

// Importing controllers
const Product = require('./controllers/product');
const User = require('./controllers/user');
const Cart = require('./controllers/cart')

// User routes
router.get('/users', User.readAll);
router.get('/user/:id', authenticateToken, User.authRead);
router.post('/register', User.create);
router.post('/login', User.login);

// Product routes
router.get('/product', Product.read); // Public route to read all products


// Cart routes
router.get('/cart', Cart.read);

// Root route
router.get('/', (req, res) => {
    return res.json({ message: "API FLOW(E-COMMERCE) is responding" });
});

// Fallback for unsupported routes
router.all('*', (req, res) => {
    res.status(404).json({ error: "Route not found" });
});

module.exports = router;
