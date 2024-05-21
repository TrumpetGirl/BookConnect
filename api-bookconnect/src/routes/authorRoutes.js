// Importamos Express.js y el controlador para utilizar sus métodos
import express from 'express';
import { getAuthors, createAuthor } from '../controllers/authorController.js';
import multer from 'multer';

// Creamos el enrutador de Express
const router = express.Router();

// Configuramos la ruta GET /authors para obtener todos los autores
router.get('/authors', getAuthors);

const upload = multer({dest: 'src/assets/images/authors/'})
// Configuramos la ruta POST /authors para añadir un nuevo autor
router.post('/addAuthors', createAuthor);

// Exportamos el enrutador
export default router;
