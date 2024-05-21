// Importamos el modelo de autor y el objeto de PrismaClient para utilizar sus métodos
import Author  from '../model/Author.js'
import { PrismaClient } from '@prisma/client';

// Creamos el objeto de Prisma
const prisma = new PrismaClient();

export async function addAuthor(name, birthDate, nationality, imageExtension) {
  try {
    const newAuthor = await prisma.author.create({
      data: {
        name: name,
        birth_date: new Date(birthDate), 
        nationality: nationality
      }
    });
    const updateAuthor = await prisma.author.update({
      where: {
        id: newAuthor.id
      },
      data: {
        image_path: "authors/imagenAutor_" + newAuthor.id + "." + imageExtension
      }
    })
    return updateAuthor;
  } catch (error) {
    console.error('Error adding author:', error);
    throw error;
  }
}

// Función asíncrona que devuelve todos los autores de la base de datos
export const findAllAuthors = async () => {
  try {
    // Utilizamos el método findMany de Prisma para obtener todos los autores
    const authors = await prisma.author.findMany();
    
    // Mapea los libros de Prisma al modelo de autor
    const arrAuthors = authors.map(author => new Author(author.id, author.name, author.birth_date, 
    author.nationality, author.image_path));

    return arrAuthors;
  } catch (error) {
    console.error('Error al obtener todos los autores:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};
