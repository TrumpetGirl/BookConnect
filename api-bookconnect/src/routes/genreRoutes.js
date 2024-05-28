import express from 'express';
import { getGenres, getGenreNames } from '../controllers/genreController.js';

const router = express.Router();

router.get('/genre', getGenres);
router.get('/genre/names', getGenreNames);

export default router;