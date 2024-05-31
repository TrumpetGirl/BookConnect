import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js'
import { getRoles, getRoleById, createRole, updateRole, removeRole } from '../controllers/roleController.js';

const router = express.Router();

// ------ CRUD ------
router.get('/role', verifyToken, getRoles);
router.get('/role/:id(\\d+)', verifyToken, getRoleById);
router.post('/role', verifyToken, createRole);
router.put('/role/:id(\\d+)', verifyToken, updateRole);
router.delete('/role/:id(\\d+)', verifyToken, removeRole);
// ------ END CRUD ------

export default router;