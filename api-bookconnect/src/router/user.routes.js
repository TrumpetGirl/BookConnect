import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js'

import  { getUsers, getUserById, makeNewUser, updateUser, removeUser,
    getUserNames, getNumUsers, getUsersByUsername } from '../controllers/userController.js';

const router = express.Router();

// ------ CRUD ------
router.get('/user', verifyToken, getUsers);
router.get('/user/:id(\\d+)', verifyToken, getUserById);
router.post('/user/create', verifyToken, makeNewUser);
router.put('/user/:id(\\d+)', verifyToken, updateUser);
router.delete('/user/:id(\\d+)', verifyToken, removeUser);
// ------ END CRUD ------

router.get('/user/names', verifyToken, getUserNames);
router.get('/user/num', verifyToken, getNumUsers);
router.post('/user/searchName', verifyToken, getUsersByUsername);

export default router;