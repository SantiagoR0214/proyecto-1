// Importa el módulo mongoose, que permite interactuar con MongoDB usando un modelo orientado a objetos
const mongoose = require('mongoose');

// Exporta una función que realiza la conexión a la base de datos
module.exports = () => {
  // Intenta conectarse a MongoDB usando la URI definida en las variables de entorno
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,     
    useUnifiedTopology: true    
  })
  // Si la conexión es exitosa, muestra un mensaje por consola
  .then(() => console.log('Conectado a la base de datos'))
  // Si ocurre un error al conectar, muestra el error en consola
  .catch((err) => console.error('Error de conexión con la base de datos:', err));
};
