const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Configuração do mecanismo de visualização EJS
app.set('view engine', 'ejs');
app.set('view engine', 'ejs');

// Use express.json() em vez de body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com o banco de dados
const dbConnection = require('./config/dbConnection');

// Importe as rotas
const reservas = require('./app/routes/Reserva');
const mesas = require('./app/routes/Mesa');
const usuarios = require('./app/routes/Usuario');

// Use as rotas
app.use('/reservas', reservas);
app.use('/mesas', mesas);
app.use('/usuarios', usuarios);

// Rota para renderizar a página de login
app.get('/login', (req, res) => {
  res.render('login');
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
