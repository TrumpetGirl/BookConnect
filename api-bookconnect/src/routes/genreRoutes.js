import express from 'express';
import { getGenres } from '../controllers/genreController.js';

const router = express.Router();

router.get('/genre', getGenres);

export default router;