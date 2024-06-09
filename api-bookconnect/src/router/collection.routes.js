import express from 'express'
import  { getCollectionOfUser, createCollection } from '../controllers/collectionController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/collection', verifyToken, createCollection)

router.get('/collection/user/:userId(\\d+)', verifyToken, getCollectionOfUser)

export default router
