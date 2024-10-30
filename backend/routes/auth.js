const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (db) => {
    const router = require('express').Router();

    // Cadastro
    router.post('/register', (req, res) => {
        const { name, email, password } = req.body;
        
        // Hash da senha
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Inserção no banco
        db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
            [name, email, hashedPassword], (err, results) => {
            if (err) {
                return res.status(500).send({ message: 'Erro ao registrar usuário.' });
            }
            res.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
        });
    });

    // Login
    router.post('/login', (req, res) => {
        const { email, password } = req.body;

        db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                return res.status(500).send({ message: 'Erro ao fazer login.' });
            }

            if (results.length === 0) {
                return res.status(404).send({ message: 'Usuário não encontrado.' });
            }

            // Comparar senhas
            const user = results[0];
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({ accessToken: null, message: 'Senha inválida!' });
            }

            // Gerar token JWT
            const token = jwt.sign({ id: user.id }, 'segredo', { expiresIn: 86400 }); // 24 horas
            res.status(200).send({ id: user.id, email: user.email, accessToken: token });
        });
    });

    return router;
};
