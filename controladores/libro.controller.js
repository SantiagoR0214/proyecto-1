// Importa el modelo de libro desde la carpeta de modelos
const Book = require('../models/Book');

// Crea un nuevo libro
exports.createBook = async (req, res) => {
  try {
    // Crea una nueva instancia del modelo Book con los datos recibidos en el cuerpo de la solicitud
    const book = new Book(req.body);

    // Guarda el libro en la base de datos
    await book.save();

    // Devuelve el libro creado y un estado HTTP 201 (creado)
    res.status(201).json(book);
  } catch (err) {
    // Si ocurre un error, devuelve un estado 400 (mala solicitud) y el mensaje del error
    res.status(400).json({ error: err.message });
  }
};

// Obtiene una lista de libros con filtros opcionales
exports.getBooks = async (req, res) => {
  try {
    const filters = { enabled: true, ...req.query };

    // Busca los libros en la base de datos que cumplan con los filtros
    const books = await Book.find(filters);

    // Devuelve la lista de libros encontrados
    res.json(books);
  } catch (err) {
    // Si ocurre un error en el servidor, devuelve un estado 500
    res.status(500).json({ error: err.message });
  }
};

// Obtiene un libro específico por su ID (solo si está habilitado)
exports.getBookById = async (req, res) => {
  try {
    // Busca un libro por su ID y que esté habilitado (enabled: true)
    const book = await Book.findOne({ _id: req.params.id, enabled: true });

    // Si no encuentra el libro, responde con estado 404 (no encontrado)
    if (!book) return res.status(404).json({ error: 'Libro no encontrado' });

    // Devuelve el libro encontrado
    res.json(book);
  } catch (err) {
    // Si hay un error del servidor, responde con estado 500
    res.status(500).json({ error: err.message });
  }
};

// Actualiza un libro por su ID
exports.updateBook = async (req, res) => {
  try {
    // Encuentra el libro por ID y actualiza sus campos con los datos recibidos
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Devuelve el libro actualizado
    res.json(book);
  } catch (err) {
    // Si hay un error en la solicitud, responde con estado 400
    res.status(400).json({ error: err.message });
  }
};

// Inhabilita lógicamente un libro (no lo elimina de la base de datos)
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, { enabled: false }, { new: true });

    // Devuelve un mensaje de éxito
    res.json({ message: 'Libro inhabilitado' });
  } catch (err) {
    // Si hay un error, responde con estado 400
    res.status(400).json({ error: err.message });
  }
};
