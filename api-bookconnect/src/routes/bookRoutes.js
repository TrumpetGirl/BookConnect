// Importamos Express.js y el controlador para utilizar sus métodos
import express from 'express';
import  { getBooksbyAuthor, getBooksByTitle, createBook } from '../controllers/BookController.js'

// Creamos el enrutador de Express
const router = express.Router();

// Configuramos la ruta GET /users/:id para manejarla con el controlador 
router.get('/book/:title', getBooksByTitle);

router.get('/book/:authorId', getBooksbyAuthor);

// Configuramos la ruta POST /authors para añadir un nuevo libro
router.post('/book', createBook);
// Exportar el enrutador
export default router;
