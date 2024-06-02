import { findAllAuthors, findAuthorById, addAuthor, editAuthor, deleteAuthor, 
  findAllAuthorsSelector, numAuthors, findAuthorsByName, findBooksByAuthor  } from '../models/repository/authorRepository.js';

// ------ CRUD ------
// OBTENER TODOS LOS AUTORES
export const getAuthors = async (req, res) => {
  try {
    console.log(req.user)
    const authors = await findAllAuthors()
    res.status(200).json(authors)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener el listado de autores." })
  }
};

// OBTENER AUTOR POR ID
export const getAuthorById = async (req, res) => {
  try {
    const id  = parseInt(req.params.id)
    const author = await findAuthorById(id)
    res.status(200).json(author)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Error al obtener el autor con ID ${req.params.id}.` });
  }
};

// CREAR AUTOR
export const createAuthor = async (req, res) => {
  const { name, birth_date, nationality, imageExtension } = req.body;
  try {
    const newAuthor = await addAuthor(name, birth_date, nationality, imageExtension);
    res.status(201).json(newAuthor);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al crear el autor." });
  }
};

// EDITAR UN AUTOR
export const updateAuthor = async (req, res) => {
  const id  = parseInt(req.params.id)
  const { name, birth_date, nationality, imageExtension, imageChange } = req.body;
  try {
    const editedAuthor = await editAuthor(id, name, birth_date, nationality, imageExtension, imageChange);
    res.status(200).json(editedAuthor);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al editar el autor." });
  }
};

// ELIMINAR AUTOR
export const removeAuthor = async (req, res) => {
  const id  = parseInt(req.params.id)
  try {
    const deletedAuthor = await deleteAuthor(id);
    res.status(200).json({ message: `Autor con ID ${id} eliminado correctamente`, deletedAuthor });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al eliminar el autor." });
  }
};
// ------ END CRUD ------

// OBTENER EL NOMBRE DE LOS AUTORES
export const getAuthorNames = async (req, res) => {
  try {
    const authorNames = await findAllAuthorsSelector();
    res.status(200).json(authorNames)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener los nombres de los autores' });
  }
};

// OBTENER NÚMERO TOTAL DE AUTORES
export const getNumAuthors = async (req, res) => {
  try {
    const totalAuthors = await numAuthors();
    res.status(200).json({ totalAuthors });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener el número de autores." });
  }
};

// OBTENER AUTORES POR NOMBRE
export const getAuthorsByName = async (req, res) => {
  const { search } = req.body;
  try {
    const authors = await findAuthorsByName(search);
    res.status(200).json(authors)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener autores por nombre ' + search });
  }
};

// OBTENER EL NOMBRE DE LOS LIBROS POR AUTOR
export const getBooksByAuthor = async (req, res) => {
  const authorId = parseInt(req.params.id)
  try {
    const bookNames = await findBooksByAuthor(authorId);
    res.status(200).json(bookNames);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener los nombres de los libros por autor' });
  }
};



