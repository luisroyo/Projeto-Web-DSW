const express = require('express');
const router = express.Router();
const UserController = require('../controller/Reserva');
const ReservaController = require('../controller/Reserva');

// Rota para criar uma nova reserva
router.post('/',ReservaController.createReservation);

// Rota para obter todas as reservas
router.get('/', ReservaController.getReservations);

// Rota para obter uma reserva por ID
router.get('/:id', ReservaController.getReservationById);

// Rota para atualizar uma reserva existente
router.patch('/:id', ReservaController.updateReservation);

// Rota para excluir uma reserva
router.delete('/:id', ReservaController.deleteReservation);

module.exports = router;
