// Importamos Express.js y el controlador para utilizar sus métodos
import express from 'express';
import { getAuthors, createAuthor, getAuthorByName } from '../controllers/authorController.js';

// Creamos el enrutador de Express
const router = express.Router();

router.get('/author', getAuthors);

router.post('/author', createAuthor);

router.post('/author/:name', getAuthorByName)

// Exportamos el enrutador
export default router;
