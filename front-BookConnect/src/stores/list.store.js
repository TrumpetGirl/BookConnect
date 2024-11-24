import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import { useBookStore, useSnackbarStore } from './index'

const baseUrl = `${import.meta.env.VITE_API_URL}/list`;

export const useListStore = defineStore({
    id: 'list',
    state: () => ({
        lists: [],
        list: {},
        favourites: {},
        favouritesCount: 0,
        favouritesUsername: ""
    }),
    actions: {
        async getAll() {
            try {
                this.lists = (await axios.get(baseUrl)).data;
            } catch (error) {
                throw new Error(error.response.data.message || 'No se han podido recuperar las listas');
            }
        },
        async getById(id) {
            try {
                this.list = await axios.get(`${baseUrl}/${id}`);
            } catch (error) {
                throw new Error(error.response.data.message || 'No se ha podido recuperar la lista');
            }
        },
        async create(bookId) {
            try {
                const response = (await axios.post(baseUrl, {bookId: bookId})).data
                if (response?.success) {
                    const bookStore = useBookStore()
                    const { book } = storeToRefs(bookStore)
                    book.value.favourite = true
                    useSnackbarStore().success(response.message)
                } else useSnackbarStore().error(response.message)
            } catch (error) {
                useSnackbarStore().error(error?.response?.data?.message  || 'Error al añadir libro a la colección.');
            }  
        },
        async update(id, params) {
            try {
                const response = await axios.put(`${baseUrl}/${id}`, params);
                return {list: response.data, message:'La lista ha sido editada con éxito'}
            } catch {
                throw new Error(error.response.data.message || 'Error al editar la lista');
            }
        },
        async delete(id) {
            try {
                await axios.delete(`${baseUrl}/${id}`);
                this.lists = this.lists.filter(list => list.id !== id); 
                return 'La lista ha sido eliminada'
            } catch (error) {
                console.log(error);
            }
        },
        async getFavouritesByUserId(userId) {
            try {
                const response = (await axios.get(`${baseUrl}/user/${userId}`)).data
                if (response?.success) {
                    this.favourites = response.favourites
                    this.favouritesCount = response.count
                    this.favouritesUsername = response.username
                } else {
                    this.favourites = {}
                    this.favouritesCount = 0
                    this.collectionUsername = ""
                    useSnackbarStore().error(response?.message)
                }
            } catch (error) {
                useSnackbarStore().error(error?.response?.data?.message || "Error al obtener la lista de favoritos del usuario.")
            }
        },
        async addToFavourites(collectionId) {
            try {
                const response = (await axios.post(`${baseUrl}/favourite`, {collectionId: collectionId})).data
                if (response?.success) {
                    const bookStore = useBookStore()
                    const { book } = storeToRefs(bookStore)
                    book.value.favourite = true
                    useSnackbarStore().success(response.message)
                } else useSnackbarStore().error(response.message)
            } catch (error) {
                useSnackbarStore().error(error?.response?.data?.message || "Error al obtener la lista de favoritos del usuario.")
            }
        }
    }
});