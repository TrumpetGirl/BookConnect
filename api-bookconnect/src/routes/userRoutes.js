import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js'
import  { loginUser } from '../controllers/authController.js';
import  { getUsers, getUserById, makeNewUser, createUser, updateUser, removeUser,
    getUserNames, getNumUsers, getUsersByUsername, getUserByUsername, checkLoggedUser } from '../controllers/userController.js';

const router = express.Router();

// ------ CRUD ------
router.get('/user', verifyToken, getUsers);
router.get('/user/:id(\\d+)', verifyToken, getUserById);
router.post('/user/create', verifyToken, makeNewUser);
router.post('/user/register', createUser);
router.put('/user/:id(\\d+)', verifyToken, updateUser);
router.delete('/user/:id(\\d+)', verifyToken, removeUser);
// ------ END CRUD ------

router.get('/user/names', verifyToken, getUserNames);
router.get('/user/num', verifyToken, getNumUsers);
router.post('/user/searchName', verifyToken, getUsersByUsername);
router.post('/user/existsUsername', verifyToken, getUserByUsername)
router.post('/user/existsUser', verifyToken, checkLoggedUser)

router.post('/login', loginUser);

export default router;