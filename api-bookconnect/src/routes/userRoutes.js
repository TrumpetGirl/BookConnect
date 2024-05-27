import express from 'express';
import  { getUsers, getUserByIdAndUsername, createUser, getUserByUsername } from '../controllers/userController.js';
import  { loginUser } from '../controllers/authController.js';

const router = express.Router();

router.get('/user', getUsers);

router.post('/user', createUser);

// router.put('/user/:id', updateUser);

// router.delete('/user/:id', deleteUser);

router.post('/login', loginUser);

router.post('/user/existsUser', getUserByIdAndUsername)

router.post('/user/existsUsername', getUserByUsername)

export default router;