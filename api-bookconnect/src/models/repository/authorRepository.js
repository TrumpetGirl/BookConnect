import Author  from '../model/Author.js'
import BasePath  from '../view/BasePath.js'
import SearchElement  from '../view/SearchElement.js'
import Base  from '../view/Base.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ------ CRUD ------
// OBTENER TODOS LOS AUTORES
export const findAllAuthors = async () => {
  try {
    const authors = await prisma.author.findMany({
      include: {  _count:{ select: { books: true } } }
    });
    return authors.map(author => new Author(author.id, author.name, author.birth_date, 
      author.nationality, author.image_path, author._count.books));
  } catch (error) {
    console.error('Error al obtener todos los autores: ', error)
    return []; 
  }
};


// OBTENER AUTOR POR ID
export const findAuthorById = async (id) => {
  try {
    const author = await prisma.author.findUnique({ where: { id: id }, include: {books: { select: { id: true, title: true, image_path: true} } } })
    return new Author(author.id, author.name, author.birth_date, author.nationality, author.image_path, author.books)
  } catch (error) {
    console.error(`Error obteniendo el autor ${id}: `, error)
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
      },
      include: { books: true }
    });
    if (imageExtension) {
      const updateAuthor = await prisma.author.update({
        where: { id: newAuthor.id },
        data: { image_path: "authors/imagenAutor_" + newAuthor.id + "_" + new Date().getTime() + "." + imageExtension },
        include: { books: true }
      })
      return new Author(updateAuthor.id, updateAuthor.name, updateAuthor.birth_date, updateAuthor.nationality, updateAuthor.image_path, updateAuthor.books)
    } else {
      return new Author(newAuthor.id, newAuthor.name, newAuthor.birth_date, newAuthor.nationality, newAuthor.image_path, newAuthor.books)
    }
  } catch (error) {
    console.error('Error añadiendo autor: ', error);
    throw error;
  }
};

// EDITAR AUTOR
export const editAuthor = async (id, name, birthDate, nationality, imageExtension, imageChange) => {
  let image_path = imageExtension ? `authors/imagenAutor_${id}_${new Date().getTime()}.${imageExtension}` : null;
  try {
    const updateData = {
      name: name,
      birth_date: new Date(birthDate),
      nationality: nationality
    };
    if (imageChange) {
      updateData.image_path = image_path;
    } 
    const updatedAuthor = await prisma.author.update({
      where: { id: id },
      data: updateData,
      include: { books: true }
    });
    return new Author(updatedAuthor.id, updatedAuthor.name, updatedAuthor.birth_date, updatedAuthor.nationality, updatedAuthor.image_path, updatedAuthor.books)
  } catch (error) {
    console.error('Error editando al autor: ', error);
    throw error;
  }
};

// ELIMINAR AUTOR
export const deleteAuthor = async (id) => {
  try {
    return await prisma.author.delete({ where: { id: id } });
  } catch (error) {
    console.error(`Error eliminando el autor ${id}: `, error);
    throw error;
  }
};
// ------ END CRUD ------

// OBTENER TODOS LOS NOMBRES DE LOS AUTORES
export const findAllAuthorsSelector = async () => {
  try {
    const authors = await prisma.author.findMany({ select: { id: true, name: true }, orderBy: { name:'asc' } });
    return authors.map(author => new Base (author.id, author.name));
  } catch (error) {
    console.error('Error al obtener los nombres de los autores: ', error);
    throw error; 
  }
 };

// OBTENER EL NÚMERO TOTAL DE AUTORES
export const numAuthors = async () => {
  try {
    return await prisma.author.count();
  } catch (error) {
    console.error('Error al obtener el número total de autores: ', error);
    throw error;
  }
};

// OBTENER AUTORES POR NOMBRE
export const findAuthorsByName = async (search) => {
  try {
    const authors = await prisma.author.findMany({ where: { name: { contains: search } }, select: { id: true, name: true, image_path: true }, orderBy: { name: 'asc' } });
    return authors.map(author => new SearchElement (author.id, author.name, author.image_path, 'Autor'));
  } catch (error) {
    console.error(`Error obteniendo autor por nombre ${search}: `, error);
    throw error;
  }
};

// OBTENER NOMBRE DE LIBROS POR AUTOR
export const findBooksByAuthor = async (authorId) =>{
  try {
    const author = await prisma.author.findUnique({
      where: { id: authorId },
      include: { books: { select: { id: true, title: true, image_path: true } } }
    });
    return author.books.map(book => new BasePath (book.id, book.title, book.image_path));
  } catch (error) {
    console.error(`Error al obtener los libros del autor ${authorId}: `, error);
    throw error;
  }
};







