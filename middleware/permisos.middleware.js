// Exporta una función que recibe un rol requerido como parámetro
module.exports = (requiredRole) => {
  // Devuelve un middleware que se ejecutará en las rutas protegidas
  return (req, res, next) => {
    // Verifica si el rol del usuario autenticado coincide con el rol requerido
    if (req.user.role !== requiredRole) {
      // Si no coincide, responde con estado 403 (prohibido)
      return res.status(403).json({ error: 'Permiso denegado' });
    }

    // Si el rol es correcto, permite continuar con la siguiente función
    next();
  };
};
