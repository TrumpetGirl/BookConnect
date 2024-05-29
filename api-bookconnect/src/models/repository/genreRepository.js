import Genre  from '../model/Genre.js'
import Base  from '../model/Base.js'
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
export const findAllGenresSelector = async () => {
  try {
      const genres = await prisma.genre.findMany({
        select: {
          id: true,
          description: true
        },
        orderBy:[
          {description:'asc'}
        ]
      });
      return genres.map(genre => new Base (genre.id, genre.description));
  } catch (error) {
      console.error('Error al obtener los nombres de los géneros:', error);
      return []; 
  }
};
