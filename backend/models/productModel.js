const pool = require('../config');

const getAllProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows;
};

const createProduct = async (name, price, description) => {
  await pool.query('INSERT INTO products (name, price, description) VALUES (?, ?, ?)', [name, price, description]);
};

module.exports = { getAllProducts, createProduct };
