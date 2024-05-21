// Importamos Express.js y el controlador para utilizar sus métodos
import express from 'express';
import  { createUser, getRoleUsers, loginUser } from '../controllers/userController.js';
// import { verifyToken } from '../middleware/authMiddleware.js';

// Creamos el enrutador de Express
const router = express.Router();

// Configuramos la ruta GET /users/:id para manejarla con el controlador 
router.get('/user/:roleId', getRoleUsers);

router.post('/register', createUser);

router.post('/login', loginUser);

// Exportar el enrutador
export default router;