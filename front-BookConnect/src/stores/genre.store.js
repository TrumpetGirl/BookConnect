import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}/genre`;

export const useGenreStore = defineStore({
    id: 'genre',
    state: () => ({
        genres: [],
        genre: {}
    }),
    actions: {
        async getAll() {
            try {
                this.genres = (await axios.get(baseUrl)).data;
            } catch (error) {
                throw new Error(error.response.data.message || 'No se han podido recuperar los géneros');
            }
        },
        async getById(id) {
            try {
                this.genre = await axios.get(`${baseUrl}/${id}`);
            } catch (error) {
                throw new Error(error.response.data.message || 'No se ha podido recuperar el género');
            }
        },
        async create(genre) {
            try {
                const response = await axios.post(baseUrl, genre);
                return {genre: response.data, message:'El género ha sido creado con éxito'}
            } catch (error) {
                throw new Error(error.response.data.message || 'Error al añadir género');
            }          
        },
        async update(id, params) {
            try {
                const response = await axios.put(`${baseUrl}/${id}`, params);
                return {genre: response.data, message:'El género ha sido editado con éxito'}
            } catch {
                throw new Error(error.response.data.message || 'Error al editar el género');
            }
        },
        async delete(id) {
            try {
                await axios.delete(`${baseUrl}/${id}`);
                this.genres = this.genres.filter(genre => genre.id !== id); 
                return 'El género ha sido eliminado'
            } catch (error) {
                console.log(error);
            }
        }
    }
});