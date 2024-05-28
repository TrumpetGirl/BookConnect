import { findAllGenres, findAllGenresSelector } from '../models/repository/genreRepository.js'

// OBTENER TODOS LOS GÉNEROS
export const getGenres = async (req, res) => {
    try {
      const genres = await findAllGenres();
      res.json(genres);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// OBTENER EL NOMBRE DE LOS GÉNEROS
export const getGenresSelector = async (req, res) => {
  try {
      const genreNames = await findAllGenresSelector();
      res.status(200).json(genreNames);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener los nombres de los géneros' });
  }
};

