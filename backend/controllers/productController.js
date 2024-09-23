const { getAllProducts, createProduct } = require('../models/productModel');

const listProducts = async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
};

const addProduct = async (req, res) => {
  const { name, price, description } = req.body;
  await createProduct(name, price, description);
  res.status(201).json({ message: 'Produto criado com sucesso' });
};

module.exports = { listProducts, addProduct };
