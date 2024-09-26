const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'ecommerce',
    password: '', // deixe vazio se não houver senha
    database: 'ecommerce',
});

// Conexão com o banco de dados
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

// Rotas de autenticação
app.use('/auth', authRoutes(db));

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
