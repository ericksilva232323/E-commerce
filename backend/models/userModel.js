const pool = require('../config');

const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const createUser = async (name, email, passwordHash) => {
  await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, passwordHash]);
};

module.exports = { findUserByEmail, createUser };
