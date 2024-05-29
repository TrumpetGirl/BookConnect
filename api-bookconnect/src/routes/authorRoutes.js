import express from 'express';
import { getAuthors, getAuthorNames, getAuthorCount, createAuthor, getAuthorsByName, removeAuthor, getAuthorById, updateAuthor, getBooksByAuthorId } from '../controllers/authorController.js';

const router = express.Router();

router.get('/author', getAuthors);

router.get('/author/names', getAuthorNames);

router.get('/author/total', getAuthorCount);

router.post('/author', createAuthor);

router.put('/author/:id', updateAuthor);

router.delete('/author/:id', removeAuthor);

router.post('/author/:name', getAuthorsByName);

router.get('/author/:id', getAuthorById);

router.get('/author/:id/books', getBooksByAuthorId);

export default router;
