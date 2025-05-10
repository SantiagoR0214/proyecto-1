// Importa las librerías necesarias
const bcrypt = require('bcrypt'); // Para encriptar y comparar contraseñas
const jwt = require('jsonwebtoken'); // Para generar y verificar tokens JWT
const User = require('../models/usuario'); // Modelo de usuario de la base de datos

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const { name, email, password, role } = req.body;

    // Hashea la contraseña antes de guardarla en la base de datos
    const hashed = await bcrypt.hash(password, 10);

    // Crea una nueva instancia del usuario con los datos proporcionados
    const user = new User({ name, email, password: hashed, role });

    // Guarda el nuevo usuario en la base de datos
    await user.save();

    // Devuelve una respuesta de éxito
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (err) {
    // Devuelve un error si ocurre algún problema al registrar
    res.status(400).json({ error: 'Error al registrar usuario', details: err.message });
  }
};

// Función para iniciar sesión
exports.login = async (req, res) => {
  try {
    // Extrae las credenciales del cuerpo de la solicitud
    const { email, password } = req.body;

    // Busca un usuario habilitado con el correo electrónico proporcionado
    const user = await User.findOne({ email, enabled: true });

    // Si no se encuentra el usuario, devuelve un error
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Compara la contraseña ingresada con la contraseña almacenada (hasheada)
    const match = await bcrypt.compare(password, user.password);

    // Si no coinciden, devuelve un error de autenticación
    if (!match) return res.status(401).json({ error: 'Credenciales inválidas' });

    // Si las credenciales son válidas, genera un token JWT con duración de 2 horas
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Devuelve el token al cliente
    res.json({ token });
  } catch (err) {
    // Devuelve un error si ocurre algún problema durante el login
    res.status(500).json({ error: 'Error en login', details: err.message });
  }
};
