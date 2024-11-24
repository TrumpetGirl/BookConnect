import { defineStore } from 'pinia'
import axios from 'axios'
import { useSnackbarStore } from './index'

const baseUrl = `${import.meta.env.VITE_API_URL}/book`

export const useBookStore = defineStore({
    id: 'book',
    state: () => ({
        books: [],
        book: {},
        bookCount: 0
    }),
    actions: {
        async getAll() {
            const response = (await axios.get(baseUrl)).data; 
            if (response?.success) {
                this.books = response.books
            } else {
                useSnackbarStore().error(response.message)
            }
        },
        async getById(id) {
            try {
                const response = (await axios.get(`${baseUrl}/${id}`)).data
                if (response?.success) {
                    this.book = response.book
                } else {
                    this.book = {}
                    useSnackbarStore().error(response?.message)
                }
            } catch (error) {
                useSnackbarStore().error(error?.response?.data?.message || "Error al obtener libro.")
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
                return {book: response.data, message:'El libro ha sido editado con éxito'}
            } catch (error) {
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