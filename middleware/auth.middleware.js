// Importa el módulo jsonwebtoken para verificar el token JWT
const jwt = require('jsonwebtoken');

// Middleware para autenticar las solicitudes mediante JWT
module.exports = (req, res, next) => {
  const auth = req.headers.authorization;

  // Si no existe el encabezado o no empieza con 'Bearer ', devuelve error 403 (prohibido)
  if (!auth || !auth.startsWith('Bearer ')) 
    return res.status(403).json({ error: 'Token requerido' });

  try {
    // Extrae el token eliminando el prefijo 'Bearer '
    const token = auth.split(' ')[1];

    // Verifica el token con la clave secreta y agrega los datos decodificados al objeto `req.user`
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    // Continúa con el siguiente middleware o controlador
    next();
  } catch (err) {
    // Si el token no es válido, devuelve error 401 (no autorizado)
    res.status(401).json({ error: 'Token inválido' });
  }
};
