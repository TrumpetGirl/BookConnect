// Importamos el repositorio para utilizar sus métodos
import { findAllAuthors, addAuthor, editAuthor, findAuthorsByName, deleteAuthor, findAuthorById  } from '../models/repository/authorRepository.js';

// OBTENER TODOS LOS AUTORES
export const getAuthors = async (req, res) => {
  try {
    const authors = await findAllAuthors();
    res.json(authors);
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

// OBTENER AUTORES POR ID
export const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params.id;
    const author = await findAuthorById(id);
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

