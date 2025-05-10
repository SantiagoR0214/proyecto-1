// Importa el módulo express para crear el enrutador
const express = require('express');

// Crea un enrutador utilizando express.Router
const router = express.Router();

// Importa el controlador para manejar las operaciones relacionadas con las reservas de libros
const controller = require('../controladores/reservation.controller');

// Importa el middleware de autenticación para validar el token del usuario
const auth = require('../middleware/auth.middleware');

// Ruta POST para realizar una reserva de libro (requiere autenticación)
// Cuando se recibe una solicitud POST en '/', se ejecuta la función 'reserveBook' del controlador
// El middleware 'auth' se asegura de que el usuario esté autenticado
router.post('/', auth, controller.reserveBook);

// Ruta GET para obtener las reservas de un usuario específico (requiere autenticación)
// Cuando se recibe una solicitud GET en '/user', se ejecuta la función 'userReservations' del controlador
// El middleware 'auth' valida que el usuario esté autenticado
router.get('/user', auth, controller.userReservations);

// Ruta GET para obtener las reservas de un libro específico (requiere autenticación)
// Cuando se recibe una solicitud GET en '/book/:bookId', se ejecuta la función 'bookReservations' del controlador
// El middleware 'auth' valida que el usuario esté autenticado
router.get('/book/:bookId', auth, controller.bookReservations);

// Exporta el enrutador para usarlo en la aplicación principal
module.exports = router;
