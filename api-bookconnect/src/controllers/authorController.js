// Importamos el repositorio para utilizar sus métodos
import { findAllAuthors, findAllAuthorNames, countAuthors,  addAuthor, editAuthor, findAuthorsByName, deleteAuthor, findAuthorById, findAllBooksByAuthor  } from '../models/repository/authorRepository.js';

// OBTENER TODOS LOS AUTORES
export const getAuthors = async (req, res) => {
  try {
    const authors = await findAllAuthors();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OBTENER EL NOMBRE DE LOS AUTORES
export const getAuthorNames = async (req, res) => {
  try {
      const authorNames = await findAllAuthorNames();
      res.status(200).json(authorNames);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener los nombres de los autores' });
  }
};

// OBTENER NÚMERO TOTAL DE AUTORES
export const getAuthorCount = async (req, res) => {
  try {
    const totalAuthors = await countAuthors();
    res.json({ totalAuthors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OBTENER AUTORES POR NOMBRE
export const getAuthorsByName = async (req, res) => {
  try {
    const { name } = req.body;
    const author = await findAuthorsByName(name);
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OBTENER AUTOR POR ID
export const getAuthorById = async (req, res) => {
  try {
    const id  = parseInt(req.params.id);
    const author = await findAuthorById(id);
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// AÑADIR UN NUEVO AUTOR
export const createAuthor = async (req, res) => {
  const { name, birth_date, nationality, imageExtension } = req.body;
  try {
    const newAuthor = await addAuthor(name, birth_date, nationality, imageExtension);
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EDITAR UN AUTOR
export const updateAuthor = async (req, res) => {
  const { id } = req.params.id;
  const { name, birth_date, nationality, imageExtension } = req.body;
  try {
    const editedAuthor = await editAuthor(id, name, birth_date, nationality, imageExtension);
    res.status(200).json(editedAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ELIMINAR AUTOR
export const removeAuthor = async (req, res) => {
  const authorId = req.params.id; 
  try {
    const deletedAuthor = await deleteAuthor(authorId);
    res.json({ message: `Autor con ID ${authorId} eliminado correctamente`, deletedAuthor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OBTENER EL NOMBRE DE LOS LIBROS POR AUTOR
export const getBooksByAuthorId = async (req, res) => {
  const authorId = req.params.id; 
  try {
      const bookNames = await findAllBooksByAuthor(authorId);
      res.status(200).json(bookNames);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener los nombres de los libros por autor' });
  }
};



