import Collection  from '../model/Collection.js'
import BooksCollection  from '../views/BooksCollection.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// OBTENER LIBROS DE LA COLECCCIÓN POR ID DE USUARIO
export const findBooksCollectionByUser = async (userId)=>{
    try {
      const bookCollection = await prisma.collection.findMany({
        where: { userId: userId },
        include: { book: { select: { id: true, title: true, image_path: true } } }
      });
      return bookCollection.map(bookCollection => new BooksCollection (bookCollection.user_id, bookCollection.username,
        bookCollection.user_image, bookCollection.book_id, bookCollection.title, bookCollection.book_image)
      ));
    } catch (error) {
      console.error(`Error al obtener los libros de la colección de ${userId}: `, error);
      throw error;
    }
  };

