import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js'
import  { getBooks, getBookById, createBook, updateBook, removeBook, 
    getBookNames, getNumBooks, getBooksByTitle } from '../controllers/bookController.js'

const router = express.Router();

// ------ CRUD ------
router.get('/book', verifyToken, getBooks);
router.get('/book/:id(\\d+)', verifyToken, getBookById);
router.post('/book', verifyToken, createBook);
router.put('/book/:id(\\d+)', verifyToken, updateBook);
router.delete('/book/:id(\\d+)', verifyToken, removeBook);
// ------ END CRUD ------

router.get('/book/names', verifyToken, getBookNames);
router.get('/book/num', verifyToken, getNumBooks);
router.post('/book/searchTitle', verifyToken, getBooksByTitle);

export default router;
