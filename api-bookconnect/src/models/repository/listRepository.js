import MyBooks  from '../view/MyBooks.js'
import List  from '../model/List.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ------ CRUD ------
// OBTENER TODAS LAS LISTAS
export const findAllLists = async () => {
  try {
    const lists = await prisma.list.findMany({
      include: {  user: { select: { id: true, username: true  } } },
      orderBy:{ name: 'asc' }
    });
    return lists.map(list => new List (list.id, list.name, list.description, list.user.username, list.user.id));
  } catch (error) {
    console.error('Error al obtener los géneros:', error);
    return []; 
  }
};

// OBTENER LISTA POR ID
export const findListById = async (id) => {
  try {
    const list = await prisma.list.findUnique({ 
      where: { id: id }, 
      include: { user: { select: { id: true, username: true } } }
    })
    return new List (list.id, list.name, list.description, list.user.username, list.user.id)
  } catch (error) {
    console.error(`Error obteniendo la lista ${id}: `, error)
    throw error;
  }
};

// CREAR LISTA
export async function addList(name, description, userId) {
  try {
    const newList = await prisma.list.create({
        data: { 
          name: name,
          description: description,
          user: { connect: { id: userId } }
        },
        include: {
          user: { select: { id: true, username: true  } }
        }
    });
    return new List (newList.id, newList.name, newList.description, newList.user.username, newList.user.id)
  } catch (error) {
    console.error('Error añadiendo lista: ', error);
    throw error;
  }
};

// EDITAR LISTA
export const editList = async (id, name, description, userId) => {
  try {
    const updateData = {
      name: name,
      description: description,
      user: { connect: { id: userId } }
    };
    const updatedList = await prisma.list.update({
      where: { id: id },
      data: updateData,
      include: {
        user: { select: { id: true, username: true  } }
      }
    });
    return new List (updatedList.id, updatedList.name, updatedList.description, updatedList.user.username, updatedList.user.id)
  } catch (error) {
    console.error('Error editando la lista: ', error);
    throw error;
  }
};

// ELIMINAR LISTA
export const deleteList = async (id) => {
  try {
    return await prisma.list.delete({ where: { id: id } });
  } catch (error) {
    console.error(`Error eliminando la lista ${id}: `, error);
    throw error;
  }
};
// ------ END CRUD ------

// OBTENER EL NÚMERO TOTAL DE LISTAS
export const numLists = async () => {
  try {
    return await prisma.list.count();
  } catch (error) {
    console.error('Error al obtener el número total de listas: ', error);
    throw error;
  }
};

// OBTENER LIBROS FAVORITOS POR ID DE USUARIO
export const findFavouritesBooksOfUser = async (userId)=>{
  try {
    const [favourites, count] = await prisma.$transaction([
      prisma.bookscollection.findMany({ where: { userId: userId, list: "Favoritos"  }, orderBy: { created_date: 'desc' } }),
      prisma.collection_list.count({ where: { list: { name: "Favoritos", userId: userId } } })
    ])
    console.log(favourites)
    return { success: true, 
      count: count, 
      username: favourites[0]?.username,
      favourites: favourites.map(favourite => new MyBooks(favourite.bookId, favourite.title, favourite.book_image, favourite.rating, favourite.status) ) 
    }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'Error interno del servidor.' }
  }
}

// AÑADIR A FAVORITOS
export async function upsertFavourite(userId, collectionId) {
  try {
    const upsertFavourite = await prisma.collection_list.upsert({
      where: {
        collectionId: collectionId,
        list: { name: "Favoritos", userId: userId }
      },
      update: {
        enabled: true
      }, 
      create: {
        collection: { connect: { id: collectionId } },
        list: { name: "Favoritos", userId: userId },
        created_date: new Date(),
        updated_date: new Date()
      }
    })
    if (upsertFavourite) return { success: true, message: "Libro añadido a favoritos." }
    else return { success: false, message: "Error al añadir libro a favoritos." }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'Error interno del servidor.' }
  }
};

