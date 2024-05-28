import Genre  from '../model/Genre.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// OBTENER TODOS LOS GÉNEROS
export const findAllGenres = async () => {
    try {
      const genres = await prisma.genre.findMany();
      const arrGenres = genres.map(genre => new Genre(genre.id, genre.name));
      return arrGenres;
    } catch (error) {
      console.error('Error al obtener todos los géneros:', error);
      return []; 
    }
  };

// OBTENER TODOS LOS NOMBRES DE LOS GÉNEROS
export const findAllGenreNames = async () => {
  try {
      const genres = await prisma.genre.findMany({
          select: {
              name: true
          }
      });
      return genres.map(genre => genre.name);
  } catch (error) {
      console.error('Error al obtener los nombres de los géneros:', error);
      return []; 
  }
};
