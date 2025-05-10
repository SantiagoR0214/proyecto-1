// Importa mongoose para definir esquemas y modelos
const mongoose = require('mongoose');

// Define el esquema para el modelo User
const UserSchema = new mongoose.Schema({
  // Nombre del usuario (campo de texto)
  name: String,

  // Correo electrónico del usuario (único y obligatorio)
  email: { 
    type: String,        // Tipo de dato: String
    unique: true,        // El correo debe ser único
    required: true       // El correo es obligatorio
  },

  // Contraseña del usuario (obligatoria)
  password: { 
    type: String,        // Tipo de dato: String
    required: true       // La contraseña es obligatoria
  },

  // Rol del usuario (por defecto 'user', pero puede ser 'admin', etc.)
  role: { 
    type: String,        // Tipo de dato: String
    default: 'user'      // Valor por defecto es 'user'
  },

  // Estado de la cuenta del usuario (si está habilitado o no)
  enabled: { 
    type: Boolean,       // Tipo de dato: Booleano
    default: true        // Por defecto la cuenta está habilitada
  }
}, { 
  // Agrega los campos 'createdAt' y 'updatedAt' automáticamente
  timestamps: true 
});

// Exporta el modelo User que usará la colección "users" en MongoDB
module.exports = mongoose.model('User', UserSchema);
