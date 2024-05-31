import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getLists, getListById, createList, updateList, removeList } from '../controllers/listController.js';

const router = express.Router();

// ------ CRUD ------
router.get('/list', verifyToken, getLists);
router.get('/list/:id(\\d+)', verifyToken, getListById);
router.post('/list', verifyToken, createList);
router.put('/list/:id(\\d+)', verifyToken, updateList);
router.delete('/list/:id(\\d+)', verifyToken, removeList);
// ------ END CRUD ------

export default router;