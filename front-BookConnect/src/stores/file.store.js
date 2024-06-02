import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}/file`;

export const useFileStore = defineStore({
  id: 'file',
  state: () => ({ }),
  actions: {
    async uploadImage (formData) {
        try {
          const response = await axios.post(`${baseUrl}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          return response.data;
        } catch (error) {
          console.error('Error al subir la imagen:', error);
          throw error;
        }
    },
    downloadImage (imageUrl) {
      return `${baseUrl}/download/${imageUrl}`;
    },
    async deleteImage (imageUrl) {
      try {
        const response = await axios.delete(`${baseUrl}/delete/${imageUrl}`)
        return response.data;
      } catch (error) {
        console.error('Error al eliminar la imagen:', error);
        throw error;
      }
    },
    async urlToFile (url, filename) {
      try {
        const response = await fetch(url)
        const blob = await response.blob()
        return new File([blob], filename)
      } catch (error) {
        console.error('Error al obtener la imagen de la URL:', error)
        throw error
      } 
    }
  }
});

