// Importamos el repositorio para utilizar sus métodos
import { findBooksByAuthor, findBooksByTitle } from '../models/repository/bookRepository.js'

// Función asíncrona que maneja la solicitud (req)--> título del libro,
// y la respuesta (res)--> libros que coinciden con el título proporcionado
export const getBooksByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    // Obtenemos la respuesta a través de la función del repositorio,
    // pasándole como parámetro el título
    const books = await findBooksByTitle(title);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función asíncrona que maneja la solicitud (req)--> Id del autor, 
// y la respuesta (res)--> libros del autor en concreto
export const getBooksbyAuthor = ( async(req, res)=> {
  try {
    const { authorId } = req.params
    // Obtenemos la respuesta a través de la función del repositorio,
    // pasándole como parámetro el autor
    const books = await findBooksByAuthor(authorId);
    res.json(books)
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
})



 

