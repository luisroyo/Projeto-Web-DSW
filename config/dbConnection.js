const mysql = require("mysql");
require("dotenv").config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const dbConnection = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
});

dbConnection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados: " + err.message);
    return;
  }
  console.log("Conectado ao banco de dados MySQL");
});

module.exports = dbConnection;
