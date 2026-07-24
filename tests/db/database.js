const mysql = require('mysql2/promise');

async function connectDB() {
  const connection = await mysql.createConnection({
    host: 'taltektc.com',
    port: 3306,
    user: 'isnyhwte_qa_taltek',
    password: 'A3&s1UDtUDc',
    database: 'isnyhwte_qa_taltek'
  });

  return connection;
}

module.exports = { connectDB };