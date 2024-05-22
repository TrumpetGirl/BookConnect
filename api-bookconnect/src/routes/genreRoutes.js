// Importamos Express.js y el controlador para utilizar sus métodos
import express from 'express';
import { getGenres } from '../controllers/genreController.js';

// Creamos el enrutador de Express
const router = express.Router();

// Configuramos la ruta GET /authors para obtener todos los géneros
router.get('/genre', getGenres);

// Exportamos el enrutador
export default router;