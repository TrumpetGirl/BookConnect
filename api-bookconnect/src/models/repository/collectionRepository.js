import MyBooks  from '../view/MyBooks.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// OBTENER LIBROS DE LA COLECCCIÓN POR ID DE USUARIO
export const findBookCollectionOfUser = async (userId)=>{
    try {
      const [booksCollection, count, nowReading] = await prisma.$transaction([
        prisma.bookscollection.findMany({ where: { userId: userId }, orderBy: { created_date: 'desc' } }),
        prisma.bookscollection.count({ where: { userId: userId } }),
        prisma.bookscollection.findFirst({ where: { userId: userId }, orderBy: { updated_date: 'desc' } })
      ])
      return { success: true, 
        count: count, 
        nowReading: nowReading ? new MyBooks(nowReading.bookId, nowReading.title, nowReading.book_image, nowReading.rating, nowReading.status) : null, 
        booksCollection: booksCollection.map(bookCollection => new MyBooks(bookCollection.bookId, bookCollection.title, bookCollection.book_image, bookCollection.rating, bookCollection.status) ) }
    } catch (error) {
      return { success: false, message: 'Error interno del servidor.' }
    }
  }

