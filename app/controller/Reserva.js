const dbConnection = require("../../config/dbConnection");
const Joi = require("joi");
const Reserva = require("../models/Reserva");

// Esquema de validação para as reservas
const reservationSchema = Joi.object({
  userId: Joi.number().required(),
  mesaId: Joi.number().required(),
  reservaDate: Joi.date().required(),
  reservaTime: Joi.string()
    .pattern(new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"))
    .required(),
  number_of_guests: Joi.number().integer().min(1).required(),
  status: Joi.string().valid("pendente", "confirmada", "cancelada").required(),
});

class ReservaController {
  // Middleware para validar uma reserva
  static validateReservation = (req, res, next) => {
    const { error } = reservationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

  static createReservation = (req, res) => {
    const {
      userId,
      mesaId,
      reservaDate,
      reservaTime,
      number_of_guests,
      status,
    } = req.body;
  
    // Verifique se o ID do usuário existe
    const checkUserQuery = "SELECT id FROM users WHERE id = ?";
    dbConnection.query(checkUserQuery, [userId], ( userResults) => {
    
      if (userResults.length === 0) {
        // O ID do usuário não foi encontrado
        return res.status(400).json({ error: "ID de usuário não existe" });
      }
  
      // Verifique a disponibilidade da mesa na data e hora especificadas
      const checkAvailabilityQuery = `SELECT * FROM reservas WHERE mesa_id = ? AND reservaDate = ? AND reservaTime = ?`;
      const checkAvailabilityValues = [mesaId, reservaDate, reservaTime];
  
      dbConnection.query(checkAvailabilityQuery, checkAvailabilityValues, (availabilityError, availabilityResults) => {
        if (availabilityError) {
          console.error("Erro ao verificar a disponibilidade da mesa: " + availabilityError.message);
          return res.status(500).json({ error: "Erro ao verificar a disponibilidade da mesa" });
        }
  
        if (availabilityResults.length > 0) {
          // A mesa já está ocupada na data e hora especificadas
          return res.status(400).json({ error: "Mesa já está ocupada nesse horário" });
        }
  
        // Se o usuário existe e a mesa está disponível, crie a reserva
        const reservation = new Reserva(
          null,
          userId,
          mesaId,
          reservaDate,
          reservaTime,
          number_of_guests,
          status
        );
  
        const insertQuery = `INSERT INTO reservas (user_id, mesa_id, reservaDate, reservaTime, number_of_guests, status) 
        VALUES (?, ?, ?, ?, ?, ?)`;
  
        const values = [
          reservation.userId,
          reservation.mesaId,
          reservation.reservaDate,
          reservation.reservaTime,
          reservation.number_of_guests,
          reservation.status,
        ];
  
        // Executa a consulta SQL para inserir uma nova reserva
        dbConnection.query(insertQuery, values, (error, results) => {
          if (error) {
            console.error("Erro ao criar reserva: " + error.message);
            return res.status(500).json({ error: "Erro ao criar a reserva" });
          }
  
          return res.status(201).json({ message: "Reserva criada com sucesso" });
        });
      });
    });
  };
  
  

  // Função para obter todas as reservas
  static getReservations = (req, res) => {
    const selectAllQuery = `
      SELECT reservas.*, usuarios.name AS userName
      FROM reservas
      JOIN usuarios ON reservas.user_id = usuarios.id
    `;

    // Executa a consulta SQL para obter todas as reservas
    dbConnection.query(selectAllQuery, (error, results) => {
      if (error) {
        console.error("Erro ao obter todas as reservas: " + error.message);
        return res
          .status(500)
          .json({ error: "Erro ao obter todas as reservas" });
      }

      return res.status(200).json(results);
    });
  };

  // Função para obter uma reserva por ID
  static getReservationById = (req, res) => {
    const reservationId = req.params.id;
    const selectByIdQuery = "SELECT * FROM reservas WHERE id = ?";

    // Executa a consulta SQL para obter uma reserva por ID
    dbConnection.query(selectByIdQuery, [reservationId], (error, results) => {
      if (error) {
        console.error("Erro ao obter reserva por ID: " + error.message);
        return res.status(500).json({ error: "Erro ao obter reserva por ID" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Reserva não encontrada" });
      }

      return res.status(200).json(results[0]);
    });
  };

  // Função para atualizar uma reserva existente
  static updateReservation = (req, res) => {
    const reservationId = req.params.id;
    const {
      userId,
      mesaId,
      reservaDate,
      reservaTime,
      number_of_guests,
      status,
    } = req.body;
    const updateQuery = `UPDATE reservas SET user_id=?, mesa_id=?, reservaDate=?, reservaTime=?, 
    number_of_guests=?, status=? WHERE id=?`;

    // Executa a consulta SQL para atualizar uma reserva
    dbConnection.query(
      updateQuery,
      [
        userId,
        mesaId,
        reservaDate,
        reservaTime,
        number_of_guests,
        status,
        reservationId,
      ],
      (error, results) => {
        if (error) {
          console.error("Erro ao atualizar reserva: " + error.message);
          return res.status(500).json({ error: "Erro ao atualizar reserva" });
        }

        return res
          .status(200)
          .json({ message: "Reserva atualizada com sucesso" });
      }
    );
  };

  static deleteReservation = (req, res) => {
    const reservationId = req.params.id;
    const deleteQuery = "DELETE FROM reservas WHERE id=?";

    // Executa a consulta SQL para excluir uma reserva
    dbConnection.query(deleteQuery, [reservationId], (error, results) => {
      if (error) {
        console.error("Erro ao excluir reserva: " + error.message);
        return res.status(500).json({ error: "Erro ao excluir reserva" });
      }

      if (results.affectedRows === 0) {
        // Nenhum registro foi afetado, o ID da reserva não foi encontrado
        return res.status(404).json({ error: "Reserva não encontrada" });
      }

      return res.status(200).json({ message: "Reserva excluída com sucesso" });
    });
  };
}

module.exports = ReservaController;
