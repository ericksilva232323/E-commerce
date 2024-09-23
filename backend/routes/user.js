const express = require('express');
const router = express.Router();
const db = require('../db');

// Rota para cadastro de usuários
router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';

  db.query(query, [username, password, email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, username });
  });
});

// Rota para listar usuários (opcional)
router.get('/', (req, res) => {
  const query = 'SELECT * FROM users';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;
