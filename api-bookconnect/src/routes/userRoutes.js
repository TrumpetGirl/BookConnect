// Importamos Express.js y el controlador para utilizar sus métodos
import express from 'express';
import  { getRoleUsers } from '../controllers/userController.js';

// Creamos el enrutador de Express
const router = express.Router();

// Configuramos la ruta GET /users/:id para manejarla con el controlador 
router.get('/user/:roleId', getRoleUsers);

// Exportar el enrutador
export default router;