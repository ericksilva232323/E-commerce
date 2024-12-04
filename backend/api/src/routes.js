const express = require('express');
const authenticateToken = require('./jwt'); 
const router = express.Router();

// Importing controllers
const Product = require('./controllers/product');
const User = require('./controllers/user');

// User routes
router.get('/user', authenticateToken, User.read); 
router.get('/user/:id', authenticateToken, User.read); 
router.post('/register', User.create); 
router.post('/login', User.login); 

// Product routes
router.get('/product', Product.read); // Public route to read all products

// Root route
router.get('/', (req, res) => {
    return res.json({ message: "API FLOW(E-COMMERCE) is responding" });
});

// Fallback for unsupported routes
router.all('*', (req, res) => {
    res.status(404).json({ error: "Route not found" });
});

module.exports = router;
