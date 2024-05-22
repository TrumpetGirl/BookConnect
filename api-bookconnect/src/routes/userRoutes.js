// Importamos Express.js y el controlador para utilizar sus métodos
import express from 'express';
import  { getUserById, getUserByIdAndUsername, createUser, getRoleUsers, loginUser } from '../controllers/userController.js';
// import { verifyToken } from '../middleware/authMiddleware.js';

// Creamos el enrutador de Express
const router = express.Router();

// Configuramos la ruta GET /users/:id para manejarla con el controlador 
router.get('/user/:roleId', getRoleUsers);

// router.get('/user', getUsers);

router.get('/user/:id', getUserById);

router.post('/user', createUser);

// router.put('/user/:id', updateUser);

// router.delete('/user/:id', deleteUser);

router.post('/login', loginUser);

router.post('/user/existsUser', getUserByIdAndUsername)

// Exportar el enrutador
export default router;