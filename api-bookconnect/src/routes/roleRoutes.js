import express from 'express';
import { getRoles } from '../controllers/roleController.js';
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/role', verifyToken, getRoles);

export default router;