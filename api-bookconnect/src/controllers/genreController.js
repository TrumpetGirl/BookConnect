import { findAllGenres } from '../models/repository/genreRepository.js'

// OBTENER TODOS LOS GÉNEROS
export const getGenres = async (req, res) => {
    try {
      const genres = await findAllGenres();
      res.status(200).json(genres);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



