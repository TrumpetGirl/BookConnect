import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}/author`;

export const useAuthorStore = defineStore({
    id: 'author',
    state: () => ({
        authors: [],
        author: {},
        books: []
    }),
    actions: {
        async create(author) {
            try {
                const response = await axios.post(baseUrl, author);
                return {author: response.data, message:'El autor ha sido registrado con éxito'}
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
        async getAuthorNames() {
            try {
                const response = await axios.get(`${baseUrl}/names`);
                this.authorNames = response.data;
            } catch (error) {
                console.log(error);
                return []; 
            }
        },
        async getById(id) {
            try {
                this.author = (await axios.get(`${baseUrl}/${id}`)).data;
            } catch (error) {
                throw new Error(error.response.data.message || 'No se ha podido recuperar el autor');
            }
        },
        async update(id, params) {
            try {
                const response = await axios.put(`${baseUrl}/${id}`, params);
                return {author: response.data, message:'El autor ha sido editado con éxito'}
            } catch {
                throw new Error(error.response.data.message || 'Error al editar el autor');
            }
 
        },
        async delete(id) {
            try {
                await axios.delete(`${baseUrl}/${id}`);
                this.authors = this.authors.filter(author => author.id !== id); 
                return 'El autor ha sido eliminado'
            } catch (error) {
                console.log(error);
            }
        },
        async getAllBooksByAuthor(id) {
            try {
                this.books = (await axios.get(`${baseUrl}/${id}/books`)).data;
            } catch (error) {
                console.log(error);
            }
        },
    }
});