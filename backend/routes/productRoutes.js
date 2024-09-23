const express = require('express');
const { listProducts, addProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/', listProducts);
router.post('/', addProduct);

module.exports = router;
