import express from 'express';
import  { getUsers, getUserById, getUserByIdAndUsername, createUser, getUserByUsername, makeNewUser } from '../controllers/userController.js';
import  { loginUser } from '../controllers/authController.js';

const router = express.Router();

router.get('/user', getUsers);

router.get('/user/:id', getUserById);

router.post('/user/register', createUser);

router.post('/user/create', makeNewUser);

router.post('/user/existsUser', getUserByIdAndUsername)

router.post('/user/existsUsername', getUserByUsername)

router.post('/login', loginUser);

// router.put('/user/:id', updateUser);

// router.delete('/user/:id', deleteUser);



export default router;