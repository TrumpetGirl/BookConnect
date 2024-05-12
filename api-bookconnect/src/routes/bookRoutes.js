// Importar Express.js y el controlador de usuario
import express from 'express';
import  { getAuthorBooks } from '../controllers/BookController.js'


// Crear un enrutador de Express
const router = express.Router();

// Configurar la ruta GET /users/:id para manejarla con el controlador UserController.getUserById
router.get('/book/:authorId', getAuthorBooks);

// Exportar el enrutador
export default router;
