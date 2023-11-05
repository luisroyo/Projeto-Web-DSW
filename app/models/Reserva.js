class Reserva {
  constructor(id, userId, mesaId, reservaDate, reservaTime, number_of_guests, status) {
    this.id = id;
    this.userId = userId;
    this.mesaId = mesaId;
    this.reservaDate = reservaDate;
    this.reservaTime = reservaTime;
    this.number_of_guests = number_of_guests;
    this.status = status;
  }
}

module.exports = Reserva;
