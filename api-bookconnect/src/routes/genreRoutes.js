import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getGenres, getGenreById, createGenre, updateGenre, removeGenre } from '../controllers/genreController.js';

const router = express.Router();

// ------ CRUD ------
router.get('/genre', verifyToken, getGenres);
router.get('/genre/:id', verifyToken, getGenreById);
router.post('/genre', verifyToken, createGenre);
router.put('/genre/:id', verifyToken, updateGenre);
router.delete('/genre/:id', verifyToken, removeGenre);
// ------ END CRUD ------

export default router;