import express from 'express';
import  { getUsers, getUserByIdAndUsername, createUser, getUserByUsername } from '../controllers/userController.js';
import  { loginUser } from '../controllers/authController.js';

const router = express.Router();

router.get('/user', getUsers);

router.post('/user', createUser);

router.post('/user/existsUser', getUserByIdAndUsername)

router.post('/user/existsUsername', getUserByUsername)

router.post('/login', loginUser);

// router.put('/user/:id', updateUser);

// router.delete('/user/:id', deleteUser);



export default router;