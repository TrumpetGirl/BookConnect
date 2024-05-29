import express from 'express';
import { getRolesSelector } from '../controllers/roleController.js';

const router = express.Router();

router.get('/role/names', getRolesSelector);

export default router;