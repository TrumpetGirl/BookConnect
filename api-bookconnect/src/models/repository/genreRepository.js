import Genre  from '../model/Genre.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ------ CRUD ------
// OBTENER TODOS LOS GÉNEROS
export const findAllGenres = async () => {
  try {
      const genres = await prisma.genre.findMany({
        orderBy:{type:'asc'}
      });
      return genres.map(genre => new Genre (genre.id, genre.type));
  } catch (error) {
      console.error('Error al obtener los géneros:', error);
      return []; 
  }
};

// OBTENER GÉNERO POR ID
export const findGenreById = async (id) => {
  try {
    return await prisma.genre.findUnique({ where: {id: id } })
  } catch (error) {
    console.error(`Error obteniendo el género ${id}: `, error)
    throw error;
  }
};

// CREAR GÉNERO
export async function addGenre(name) {
  try {
    const newGenre = await prisma.genre.create({ data: { name: name}});
      return newGenre
    } catch (error) {
    console.error('Error añadiendo género: ', error);
    throw error;
  }
};

// EDITAR GÉNERO
export const editGenre = async (id, name) => {
  try {
    const updateData = {name: name};
    const updatedGenre = await prisma.genre.update({
      where: { id: id },
      data: updateData
    });
    return updatedGenre;
  } catch (error) {
    console.error('Error editando el género: ', error);
    throw error;
  }
};

// ELIMINAR GÉNERO
export const deleteGenre = async (id) => {
  try {
    return await prisma.genre.delete({ where: { id: id } });
  } catch (error) {
    console.error(`Error eliminando el género ${id}: `, error);
    throw error;
  }
};
// ------ END CRUD ------
