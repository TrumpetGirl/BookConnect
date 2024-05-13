// Importamos axios para realizar peticiones HTTP y 
import axios from 'axios';

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

