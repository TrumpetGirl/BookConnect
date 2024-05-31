import { findAllBooks, findBookById, addBook, editBook, deleteBook, 
  findAllBooksSelector, numBooks, findBooksByTitle  } from '../models/repository/bookRepository.js'

// ------ CRUD ------
// OBTENER TODOS LOS LIBROS
export const getBooks = async (req, res) => {
  try {
    const books = await findAllBooks();
    if (books) 
      res.status(200).json(books)
    else 
      res.status(404).json({ message: 'Lista de libros no encontrada' })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OBTENER LIBRO POR ID
export const getBookById = async (req, res) => {
  try {
    const id  = parseInt(req.params.id)
    const book = await findBookById(id)
    if (book)
      res.status(200).json(book)
    else 
      res.status(404).json({ message: `Libro con id ${req.params.id} no encontrado` })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREAR LIBRO
export const createBook = async (req, res) => {
  const publicationYear  = parseInt(req.body.publicationYear)
  const { isbn, title, authorId, genreId, synopsis, imageExtension } = req.body;
  try {
    const newBook = await addBook(isbn, title, publicationYear, authorId, genreId, synopsis, imageExtension);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EDITAR UN LIBRO
export const updateBook = async (req, res) => {
  const id  = parseInt(req.params.id)
  const { isbn, title, publicationYear, author, genre, synopsis, imageExtension } = req.body;
  try {
    const editedBook = await editBook(id, isbn, title, publicationYear, author, genre, synopsis, imageExtension);
    res.status(200).json(editedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ELIMINAR LIBRO
export const removeBook = async (req, res) => {
  const id  = parseInt(req.params.id)
  try {
    const deletedBook = await deleteBook(id);
    res.status(200).json({ message: `Libro con ID ${id} eliminado correctamente`, deletedBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ------ END CRUD ------

// OBTENER EL NOMBRE DE LOS LIBROS
export const getBookNames = async (req, res) => {
  try {
      const bookNames = await findAllBooksSelector();
      res.status(200).json(bookNames);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener los nombres de los libros' });
  }
};

// OBTENER NÚMERO TOTAL DE LIBROS
export const getNumBooks = async (req, res) => {
  try {
    const totalBooks = await numBooks();
    res.json({ totalBooks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OBTENER LIBRO POR TÍTULO
export const getBooksByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const books = await findBooksByTitle(title);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

