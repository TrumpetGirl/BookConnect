import { findAllBooks, findBooksByAuthor, findBooksByTitle, addBook } from '../models/repository/bookRepository.js'

// OBTENER TODOS LOS LIBROS
export const getBooks = async (req, res) => {
  try {
    const books = await findAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREAR LIBRO
export const createBook = async (req, res) => {
  const { isbn, title, publicationYear, author, genre, synopsis, imageExtension } = req.body;
  try {
    const newBook = await addBook(isbn, title, publicationYear, author, genre, synopsis, imageExtension);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OBTENER LIBRO POR NOMBRE
export const getBooksByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const books = await findBooksByTitle(title);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OBTENER LIBRO POR AUTOR
export const getBooksbyAuthor = ( async(req, res)=> {
  try {
    const { authorId } = req.params
    const books = await findBooksByAuthor(authorId);
    res.json(books)
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
})



 

