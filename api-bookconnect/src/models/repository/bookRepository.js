import   Book  from '../model/Book.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


  export const findBooksByAuthor = (async(authorId) => {
    try {
       const books = await prisma.book.findMany({
          where: {
            author: Number(authorId)
          }
       });
      
    // Mapea los libros de Prisma al modelo Book
    const arrBooks = books.map(book => new Book(book.id, book.isbn, book.title, book.publication_year, book.author, book.genre, book.synopsis));
    
    return arrBooks;
    // Convierte el objeto books en un array
    
    // for (const book in books) {
    //   arrBooks.push(book)
    //   // arrBooks.push(new Book(book.id, book.isbn, book.title, book.publication_year, book.author, book.genre, book.synopsis));
    // }
    
      // return JSON.stringify({'author': authorId})
  
  
    }  catch (error) {
      console.error('Error al obtener libros por autor:', error);
      return []; // Retorna un array vacío en caso de error
    }
  });






