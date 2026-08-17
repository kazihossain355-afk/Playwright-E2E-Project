require('dotenv').config();
const mysql = require('mysql2/promise');

async function connectDB() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  return connection;
}

module.exports = { connectDB };
