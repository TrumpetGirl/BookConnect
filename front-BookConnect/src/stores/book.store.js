import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}/book`;

export const useBookStore = defineStore({
    id: 'book',
    state: () => ({
        books: [],
        book: {},
        bookCount: 0
    }),
    actions: {
        async getAll() {
            try {
                this.books = (await axios.get(baseUrl)).data; 
            } catch (error) {
                throw new Error(error.response.data.message || 'No se han podido recuperar los libros');
            }
        },
        async getById(id) {
            try {
                this.book = (await axios.get(`${baseUrl}/${id}`)).data;
            } catch (error) {
                throw new Error(error.response.data.message || 'No se ha podido recuperar el libro');
            }
        },
        async create(book) {
            try {
                const response = await axios.post(baseUrl, book);
                return {book: response.data, message:'El libro ha sido creado con éxito'}
            } catch (error) {
                throw new Error(error.response.data.message || 'Error al añadir el libro');
            }    
        },
        async update(id, params) {
            try {
                const response = await axios.put(`${baseUrl}/${id}`, params);
                return {libro: response.data, message:'El libro ha sido editado con éxito'}
            } catch {
                throw new Error(error.response.data.message || 'Error al editar el libro');
            }
        },
        async delete(id) {
            try {
                await axios.delete(`${baseUrl}/${id}`);
                this.books = this.books.filter(book => book.id !== id); 
                return 'El libro ha sido eliminado'
            } catch (error) {
                console.log(error);
            }
        },
        async getBookNames() {
            try {
                const response = await axios.get(`${baseUrl}/names`);
                this.books = response.data;
            } catch (error) {
                console.log(error);
                return []; 
            }
        },
        async getCount() {
            try {
              const response = await axios.get(`${baseUrl}/num`);
              this.bookCount = response.data.totalBooks;
            } catch (error) {
              console.log(error);
            }
        },
        async getBooksByTitle(title) {
            try {
                this.books = (await axios.get(`${baseUrl}/${title}`)).data;
            } catch (error) {
                console.log(error);
            }
        },
      
    }
});