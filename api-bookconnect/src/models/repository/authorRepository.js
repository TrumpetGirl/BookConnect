// Importamos el modelo de autor y el objeto de PrismaClient para utilizar sus métodos
import Author  from '../model/Author.js'
import { PrismaClient } from '@prisma/client';

// Creamos el objeto de Prisma
const prisma = new PrismaClient();

// Función asíncrona que devuelve todos los autores de la base de datos
export const findAllAuthors = async () => {
  try {
    // Utilizamos el método findMany de Prisma para obtener todos los autores
    const authors = await prisma.author.findMany();
    
    // Mapea los libros de Prisma al modelo de autor
    const arrAuthors = authors.map(author => new Author(author.id, author.name, author.birthday_date, 
    author.nationality));

    return arrAuthors;
  } catch (error) {
    console.error('Error al obtener todos los autores:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};