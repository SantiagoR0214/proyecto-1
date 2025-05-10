// Importa el módulo express para crear el enrutador
const express = require('express');

// Crea un enrutador utilizando express.Router
const router = express.Router();

// Importa el controlador de autenticación con las funciones de registro y login
const authController = require('../controladores/auth.controller');

// Define la ruta para el registro de un nuevo usuario (POST /register)
// Al recibir una solicitud POST en '/register', se ejecuta la función 'register' del controlador
router.post('/register', authController.register);

// Define la ruta para el inicio de sesión (POST /login)
// Al recibir una solicitud POST en '/login', se ejecuta la función 'login' del controlador
router.post('/login', authController.login);

// Exporta el enrutador para usarlo en la aplicación principal
module.exports = router;
