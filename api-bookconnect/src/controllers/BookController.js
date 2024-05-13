// Importamos el repositorio para utilizar sus métodos
import { findBooksByAuthor } from '../models/repository/BookRepository.js'

// Función asíncrona que maneja la solicitud (req)--> Id del autor, 
// y la respuesta (res)--> libros del autor en concreto
export const getAuthorBooks = ( async(req, res)=> {
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


 

