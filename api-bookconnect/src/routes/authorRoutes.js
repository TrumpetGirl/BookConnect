// Importamos Express.js y el controlador para utilizar sus métodos
import express from 'express';
import { getAuthors, createAuthor, getAuthorsByName } from '../controllers/authorController.js';

// Creamos el enrutador de Express
const router = express.Router();

router.get('/author', getAuthors);

// router.get('/author/:id', getAuthorbyId);

router.post('/author', createAuthor);

// router.put('/author/:id', editAuthor);

// router.delete('/author/:id', deleteAuthor);

router.post('/author/:name', getAuthorsByName);

// Exportamos el enrutador
export default router;
