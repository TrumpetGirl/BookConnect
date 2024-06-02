import Book  from '../model/Book.js'
import Base  from '../model/Base.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ------ CRUD ------
// OBTENER TODOS LOS LIBROS
export const findAllBooks = async () => {
  try {
    const books = await prisma.book.findMany({
      include: {
        author: {
          select: {
            name: true,
            id: true
          }
        },
        genre: {
          select: {
            name: true,
            id: true
          }
        }
      }
    });
    const arrBooks = books.map(book => new Book(book.id, book.isbn, book.title, 
      book.publication_year, book.synopsis, book.image_path, book.author.name, book.genre.name, book.authorId, book.genreId));
    return arrBooks;
  } catch (error) {
    console.error('Error al obtener todos los libros: ', error);
    return []; 
  }
};

// OBTENER LIBRO POR ID
export const findBookById = async (id) => {
  try {
    const book = await prisma.book.findUnique({ where: { id: id }, 
      include: {
        author: {
          select: {
            name: true,
            id: true
          }
        },
        genre: {
          select: {
            name: true,
            id: true
          }
        }
      } 
    })
    return new Book(book.id, book.isbn, book.title, 
      book.publication_year, book.synopsis, book.image_path, book.author.name, 
      book.genre.name, book.authorId, book.genreId)
  } catch (error) {
    console.error(`Error obteniendo el libro ${id}: `, error)
    throw error;
  }
};

// CREAR LIBRO
export async function addBook(isbn, title, publicationYear, authorId, genreId, synopsis, imageExtension) {
  try {
    const newBook = await prisma.book.create({
      data: {
        isbn: isbn,
        title: title, 
        publication_year: publicationYear,
        authorId: authorId,
        genreId: genreId, 
        synopsis: synopsis,
        image_path: ''
      }
    });

    const updateBook = await prisma.book.update({
      where: {
        id: newBook.id
      },
      data: {
        image_path: "books/imagenLibro_" + newBook.id + "_" + new Date().getTime() + '.' + imageExtension
      }
    })
    return updateBook;
  } catch (error) {
    console.error('Error añadiendo libro: ', error);
    throw error;
  }
}

// EDITAR LIBRO
export const editBook = async (id,isbn, title, publicationYear, authorId, genreId, synopsis, imageExtension, imageChange) => {
  let image_path = imageExtension ? `books/imagenLibro_${id}_${new Date().getTime()}.${imageExtension}` : '';
  try {
    const updateData = {
      isbn: isbn,
      title: title,
      publication_year: publicationYear,
      author: { connect: {id:authorId}},
      genre: { connect: {id:genreId}},
      synopsis: synopsis,
    };
   
    if (imageChange) {
      updateData.image_path = image_path;
    } 
    const updatedBook = await prisma.book.update({
      where: { id: id },
      data: updateData
    });

    return updatedBook;
  } catch (error) {
    console.error('Error editando el libro: ', error);
    throw error;
  }
};

// ELIMINAR LIBRO
export const deleteBook = async (id) => {
  try {
    return await prisma.book.delete({ where: { id: id } });
  } catch (error) {
    console.error(`Error eliminando el libro ${id}: `, error);
    throw error;
  }
};
// ------ END CRUD ------

// OBTENER TODOS LOS NOMBRES DE LOS LIBROS
export const findAllBooksSelector = async () => {
  try {
    const books = await prisma.book.findMany({ select: { id: true, title: true }, orderBy: { name:'asc' } });
    return books.map(book => new Base (book.id, book.name));
  } catch (error) {
    console.error('Error al obtener los nombres de los libros: ', error);
    throw error; 
  }
 };

 // OBTENER EL NÚMERO TOTAL DE LIBROS
export const numBooks = async () => {
  try {
    const count = await prisma.book.count();
    return count;
  } catch (error) {
    console.error('Error al obtener el número total de libros: ', error);
    throw error;
  }
};

// OBTENER LIBROS POR TÍTULO
export const findBooksByTitle = async (title) => {
  try {
    return await prisma.author.findMany({ where: { title: title }, select: { title: true } });
  } catch (error) {
    console.error('Error al obtener libros por título:', error);
    return []; 
  }
};












