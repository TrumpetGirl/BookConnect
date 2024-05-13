// Importamos Express.js y el controlador para utilizar sus métodos
import express from 'express';
import  { getAuthorBooks } from '../controllers/bookController.js'

// Creamos el enrutador de Express
const router = express.Router();

// Configuramos la ruta GET /users/:id para manejarla con el controlador 
router.get('/book/:authorId', getAuthorBooks);

// Exportar el enrutador
export default router;
