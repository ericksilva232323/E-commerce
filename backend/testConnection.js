// Importando o pacote mysql2
const mysql = require('mysql2');

// Criando a conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ecommerce',   // Usuário do banco de dados
  password: '',        // Senha vazia conforme definido
  database: 'ecommerce' // Nome do banco de dados
});

// Conectando ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados!');
});

// Fechando a conexão após testar
connection.end();
