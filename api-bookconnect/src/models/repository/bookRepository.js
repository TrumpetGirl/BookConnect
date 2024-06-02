import Book  from '../model/Book.js'
import BookList  from '../../views/BookList.js'
import Base  from '../../views/Base.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ------ CRUD ------
// OBTENER TODOS LOS LIBROS
export const findAllBooks = async () => {
  try {
    const books = await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        publication_year: true,
        image_path: true,
        author: { select: { id: true, name: true  } },
        genre: { select: { id: true, name: true } }
      }
    });
    return books.map(book => new BookList(book.id, book.title, book.publication_year, book.image_path, book.author.name, book.genre.name, book.author.id, book.genre.id));
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
        author: { select: { id: true, name: true  } },
        genre: { select: { id: true, name: true } }
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
        synopsis: synopsis,
        image_path: '',
        author: { connect: { id: authorId } },
        genre: { connect: { id: genreId } }
      },
      include: {
        author: { select: { id: true, name: true  } },
        genre: { select: { id: true, name: true } }
      }
    })
    const updateBook = await prisma.book.update({
      where: { id: newBook.id },
      data: { image_path: "books/imagenLibro_" + newBook.id + "_" + new Date().getTime() + '.' + imageExtension },
      include: {
        author: { select: { id: true, name: true  } },
        genre: { select: { id: true, name: true } }
      }
    })
    return new Book(updateBook.id, updateBook.isbn, updateBook.title, 
      updateBook.publication_year, updateBook.synopsis, updateBook.image_path, updateBook.author.name, 
      updateBook.genre.name, updateBook.authorId, updateBook.genreId)
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
      synopsis: synopsis,
      author: { connect: { id: authorId } },
      genre: { connect: { id: genreId } }
    };
   
    if (imageChange) {
      updateData.image_path = image_path;
    } 
    const updatedBook = await prisma.book.update({
      where: { id: id },
      data: updateData,
      include: {
        author: { select: { id: true, name: true  } },
        genre: { select: { id: true, name: true } }
      }
    });

    return new Book(updatedBook.id, updatedBook.isbn, updatedBook.title, 
      updatedBook.publication_year, updatedBook.synopsis, updatedBook.image_path, 
      updatedBook.author.name, updatedBook.genre.name, updatedBook.authorId, updatedBook.genreId)
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
    const books = await prisma.book.findMany({ select: { id: true, title: true }, orderBy: { title:'asc' } });
    return books.map(book => new Base (book.id, book.title));
  } catch (error) {
    console.error('Error al obtener los nombres de los libros: ', error);
    throw error; 
  }
 };

 // OBTENER EL NÚMERO TOTAL DE LIBROS
export const numBooks = async () => {
  try {
    return await prisma.book.count();
  } catch (error) {
    console.error('Error al obtener el número total de libros: ', error);
    throw error;
  }
};

// OBTENER LIBROS POR TÍTULO
export const findBooksByTitle = async (search) => {
  try {
    const books = await prisma.book.findMany({ where: { title: { contains: search } }, select: { id: true, title: true }, orderBy: { title: 'asc' } });
    return books.map(book => new Base (book.id, book.title));
  } catch (error) {
    console.error(`Error obteniendo libro por título ${search}: `, error);
    throw error
  }
};












