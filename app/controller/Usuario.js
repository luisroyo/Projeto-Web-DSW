const dbConnection = require("../../config/dbConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../models/Usuario");

// Esquema de validação para os usuários
const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  senha: Joi.string().min(6).required(),
  name: Joi.string().min(2).max(50).required(),
  phone: Joi.string().pattern(new RegExp("^[0-9 ()-]+$")).required(),
  email: Joi.string().email().required(),
});

class UserController {
  // Middleware para validar um usuário
  static validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

  // Função para criar um novo usuário
  static createUser = (req, res) => {
    const { username, senha, name, phone, email } = req.body;
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Erro ao criar hash da senha: " + err.message);
        return res.status(500).json({ error: "Erro ao criar usuário" });
      }

      const user = new User(username, hashedPassword, name, phone, email);

      const insertQuery =
        "INSERT INTO usuarios (username, senha, name, phone, email) VALUES (?, ?, ?, ?, ?)";
      const values = [
        user.username,
        user.senha,
        user.name,
        user.phone,
        user.email,
      ];

      // Executa a consulta SQL para inserir um novo usuário
      dbConnection.query(insertQuery, values, (error, results) => {
        if (error) {
          console.error("Erro ao cadastrar usuário: " + error.message);
          return res.status(500).json({ error: "Erro ao cadastrar usuário" });
        }

        return res
          .status(201)
          .json({ message: "Usuário cadastrado com sucesso" });
      });
    });
  };

  // Função para obter todos os usuários
  static getUsers = (req, res) => {
    const selectAllQuery = "SELECT * FROM usuarios";

    // Executa a consulta SQL para obter todos os usuários
    dbConnection.query(selectAllQuery, (error, results) => {
      if (error) {
        console.error("Erro ao obter todos os usuários: " + error.message);
        return res
          .status(500)
          .json({ error: "Erro ao obter todos os usuários" });
      }

      return res.status(200).json(results);
    });
  };

  // Função para obter usuários por nome de usuário
  static getUsersByString = (req, res) => {
    const searchString = req.params.searchString;

    if (searchString.length < 2) {
      return res
        .status(400)
        .json({
          error: "A string de pesquisa deve ter pelo menos duas letras.",
        });
    }

    const selectAllQuery = "SELECT * FROM usuarios WHERE username LIKE ?";

    // Executa a consulta SQL para obter usuários com base na string de pesquisa
    dbConnection.query(
      selectAllQuery,
      [`%${searchString}%`],
      (error, results) => {
        if (error) {
          console.error("Erro ao obter os usuários: " + error.message);
          return res.status(500).json({ error: "Erro ao obter os usuários" });
        }

        return res.status(200).json(results);
      }
    );
  };

  // Função para obter um usuário por ID
  static getUsersById = (req, res) => {
    const userId = req.params.id;
    const selectByIdQuery = "SELECT * FROM usuarios WHERE id = ?";

    // Executa a consulta SQL para obter um usuário por ID
    dbConnection.query(selectByIdQuery, [userId], (error, results) => {
      if (error) {
        console.error("Erro ao obter usuário por ID: " + error.message);
        return res.status(500).json({ error: "Erro ao obter usuário por ID" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json(results[0]);
    });
  };

  // Função para realizar a autenticação do usuário
  static loginUser = (req, res) => {
    const { username, senha } = req.body;

    const selectUserQuery = "SELECT * FROM usuarios WHERE username = ?";
    dbConnection.query(selectUserQuery, [username], (error, results) => {
      if (error) {
        console.error("Erro ao buscar usuário: " + error.message);
        return res.status(500).json({ error: "Erro ao realizar login" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const user = results[0];

      bcrypt.compare(senha, user.senha, (err, passwordMatch) => {
        if (err || !passwordMatch) {
          return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const token = jwt.sign(
          { username: user.username, id: user.id },
          "secreto",
          { expiresIn: "1h" }
        );

        return res.status(200).json({ token });
      });
    });
  };
}

module.exports = UserController;
