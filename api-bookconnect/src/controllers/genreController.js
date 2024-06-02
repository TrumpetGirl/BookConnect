import { findAllGenres, findGenreById, addGenre, editGenre, deleteGenre, numGenres } from '../models/repository/genreRepository.js'

// ------ CRUD ------
// OBTENER TODOS LOS GÉNEROS
export const getGenres = async (req, res) => {
  try {
    const genres = await findAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener el listado de géneros." });
  }
};

// OBTENER GÉNERO POR ID
export const getGenreById = async (req, res) => {
  try {
    const id  = parseInt(req.params.id)
    const genre = await findGenreById(id)
    res.status(200).json(genre)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Error al obtener el género con ID ${req.params.id}.` });
  }
};

// CREAR GÉNERO
export const createGenre = async (req, res) => {
  const { name } = req.body;
  try {
    const newGenre = await addGenre(name);
    res.status(201).json(newGenre);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al crear el género." });
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
    console.error(error)
    res.status(500).json({ message: "Error al editar el género." });
  }
};

// ELIMINAR GÉNERO
export const removeGenre = async (req, res) => {
  const id  = parseInt(req.params.id)
  try {
    const deletedGenre = await deleteGenre(id);
    res.status(200).json({ message: `Género con ID ${id} eliminado correctamente`, deletedGenre });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al eliminar el género." });
  }
};
// ------ END CRUD ------

// OBTENER NÚMERO TOTAL DE GÉNEROS
export const getNumGenres = async (req, res) => {
  try {
    const totalGenres = await numGenres();
    res.status(200).json({ totalGenres });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener el número de géneros." });
  }
};



