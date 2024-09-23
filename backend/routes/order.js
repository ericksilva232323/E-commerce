const express = require('express');
const router = express.Router();
const db = require('../db');

// Rota para criar um novo pedido
router.post('/', (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  const query = 'INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)';

  db.query(query, [user_id, product_id, quantity], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});

// Rota para listar pedidos (opcional)
router.get('/', (req, res) => {
  const query = 'SELECT * FROM orders';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;
