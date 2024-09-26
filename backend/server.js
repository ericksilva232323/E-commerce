const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const authRoutes = require('./routes/auth'); // O arquivo que criamos anteriormente

const app = express();
const port = 3000;

// Configurar middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('home')); // Serve arquivos estáticos da pasta frontend

// Configurar a conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'ecommerce',
    password: '', // sem senha
    database: 'ecommerce'
});

// Conectar ao banco de dados
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

// Usar rotas de autenticação
app.use('/backend/auth', authRoutes(db));

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
