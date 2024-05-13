// Importamos Express.js y el controlador para utilizar sus métodos
import express from 'express';
import  { getBooksbyAuthor, getBooksByTitle } from '../controllers/bookController.js'

// Creamos el enrutador de Express
const router = express.Router();

// Configuramos la ruta GET /users/:id para manejarla con el controlador 
router.get('/books/search/:title', getBooksByTitle);
router.get('/book/:authorId', getBooksbyAuthor);

// Exportar el enrutador
export default router;
