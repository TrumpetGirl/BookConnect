import { ref, onMounted, onUnmounted, onRootMount, onRootUnmount } from 'vue';
import axios from 'axios';

const items = ref([]);

// Función para cargar los géneros
const loadGenres = () => {
  // Realiza una solicitud GET a la API REST de géneros
  axios.get('http://localhost:3000/genres')
    .then(response => {
      items.value = response.data;
    })
    .catch(error => {
      console.error('Error al obtener datos de géneros:', error);
    });
};

// Monta el componente al inicio
onMounted(loadGenres);

// Escucha el evento para recargar la lista de géneros
onRootMount(loadGenres);

// Desmonta el componente al finalizar
onUnmounted(() => {});
