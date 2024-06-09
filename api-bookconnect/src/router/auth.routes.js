import express from 'express'
import  { registerUser, loginUser, checkLoggedUser } from '../controllers/authController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)
router.post('/auth/checkLoggedUser', verifyToken, checkLoggedUser)

export default router
