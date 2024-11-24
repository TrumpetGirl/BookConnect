import MyBooks  from '../view/MyBooks.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ------ CRUD ------
// OBTENER TODAS LAS COLECCIONES DE TODOS LOS LIBROS Y TODOS LOS USUARIOS
export const findAllBookCollections = async () => {
  try {
    const authors = await prisma.bookscollection.findMany({ });
    return { success: true }
  } catch (error) {
    return { success: false, message: 'Error interno del servidor.' }
  }
};


// OBTENER COLECCIÓN POR ID
export const findBookCollectionById = async (id) => {
  try {
    return { success: true }
  } catch (error) {
    return { success: false, message: 'Error interno del servidor.' }
  }
};

// CREAR COLECCIÓN
export async function addCollection(userId, bookId) {
  try {
    const newCollection = await prisma.collection.create({
      data: {
        user: { connect: { id: userId } },
        book: { connect: { id: bookId } },
        state: { connect: { id: 1 } },
        created_date: new Date(),
        updated_date: new Date()
      }
    })
    if (newCollection) return { success: true, message: "Libro añadido a la colección." }
    else return { success: false, message: "Error al añadir libro a la colección." }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'Error interno del servidor.' }
  }
};

// EDITAR AUTOR
export const editCollection = async () => {
  try {
    return { success: true }
  } catch (error) {
    return { success: false, message: 'Error interno del servidor.' }
  }
};

// ELIMINAR COLECCIÓN
export const deleteCollection = async (id) => {
  try {
    return { success: true }
  } catch (error) {
    return { success: false, message: 'Error interno del servidor.' }
  }
};
// ------ END CRUD ------

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
      username: nowReading?.username,
      nowReading: nowReading ? new MyBooks(nowReading.bookId, nowReading.title, nowReading.book_image, nowReading.rating, nowReading.status) : null, 
      booksCollection: booksCollection.map(bookCollection => new MyBooks(bookCollection.bookId, bookCollection.title, bookCollection.book_image, bookCollection.rating, bookCollection.status) ) 
    }
  } catch (error) {
    return { success: false, message: 'Error interno del servidor.' }
  }
}