const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ecommerce',
    password: '', // deve estar vazio
    database: 'ecommerce'
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados!');
});
