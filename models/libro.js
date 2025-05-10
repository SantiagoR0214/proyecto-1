// Importa mongoose, que se usa para definir modelos y esquemas en MongoDB
const mongoose = require('mongoose');

// Define el esquema del libro (BookSchema) con sus campos y tipos de datos
const BookSchema = new mongoose.Schema({
  // Título del libro (cadena de texto)
  title: String,

  author: String,

  genre: String,

  editorial: String,

  publicationDate: Date,

  // Indica si el libro está disponible para reserva o préstamo
  available: { type: Boolean, default: true },

  // Indica si el libro está habilitado en el sistema (para soft delete)
  enabled: { type: Boolean, default: true }
}, { 
  // Agrega automáticamente campos `createdAt` y `updatedAt`
  timestamps: true 
});

// Exporta el modelo Book, que usará la colección "books" en la base de datos
module.exports = mongoose.model('Book', BookSchema);
