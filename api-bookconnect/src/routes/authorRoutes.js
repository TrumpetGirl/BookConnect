import express from 'express';
import { getAuthors, createAuthor, getAuthorsByName, removeAuthor, getAuthorById } from '../controllers/authorController.js';

const router = express.Router();

router.get('/author', getAuthors);

router.post('/author', createAuthor);

// router.put('/author/:id', editAuthor);

router.delete('/author/:id', removeAuthor);

router.post('/author/:name', getAuthorsByName);

router.get('/author/:id', getAuthorById);

export default router;
