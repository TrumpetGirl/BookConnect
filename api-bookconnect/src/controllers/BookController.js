import { findAllBooks, findBookById, addBook, editBook, deleteBook, 
  findAllBooksSelector, numBooks, findBooksByTitle  } from '../models/repository/bookRepository.js'

// ------ CRUD ------
// OBTENER TODOS LOS LIBROS
export const getBooks = async (req, res) => {
  try {
    const books = await findAllBooks();
    res.status(200).json(books)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener el listado de libros." });
  }
};

// OBTENER LIBRO POR ID
export const getBookById = async (req, res) => {
  try {
    const id  = parseInt(req.params.id)
    const book = await findBookById(id)
    res.status(200).json(book)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Error al obtener el libro con ID ${req.params.id}.` });
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
    console.error(error)
    res.status(500).json({ message: "Error al crear el libro." });
  }
};

// EDITAR UN LIBRO
export const updateBook = async (req, res) => {
  const id  = parseInt(req.params.id)
  const publicationYear  = parseInt(req.body.publicationYear)
  const { isbn, title, authorId, genreId, synopsis, imageExtension, imageChange } = req.body;
  try {
    const editedBook = await editBook(id, isbn, title, publicationYear, authorId, genreId, synopsis, imageExtension, imageChange);
    res.status(200).json(editedBook);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al editar el libro." });
  }
};

// ELIMINAR LIBRO
export const removeBook = async (req, res) => {
  const id  = parseInt(req.params.id)
  try {
    const deletedBook = await deleteBook(id);
    res.status(200).json({ message: `Libro con ID ${id} eliminado correctamente`, deletedBook });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al eliminar el autor." });
  }
};
// ------ END CRUD ------

// OBTENER EL NOMBRE DE LOS LIBROS
export const getBookNames = async (req, res) => {
  try {
    const bookNames = await findAllBooksSelector();
    res.status(200).json(bookNames)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener los nombres de los libros' });
  }
};

// OBTENER NÚMERO TOTAL DE LIBROS
export const getNumBooks = async (req, res) => {
  try {
    const totalBooks = await numBooks();
    res.status(200).json({ totalBooks });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener el número de libros." });
  }
};

// OBTENER LIBROS POR TÍTULO
export const getBooksByTitle = async (req, res) => {
  const { search } = req.body;
  try {
    const books = await findBooksByTitle(search);
    res.status(200).json(books)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener libros por título' });
  }
};

