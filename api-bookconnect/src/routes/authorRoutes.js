import express from 'express';
import { getAuthors, getAuthorCount, createAuthor, getAuthorsByName, removeAuthor, getAuthorById } from '../controllers/authorController.js';

const router = express.Router();

router.get('/author', getAuthors);

router.get('/author/total', getAuthorCount);

router.post('/author', createAuthor);

// router.put('/author/:id', editAuthor);

router.delete('/author/:id', removeAuthor);

router.post('/author/:name', getAuthorsByName);

router.get('/author/:id', getAuthorById);

export default router;
