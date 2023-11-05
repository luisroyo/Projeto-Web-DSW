const express = require('express');
const router = express.Router();

// Rota para a página inicial
router.get('/', (req, res) => {
  res.render('index'); // Renderiza a página index.ejs
});

module.exports = router;
