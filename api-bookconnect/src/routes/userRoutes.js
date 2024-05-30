import express from 'express';
import  { getUsers, getUserById, getUserByIdAndUsername, createUser, getUserByUsername, makeNewUser } from '../controllers/userController.js';
import  { loginUser } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/user', verifyToken, getUsers);

router.get('/user/:id', verifyToken, getUserById);

router.post('/user/register', createUser);

router.post('/user/create', verifyToken, makeNewUser);

router.post('/user/existsUser', verifyToken, getUserByIdAndUsername)

router.post('/user/existsUsername', verifyToken, getUserByUsername)

router.post('/login', loginUser);

// router.put('/user/:id', updateUser);

// router.delete('/user/:id', deleteUser);



export default router;