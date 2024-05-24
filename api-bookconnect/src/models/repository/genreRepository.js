import Genre  from '../model/Genre.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// OBTENER TODOS LOS GÉNEROS
export const findAllGenres = async () => {
    try {
      const genres = await prisma.genre.findMany();
      // Mapea los libros de Prisma al modelo de género
      const arrGenres = genres.map(genre => new Genre(genre.id, genre.name));
      return arrGenres;
    } catch (error) {
      console.error('Error al obtener todos los autores:', error);
      return []; // Devuelve un array vacío en caso de error
    }
  };