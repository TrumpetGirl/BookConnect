// Importamos el repositorio para utilizar sus métodos
import { findAllAuthors, addAuthor } from '../models/repository/authorRepository.js';

// Función asíncrona que maneja la solicitud (req)--> Id del autor, 
// y la respuesta (res)--> libros del autor en concreto
export const getAuthors = async (req, res) => {
  try {
    const authors = await findAllAuthors();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función asíncrona para añadir un nuevo autor
export const createAuthor = async (req, res) => {
  const { name, birth_date, nationality } = req.body;
  try {
    const newAuthor = await addAuthor(name, birth_date, nationality);
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
