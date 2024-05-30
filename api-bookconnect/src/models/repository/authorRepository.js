import Author  from '../model/Author.js'
import BasePath  from '../model/BasePath.js'
import Base  from '../model/Base.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ------CRUD------
// OBTENER TODOS LOS AUTORES
export const findAllAuthors = async () => {
  try {
    const authors = await prisma.author.findMany({
      include: {
        _count:{
          select:{book_book_authorToauthor: true}
        }
      }
    });
    console.log(authors)
    const arrAuthors = authors.map(author => new Author(author.id, author.name, author.birth_date, 
    author.nationality, author.image_path, author._count.book_book_authorToauthor));
    return arrAuthors;
  } catch (error) {
    console.error('Error al obtener todos los autores:', error);
    return []; 
  }
};

// OBTENER AUTOR POR ID
export const findAuthorById = async (id) => {
  try {
    return await prisma.author.findUnique({ where: { id: id } });
  } catch (error) {
    console.error('Error obteniendo autor por id:', error);
    throw error;
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
    if (imageExtension) {
      const updateAuthor = await prisma.author.update({
        where: {
          id: newAuthor.id
        },
        data: {
          image_path: "authors/imagenAutor_" + newAuthor.id + "." + imageExtension
        }
      })
      return updateAuthor;
    } else {
      return newAuthor
    }
  } catch (error) {
    console.error('Error añadiendo autor:', error);
    throw error;
  }
};

// EDITAR AUTOR
export const editAuthor = async (id, name, birthDate, nationality, imageExtension) => {
  let image_path = imageExtension ? `authors/imagenAutor_${id}.${imageExtension}` : null;
  try {
    const updateData = {
      name: name,
      birth_date: new Date(birthDate),
      nationality: nationality,
    };
   
    if (image_path) {
      updateData.image_path = image_path;
    } else {
      updateData.image_path = null;
    }
    const updatedAuthor = await prisma.author.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return updatedAuthor;
  } catch (error) {
    console.error('Error editando al autor:', error);
    throw error;
  }
};

// ELIMINAR AUTOR
export const deleteAuthor = async (id) => {
  try {
    const deletedAuthor = await prisma.author.delete({
      where: {
        id: parseInt(id)
      }
    });
    return deletedAuthor;
  } catch (error) {
    console.error('Error eliminando autor:', error);
    throw error;
  }
};
// ------END CRUD------

// OBTENER TODOS LOS NOMBRES DE LOS AUTORES (TODO: cambiar por lo de base)
export const findAllAuthorNames = async () => {
  try {
      const authors = await prisma.author.findMany({
          select: {
               name: true
           }
       });
       return authors.map(author => author.name);
   } catch (error) {
      console.error('Error al obtener los nombres de los autores:', error);
       return []; 
   }
 };

// OBTENER EL NÚMERO TOTAL DE AUTORES
export const countAuthors = async () => {
  try {
    const count = await prisma.author.count();
    return count;
  } catch (error) {
    console.error('Error al obtener el número total de autores:', error);
    throw error;
  }
};

// OBTENER AUTORES POR NOMBRE
export const findAuthorsByName = async (name) => {
  try {
    return await prisma.author.findMany({ where: { name: name }, select: {name: true} });
  } catch (error) {
    console.error('Error obteniendo autor por nombre:', error);
    throw error;
  }
};

  // OBTENER NOMBRE DE LIBROS POR AUTOR
  export const findAllBooksByAuthor = (async (authorId) =>{
    try {
      const author = await prisma.author.findUnique({
        where: {
          id: Number(authorId),
        },
        include: {
          book_book_authorToauthor: {
            select: {
              title: true,
              id: true,
              image_path: true
            }
          }
        }
      });
      return author.book_book_authorToauthor.map(book => new BasePath (book.id, book.title, book.image_path));
    } catch (error) {
      console.error('Error al obtener los nombre de los libros por autor:', error);
      throw error;
    }
  });







