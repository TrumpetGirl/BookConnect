// Importamos el modelo de género y el objeto de PrismaClient para utilizar sus métodos
import Genre  from '../model/Genre.js'
import { PrismaClient } from '@prisma/client';

// Creamos el objeto de Prisma
const prisma = new PrismaClient();

// Función asíncrona que devuelve todos los géneros de la base de datos
export const findAllGenres = async () => {
    try {
      // Utilizamos el método findMany de Prisma para obtener todos los autores
      const genres = await prisma.genre.findMany();
      
      // Mapea los libros de Prisma al modelo de autor
      const arrGenres = genres.map(genre => new Genre(genre.id, genre.name));
  
      return arrGenres;
    } catch (error) {
      console.error('Error al obtener todos los autores:', error);
      return []; // Devuelve un array vacío en caso de error
    }
  };