import { findBooksByAuthor } from '../models/repository/BookRepository.js'


    export const getAuthorBooks = ( async(req, res)=> {
    try {
      const { authorId } = req.params
      const books = await findBooksByAuthor(authorId);
      res.json(books)
      } catch (error) {
      res.status(500).json({ message: error.message });
    }

  })


 

