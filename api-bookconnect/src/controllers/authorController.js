// Importamos el repositorio para utilizar sus métodos
import { findAllAuthors, addAuthor, findAuthorByName } from '../models/repository/authorRepository.js';

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

// OBTENER AUTORES POR NOMBRE
export const getAuthorByName = async (req, res) => {
  try {
    const { name } = req.body;
    const author = await findAuthorByName(name);
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
