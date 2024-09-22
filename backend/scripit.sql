-- Criação do banco de dados
CREATE DATABASE ecommerce;

DROP USER IF EXISTS 'ecommerce'@'localhost';
CREATE USER 'ecommerce'@'localhost' IDENTIFIED BY 'sua_senha';
GRANT ALL PRIVILEGES ON ecommerce.* TO 'ecommerce'@'localhost';
FLUSH PRIVILEGES;


-- Usar o banco de dados
USE ecommerce;

-- Criação da tabela de usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER USER 'ecommerce'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sua_senha';
FLUSH PRIVILEGES;


SELECT user, host FROM mysql.user;
SHOW GRANTS FOR 'ecommerce'@'localhost';



