-- Criação do banco de dados
CREATE DATABASE ecommerce;

DROP USER IF EXISTS 'ecommerce'@'localhost';
CREATE USER 'ecommerce'@'localhost' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON ecommerce.* TO 'ecommerce'@'localhost';
FLUSH PRIVILEGES;


-- Usar o banco de dados
USE ecommerce;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de usuários
INSERT INTO users (name, email, password) VALUES
('João Silva', 'joao.silva@example.com', 'senha123'),
('Maria Oliveira', 'maria.oliveira@example.com', 'senha456'),
('Carlos Santos', 'carlos.santos@example.com', 'senha789');

-- Inserção de itens
INSERT INTO items (name, category, price) VALUES
('Tênis Esportivo', 'Tênis', 299.99),
('Tênis Casual', 'Tênis', 199.99),
('Relógio de Pulso', 'Acessórios', 149.99),
('Cinto de Couro', 'Acessórios', 79.99),
('Camisa Polo', 'Roupa', 89.99),
('Calça Jeans', 'Roupa', 129.99);


ALTER USER 'ecommerce'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
FLUSH PRIVILEGES;


SELECT user, host FROM mysql.user;
SHOW GRANTS FOR 'ecommerce'@'localhost';

SELECT * FROM items;
SELECT * FROM users;



