import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js'
import  { getBooks, getBookCount, createBook, getBooksbyAuthor, getBooksByTitle } from '../controllers/bookController.js'

const router = express.Router();

router.get('/book', verifyToken, getBooks);

router.get('/book/count', verifyToken, getBookCount);

router.post('/book', verifyToken, createBook);

router.get('/book/:title', verifyToken, getBooksByTitle);

router.get('/book/:authorId', verifyToken, getBooksbyAuthor);



export default router;
