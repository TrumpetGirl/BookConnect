import Genre  from '../model/Genre.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
