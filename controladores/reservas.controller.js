// Importa los modelos de Mongoose para las reservas y los libros
const Reservation = require('../models/Reservation');
const Book = require('../models/Book');

// Controlador para reservar un libro
exports.reserveBook = async (req, res) => {
  try {
    // Extrae el ID del libro desde el cuerpo de la solicitud
    const { bookId } = req.body;

    // Crea una nueva reserva asociando el usuario autenticado (req.user.id) con el libro
    const reservation = new Reservation({ user: req.user.id, book: bookId });

    // Guarda la reserva en la base de datos
    await reservation.save();

    // Devuelve la reserva creada con código HTTP 201 (creado)
    res.status(201).json(reservation);
  } catch (err) {
    // En caso de error, devuelve código 400 y el mensaje del error
    res.status(400).json({ error: err.message });
  }
};

// Controlador para obtener las reservas hechas por el usuario actual
exports.userReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id }).populate('book');

    // Devuelve las reservas encontradas
    res.json(reservations);
  } catch (err) {
    // Si ocurre un error, responde con código 500 y el mensaje del error
    res.status(500).json({ error: err.message });
  }
};

// Controlador para obtener las reservas asociadas a un libro específico
exports.bookReservations = async (req, res) => {
  try {
    // Busca todas las reservas que correspondan al ID del libro recibido por parámetro
    // y llena los datos del usuario que hizo la reserva
    const reservations = await Reservation.find({ book: req.params.bookId }).populate('user');

    // Devuelve la lista de reservas
    res.json(reservations);
  } catch (err) {
    // Si ocurre un error, responde con código 500 y el mensaje del error
    res.status(500).json({ error: err.message });
  }
};
