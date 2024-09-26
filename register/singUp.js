router.post('/register', [
  body('username').notEmpty().withMessage('O nome de usuário é obrigatório'),
  body('password').isLength({ min: 4 }).withMessage('A senha deve ter pelo menos 4 caracteres'),
  body('email').isEmail().withMessage('O email deve ser válido'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';

  db.query(query, [username, hashedPassword, email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, username });
  });
});
