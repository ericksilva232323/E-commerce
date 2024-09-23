const mysql = require('mysql2');

// Crie a conexão
const connection = mysql.createConnection({
  host: '127.0.0.1', // ou 'localhost'
  user: 'ecommerce',
  password: '', // Senha vazia
  database: 'ecommerce'
});

// Teste a conexão
connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados!');

  // Finalize a conexão
  connection.end();
});
