import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js'
import { getAuthors, getAuthorById, createAuthor, updateAuthor, removeAuthor, 
    getAuthorNames, getNumAuthors, getAuthorsByName, getBooksByAuthor } from '../controllers/authorController.js';

const router = express.Router();

// ------ CRUD ------
router.get('/author', verifyToken, getAuthors);
router.get('/author/:id', verifyToken, getAuthorById);
router.post('/author', verifyToken, createAuthor);
router.put('/author/:id', verifyToken, updateAuthor);
router.delete('/author/:id', verifyToken, removeAuthor);
// ------ END CRUD ------

router.get('/author/names', verifyToken, getAuthorNames);
router.get('/author/num', verifyToken, getNumAuthors);
router.post('/author/:name', verifyToken, getAuthorsByName);
router.get('/author/:id/books', verifyToken, getBooksByAuthor);

export default router;
