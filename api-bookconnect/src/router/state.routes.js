import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getStates, getStateById, createState, updateState, removeState } from '../controllers/stateController.js';

const router = express.Router();

// ------ CRUD ------
router.get('/state', verifyToken, getStates);
router.get('/state/:id(\\d+)', verifyToken, getStateById);
router.post('/state', verifyToken, createState);
router.put('/state/:id(\\d+)', verifyToken, updateState);
router.delete('/state/:id(\\d+)', verifyToken, removeState);
// ------ END CRUD ------

export default router;