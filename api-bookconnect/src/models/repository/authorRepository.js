import Author  from '../model/Author.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// OBTENER TODOS LOS AUTORES
export const findAllAuthors = async () => {
  try {
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

// CREAR AUTOR
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
    console.error('Error añadiendo autor:', error);
    throw error;
  }
};

// OBTENER AUTORES POR NOMBRE
export const findAuthorByName = async (name) => {
  try {
    return await prisma.author.findMany({ where: { name: name }, select: {name: true} });
  } catch (error) {
    console.error('Error obteniendo autor por nombre:', error);
    throw error;
  }
};

