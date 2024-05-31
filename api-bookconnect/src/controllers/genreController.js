import { findAllGenres, findGenreById, addGenre, editGenre, deleteGenre } from '../models/repository/genreRepository.js'

// ------ CRUD ------
// OBTENER TODOS LOS GÉNEROS
export const getGenres = async (req, res) => {
    try {
      const genres = await findAllGenres();
      res.status(200).json(genres);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// OBTENER GÉNERO POR ID
export const getGenreById = async (req, res) => {
  try {
    const id  = parseInt(req.params.id)
    const genre = await findGenreById(id)
    if (genre)
      res.status(200).json(genre)
    else 
      res.status(404).json({ message: `Género con id ${req.params.id} no encontrado` })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREAR GÉNERO
export const createGenre = async (req, res) => {
  const { name } = req.body;
  try {
    const newGenre = await addGenre(name);
    res.status(201).json(newGenre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EDITAR UN GÉNERO
export const updateGenre = async (req, res) => {
  const id  = parseInt(req.params.id)
  const { name } = req.body;
  try {
    const editedGenre = await editGenre(id, name);
    res.status(200).json(editedGenre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ELIMINAR GÉNERO
export const removeGenre = async (req, res) => {
  const id  = parseInt(req.params.id)
  try {
    const deletedGenre = await deleteGenre(id);
    res.status(200).json({ message: `Género con ID ${id} eliminado correctamente`, deletedGenre });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ------ END CRUD ------




