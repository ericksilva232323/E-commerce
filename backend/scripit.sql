-- 1. Excluir tabelas com restrições de chave estrangeira
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS orders;   -- Caso você tenha uma tabela relacionada
DROP TABLE IF EXISTS users;    -- Eliminar a tabela 'users'
SET FOREIGN_KEY_CHECKS = 1;

-- 2. Recriar o banco de dados (caso necessário)
DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce;
USE ecommerce;

-- 3. Criar o usuário 'ecommerce' (sem senha)
DROP USER IF EXISTS 'ecommerce'@'localhost';
CREATE USER 'ecommerce'@'localhost' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON ecommerce.* TO 'ecommerce'@'localhost';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'ecommerce'@'localhost';


-- 4. Criar a tabela de usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Se você tiver outras tabelas, como a de produtos, adicione-as aqui
-- Exemplo:
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
