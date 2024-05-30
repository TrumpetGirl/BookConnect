import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js'
import { getAuthors, getAuthorNames, getNumAuthors, createAuthor, getAuthorsByName, removeAuthor, getAuthorById, updateAuthor, getBooksByAuthor } from '../controllers/authorController.js';

const router = express.Router();

router.get('/author', verifyToken, getAuthors);

router.get('/author/names', verifyToken, getAuthorNames);

router.get('/author/num', verifyToken, getNumAuthors);

router.post('/author', verifyToken, createAuthor);

router.put('/author/:id', verifyToken, updateAuthor);

router.delete('/author/:id', verifyToken, removeAuthor);

router.post('/author/:name', verifyToken, getAuthorsByName);

router.get('/author/:id', verifyToken, getAuthorById);

router.get('/author/:id/books', verifyToken, getBooksByAuthor);

export default router;
