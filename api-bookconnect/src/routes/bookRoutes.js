import express from 'express';
import  { getBooks, createBook, getBooksbyAuthor, getBooksByTitle,  } from '../controllers/BookController.js'

const router = express.Router();

router.get('/book', getBooks)

router.post('/book', createBook);

router.get('/book/:title', getBooksByTitle);

router.get('/book/:authorId', getBooksbyAuthor);

export default router;
