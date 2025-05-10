// Importa el módulo express para crear el enrutador
const express = require('express');

// Crea un enrutador utilizando express.Router
const router = express.Router();

// Importa el controlador para manejar las operaciones relacionadas con los libros
const controller = require('../controladores/libro.controller');

// Importa el middleware de autenticación (para validar el token del usuario)
const auth = require('../middleware/auth.middleware');

// Importa el middleware de permisos (para verificar el rol del usuario)
const permit = require('../middleware/permisos.middleware');

// Ruta POST para crear un nuevo libro (requiere autenticación y permisos de 'admin')
// Cuando se recibe una solicitud POST en '/', se verifica que el usuario esté autenticado y sea 'admin' antes de ejecutar la función 'createBook' del controlador
router.post('/', auth, permit('admin'), controller.createBook);

// Ruta GET para obtener todos los libros (sin necesidad de autenticación)
// Cuando se recibe una solicitud GET en '/', se ejecuta la función 'getBooks' del controlador
router.get('/', controller.getBooks);

// Ruta GET para obtener un libro por su ID (sin necesidad de autenticación)
// Cuando se recibe una solicitud GET en '/:id', se ejecuta la función 'getBookById' del controlador
router.get('/:id', controller.getBookById);

// Ruta PUT para actualizar un libro existente (requiere autenticación y permisos de 'admin')
// Cuando se recibe una solicitud PUT en '/:id', se verifica que el usuario esté autenticado y sea 'admin' antes de ejecutar la función 'updateBook' del controlador
router.put('/:id', auth, permit('admin'), controller.updateBook);

// Ruta DELETE para eliminar un libro (requiere autenticación y permisos de 'admin')
// Cuando se recibe una solicitud DELETE en '/:id', se verifica que el usuario esté autenticado y sea 'admin' antes de ejecutar la función 'deleteBook' del controlador
router.delete('/:id', auth, permit('admin'), controller.deleteBook);

// Exporta el enrutador para usarlo en la aplicación principal
module.exports = router;
