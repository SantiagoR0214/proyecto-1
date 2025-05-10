// Importa mongoose para definir esquemas y modelos
const mongoose = require('mongoose');

// Define el esquema para las reservas de libros
const ReservationSchema = new mongoose.Schema({
  // Referencia al usuario que hace la reserva (relación con el modelo User)
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },

  // Referencia al libro reservado (relación con el modelo Book)
  book: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Book' 
  },

  // Fecha en que se hizo la reserva (por defecto, la fecha actual)
  reservedAt: { 
    type: Date, 
    default: Date.now 
  },

  // Fecha en que se entregó el libro (puede estar vacía si aún no se entrega)
  deliveredAt: Date
});

// Exporta el modelo Reservation, que usará la colección "reservations"
module.exports = mongoose.model('Reservation', ReservationSchema);
