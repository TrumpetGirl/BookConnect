// Importamos el repositorio para utilizar sus métodos
import { findAllAuthors, findAuthorById, findAllAuthorsSelector, numAuthors,  addAuthor, editAuthor, findAuthorsByName, deleteAuthor, findBooksByAuthor  } from '../models/repository/authorRepository.js';

// ------CRUD------
// OBTENER TODOS LOS AUTORES
export const getAuthors = async (req, res) => {
  try {
    const authors = await findAllAuthors()
    if (authors) 
      res.status(200).json(authors)
    else 
      res.status(404).json({ message: 'Lista de autores no encontrada' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

// OBTENER AUTOR POR ID
export const getAuthorById = async (req, res) => {
  try {
    const id  = parseInt(req.params.id)
    const author = await findAuthorById(id)
    if (author)
      res.status(200).json(author)
    else 
      res.status(404).json({ message: `Autor con id ${req.params.id} no encontrado` })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREAR AUTOR
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
  const id  = parseInt(req.params.id)
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
  const id  = parseInt(req.params.id)
  try {
    const deletedAuthor = await deleteAuthor(id);
    res.status(200).json({ message: `Autor con ID ${id} eliminado correctamente`, deletedAuthor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ------END CRUD------

// OBTENER EL NOMBRE DE LOS AUTORES
export const getAuthorNames = async (req, res) => {
  try {
      const authorNames = await findAllAuthorsSelector();
      res.status(200).json(authorNames);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener los nombres de los autores' });
  }
};

// OBTENER NÚMERO TOTAL DE AUTORES
export const getNumAuthors = async (req, res) => {
  try {
    const totalAuthors = await numAuthors();
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

// OBTENER EL NOMBRE DE LOS LIBROS POR AUTOR
export const getBooksByAuthor = async (req, res) => {
  const authorId = parseInt(req.params.id)
  try {
      const bookNames = await findBooksByAuthor(authorId);
      res.status(200).json(bookNames);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener los nombres de los libros por autor' });
  }
};



