import Book  from '../model/Book.js'
import Base  from '../model/Base.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// OBTENER TODOS LOS LIBROS
export const findAllBooks = async () => {
  try {
    const books = await prisma.book.findMany();
    // Mapea los libros de Prisma al modelo de libro
    const arrBooks = books.map(book => new Book(book.id, book.isbn, book.title, 
      book.publication_year, book.author, book.genre, book.synopsis, book.image_path));
    return arrBooks;
  } catch (error) {
    console.error('Error al obtener todos los libros:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};

// OBTENER LIBROS POR TÍTULO
export const findBooksByTitle = async (title) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        title: {
          contains: title 
        }
      }
    });
    const arrBooks = books.map(book => new Book(book.id, book.isbn, book.title, 
      book.publication_year, book.author, book.genre, book.synopsis));

    return arrBooks;
  } catch (error) {
    console.error('Error al obtener libros por título:', error);
    return []; 
  }
};

// OBTENER LIBROS POR AUTOR
export const findBooksByAuthor = (async(authorId) => {
  try {
      const books = await prisma.book.findMany({
        where: {
          author: Number(authorId)
        }
      });
      const arrBooks = books.map(book => new Book(book.id, book.isbn, book.title, 
        book.publication_year, book.author, book.genre, book.synopsis));
      
      return arrBooks;
      }  catch (error) {
        console.error('Error al obtener libros por autor:', error);
        return []; 
      }
  });


// CREAR LIBRO
export async function addBook(isbn, title, publicationYear, author, genre, synopsis, imageExtension) {
  try {
    const newBook = await prisma.book.create({
      data: {
        isbn: isbn,
        title: title, 
        publicationYear: publicationYear,
        author: author,
        genre: genre, 
        synopsis: synopsis
      }
    });
    const updateBook = await prisma.book.update({
      where: {
        id: newBook.id
      },
      data: {
        image_path: "books/imagenLibro_" + newBook.id + "." + imageExtension
      }
    })
    return updateBook;
  } catch (error) {
    console.error('Error añadiendo libro:', error);
    throw error;
  }
}







