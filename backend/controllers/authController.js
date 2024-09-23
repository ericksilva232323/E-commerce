const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Função para cadastrar usuário
exports.register = (req, res) => {
    const { name, email, password } = req.body;

    // Verifica se o usuário já existe
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: 'Usuário já existe!' });
        } else {
            // Criptografa a senha
            const hashedPassword = bcrypt.hashSync(password, 8);
            const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

            db.query(insertQuery, [name, email, hashedPassword], (err, result) => {
                if (err) throw err;
                return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
            });
        }
    });
};

// Função para login
exports.login = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        const user = results[0];

        // Compara as senhas
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Senha inválida!' });
        }

        // Gera token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400 // expira em 24 horas
        });

        res.status(200).json({
            message: 'Login realizado com sucesso!',
            token
        });
    });
};
