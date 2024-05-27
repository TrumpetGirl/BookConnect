import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}/author`;

export const useAuthorStore = defineStore({
    id: 'author',
    state: () => ({
        authors: [],
        author: {}
    }),
    actions: {
        async create(author) {
            try {
                await axios.post(baseUrl, author);
                return 'El autor ha sido registrado con éxito'
            } catch (error) {
                throw new Error(error.response.data.message || 'Error al añadir autor');
            }            
        },
        async getAll() {
            try {
                this.authors = (await axios.get(baseUrl)).data; 
            } catch (error) {
                console.log(error)
            }
        },
        async getById(id) {
            try {
                this.author = await axios.get(`${baseUrl}/${id}`);
            } catch (error) {
                throw new Error(error.response.data.message || 'No se ha podido recuperar el autor');
            }
        },
        async update(id, params) {
            try {
                await axios.put(`${baseUrl}/${id}`, params);
                return 'El autor ha sido editado con éxito'
            } catch {
                throw new Error(error.response.data.message || 'Error al editar el autor');
            }
 
        },
        async delete(id) {
            try {
                await axios.delete(`${baseUrl}/${id}`);
                this.authors = this.authors.filter(author => author.id !== id); 
            } catch (error) {
                console.log(error);
            }
        }
    }
});