const express = require('express');
const router = express.Router();
// const { Auth } = require('./controllers/middleware/middleware');

const Cart = require('./controllers/cart');
const Like = require('./controllers/like');
const Product = require('./controllers/product');
const User = require('./controllers/user');


router.get('/user', User.read);
router.get('/user/:id', User.read);
router.post('/register', User.create);

router.get('/product', Product.read);

router.get('/like', Like.read);

router.get('/cart', Cart.read);

router.get('/',(req, res) => { return res.json("API FLOW(E-COMMERCE) respondendo")});

module.exports = router; 
