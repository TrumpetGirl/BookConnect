import express from 'express';
import { getGenres } from '../controllers/genreController.js';
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/genre', verifyToken, getGenres);


export default router;