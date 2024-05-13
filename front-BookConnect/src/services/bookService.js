// Importamos axios para realizar peticiones HTTP y 
import axios from 'axios';

// Función para cargar todos los libros
export const loadAllBooks = async () => {
  try {
    const response = await axios.get('http://localhost:3000/books');
    return response.data;
  } catch (error) {
    console.error('Error al obtener libros:', error);
    return []; // Devolvemos un array vacío en caso de error
  }
};

// Función para cargar los libros por autor
export const loadBooksbyAuthorId = () => {
  // Realizamos una solicitud GET a la API REST de libros por autor
  axios.get('http://localhost:3000/book/:authorId')
    .then(response => {
        // Si recibimos una respuesta, los datos de esa respuesta los asignamos a la
        // variable reactiva
        booksByAuthor.value = response.data;
    })
    .catch(error => {
      console.error('Error al obtener los libros por autor:', error);
    });
};

