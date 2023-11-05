const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Configurar EJS como mecanismo de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

// Configurar o middleware para servir arquivos estáticos na pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Importar as rotas definidas em routes/index.js
const indexRouter = require('./routes/index');

// Usar as rotas importadas
app.use('/', indexRouter);

// ... Outros middlewares e rotas ...

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
