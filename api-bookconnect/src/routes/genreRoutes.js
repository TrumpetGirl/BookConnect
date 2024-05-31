import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getGenres, getGenreById, createGenre, updateGenre, removeGenre } from '../controllers/genreController.js';

const router = express.Router();

// ------ CRUD ------
router.get('/genre', verifyToken, getGenres);
router.get('/genre/:id(\\d+)', verifyToken, getGenreById);
router.post('/genre', verifyToken, createGenre);
router.put('/genre/:id(\\d+)', verifyToken, updateGenre);
router.delete('/genre/:id(\\d+)', verifyToken, removeGenre);
// ------ END CRUD ------

export default router;