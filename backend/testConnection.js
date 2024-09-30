// Importando o pacote mysql2
const mysql = require('mysql2');

<<<<<<< HEAD
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
=======
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
>>>>>>> 4d7a546d405be53ebd9d334baad1985219c4c831
});

// Fechando a conexão após testar
connection.end();
