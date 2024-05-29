import express from 'express';
import { getGenres, getGenresSelector } from '../controllers/genreController.js';

const router = express.Router();

router.get('/genre', getGenres);

router.get('/genre/names', getGenresSelector);

export default router;