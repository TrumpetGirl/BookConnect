import axios from 'axios';

// Función para cargar todos los libros
export const fetchGenres = async () => {
  try {
    const response = await axios.get('http://localhost:3000/genre');
    return response.data;
  } catch (error) {
    console.error('Error al obtener géneros:', error);
    throw error;
  }
};





