const express = require("express");
const router = express.Router();
const Mesa = require("../controller/Mesa");

// Rota para obter todas as mesas disponíveis
router.get("/", Mesa.getAvailableTables);
router.get('/diponivel')

module.exports = router;
