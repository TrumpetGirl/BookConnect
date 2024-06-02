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