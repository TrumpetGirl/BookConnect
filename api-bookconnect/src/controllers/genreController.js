import { findAllGenres } from '../models/repository/genreRepository.js'

export const getGenres = async (req, res) => {
    try {
      const genres = await findAllGenres();
      res.json(genres);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };