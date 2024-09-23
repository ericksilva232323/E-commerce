const express = require('express');
const router = express.Router();
const db = require('../db');

// Rota para listar produtos
router.get('/', (req, res) => {
  const query = 'SELECT * FROM products';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;
