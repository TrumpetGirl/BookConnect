import { defineStore } from 'pinia'
import axios from 'axios'
import { useSnackbarStore } from './snackbar.store'

const baseUrl = `${import.meta.env.VITE_API_URL}/collection`;

export const useCollectionStore = defineStore({
    id: 'collection',
    state: () => ({
        collections: [],
        collection: {},
        collectionCount: 0,
        nowReading: {}
    }),
    actions: {
        async getAll() {
            const response = await axios.get(baseUrl)
            if (response.success) {
                this.collections = response.booksCollection
                this.collectionCount = response.count
            } else {
                useSnackbarStore().error(response.message)
            }
        },
        async getById(id) {
            try {
                this.collection = (await axios.get(`${baseUrl}/${id}`)).data
            } catch (error) {
                useSnackbarStore().error(error.response.data.message || 'Error al obtener libro de la colección');
            }
        },
        async create(bookId) {
            try {
                const response = await axios.post(baseUrl, {bookId: bookId})
                if (response.data.success) {
                    useSnackbarStore().success(response.data.message)
                }
            } catch (error) {
                useSnackbarStore().error(error?.response?.data?.message  || 'Error al añadir libro a la colección.');
            }  
        },
        async update(id, params) {
            try {
                const response = await axios.put(`${baseUrl}/${id}`, params);
                return {book: response.data, message:'El libro ha sido editado con éxito'}
            } catch (error) {
                useSnackbarStore().error(error.response.data.message || 'Error al obtener libro de la colección');
            }
        },
        async delete(id) {
            try {
                await axios.delete(`${baseUrl}/${id}`);
                this.books = this.books.filter(book => book.id !== id); 
                return 'El libro ha sido eliminado'
            } catch (error) {
                useSnackbarStore().error(error.response.data.message || 'Error al obtener libro de la colección');
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
        async getByUserId(userId, page, limit) {
            try {
                const response = (await axios.get(`${baseUrl}/user/${userId}`, { params: { page, limit } } )).data
                if (response?.success) {
                    this.collections = response.booksCollection
                    this.collectionCount = response.count
                    this.nowReading = response.nowReading
                } else {
                    useSnackbarStore().error(response?.message)
                }
            } catch (error) {
                useSnackbarStore().error(error?.response?.data?.message || "Error al registrar usuario.")
            }
        },
    }
});