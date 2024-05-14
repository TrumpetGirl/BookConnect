import axios from 'axios';


// Función para cargar los géneros
export const loadGenres = () => {
  // Realiza una solicitud GET a la API REST de géneros
  axios.get('http://localhost:3000/genres')
    .then(response => {
      items.value = response.data;
    })
    .catch(error => {
      console.error('Error al obtener datos de géneros:', error);
    });
};





