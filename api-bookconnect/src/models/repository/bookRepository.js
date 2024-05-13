// Importamos el modelo de libro y el objeto de PrismaClient para utilizar sus métodos
import Book  from '../model/Book.js'
import { PrismaClient } from '@prisma/client'

// Creamos el objeto de Prisma
const prisma = new PrismaClient()

// Función asíncrona que devuelve todos los libros que coinciden con el título proporcionado
export const findBooksByTitle = async (title) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        title: {
          contains: title // Filtramos por el título proporcionado
        }
      }
    });

    // Mapea los libros de Prisma al modelo de libro
    const arrBooks = books.map(book => new Book(book.id, book.isbn, book.title, 
      book.publication_year, book.author, book.genre, book.synopsis));

    return arrBooks;
  } catch (error) {
    console.error('Error al obtener libros por título:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};

// Función asíncrona que tras el await devuelve todos los libros a partir del Id de un autor
export const findBooksByAuthor = (async(authorId) => {
  try {
      const books = await prisma.book.findMany({
        // Filtro
        where: {
          author: Number(authorId)
        }
      });
    
      // Mapea los libros de Prisma al modelo de libro
      const arrBooks = books.map(book => new Book(book.id, book.isbn, book.title, 
        book.publication_year, book.author, book.genre, book.synopsis));
      
      return arrBooks;
      }  catch (error) {
        console.error('Error al obtener libros por autor:', error);
        return []; // Devuelve un array vacío en caso de error
      }
  });






