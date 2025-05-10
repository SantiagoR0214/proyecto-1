// Importa el módulo express para crear la aplicación
const express = require('express');

// Importa dotenv para gestionar variables de entorno
const dotenv = require('dotenv');

// Importa cors para habilitar CORS (Cross-Origin Resource Sharing)
const cors = require('cors');

// Importa la función para conectar a la base de datos
const connectDB = require('./configuracion/database');

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Crea la aplicación express
const app = express();

// Conecta la base de datos usando el archivo de configuración
connectDB();

// Habilita CORS para permitir solicitudes desde dominios externos
app.use(cors());

// Habilita el uso de JSON en las solicitudes y respuestas
app.use(express.json());

// Define las rutas de autenticación (importa y usa las rutas de autenticación)
app.use('/api/auth', require('./rutas/auth.routes'));

// Inicia el servidor en el puerto especificado en las variables de entorno o en el puerto 3000 por defecto
app.listen(process.env.PORT || 3000, () => {
  // Muestra un mensaje en la consola cuando el servidor esté corriendo
  console.log(`Servidor corriendo en puerto ${process.env.PORT || 3000}`);
});
