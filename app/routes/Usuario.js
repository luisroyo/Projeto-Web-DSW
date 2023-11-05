const express = require("express");
const router = express.Router();
const UserController = require("../controller/Usuario"); // Importe o controlador corretamente

// Rota para criar um novo usuário com validação de dados
router.post("/", UserController.validateUser, UserController.createUser);

// Rota para obter todos os usuários
router.get("/", UserController.getUsers);

// Rota para obter um usuário por ID
router.get("/:id", UserController.getUsersById);

// Rota para autenticar o login do usuário
router.post('/login', UserController.loginUser);

router.get('/search/:searchString', UserController.getUsersByString);


module.exports = router;
