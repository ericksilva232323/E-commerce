const express = require('express');

const router = express.Router();

// const Cart = require('./controllers/cart');
// const Like = require('./controllers/like');
// const Pay = require('./controllers/pay');
const Product = require('./controllers/product');
const User = require('./controllers/user');

router.get('/user', User.read);
router.get('/user/:id', User.read);

router.get('/product', Product.read);

router.get('/',(req, res) => { return res.json("API FLOW(E-COMMERCE) respondendo")});

module.exports = router; 
