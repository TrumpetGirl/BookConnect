import List  from '../model/List.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ------ CRUD ------
// OBTENER TODAS LAS LISTAS
export const findAllLists = async () => {
  try {
      const lists = await prisma.list.findMany({
        orderBy:{type:'asc'}
      });
      return lists.map(list => new List (list.id, list.type, list.description, list.user));
  } catch (error) {
      console.error('Error al obtener los géneros:', error);
      return []; 
  }
};

// OBTENER LISTA POR ID
export const findListById = async (id) => {
  try {
    return await prisma.list.findUnique({ where: {id: id } })
  } catch (error) {
    console.error(`Error obteniendo la lista ${id}: `, error)
    throw error;
  }
};

// CREAR LISTA
export async function addList(name) {
  try {
    const newList = await prisma.list.create({
        data: { 
            name: name,
            description: description,
            user: user 
        }
    });
      return newList
    } catch (error) {
    console.error('Error añadiendo lista: ', error);
    throw error;
  }
};

// EDITAR LISTA
export const editList = async (id, name, description, user) => {
  try {
    const updateData = {
        name: name,
        description: description,
        user: user
    };
    const updatedList = await prisma.list.update({
      where: { id: id },
      data: updateData
    });
    return updatedList;
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
