-- Criar o banco de dados para o sistema de login
CREATE DATABASE IF NOT EXISTS login_system;

-- Usar o banco de dados
USE login_system;

-- Criar a tabela users com restrição de email único
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE, -- Email deve ser único
    password VARCHAR(255) NOT NULL, -- A senha deve ser armazenada com hash (bcrypt ou similar)
    role ENUM('CUSTOMER', 'ADMIN') DEFAULT 'CUSTOMER', -- Função do usuário
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserindo usuários (a senha deve ser um hash, não em texto simples)
INSERT INTO users (username, email, password, role) VALUES
('johndoe', 'john.doe@example.com', 'hashed_password_1', 'CUSTOMER'),
('janedoe', 'jane.doe@example.com', 'hashed_password_2', 'CUSTOMER'),
('admin', 'admin@example.com', 'hashed_password_3', 'ADMIN');

-- Exemplo de busca por email (para uso em autenticação de login)
SELECT * FROM users WHERE email = 'john.doe@example.com';
