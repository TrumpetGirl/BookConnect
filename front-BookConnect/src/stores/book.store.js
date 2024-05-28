import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}/book`;

export const useBookStore = defineStore({
    id: 'book',
    state: () => ({
        books: [],
        book: {}
    }),
    actions: {
        async create(book) {
            await axios.post(baseUrl, book);
        },
        async getAll() {
            try {
                this.books = (await axios.get(baseUrl)).data; 
            } catch (error) {
                console.log(error)
            }
        },
        async getById(id) {
            try {
                this.book = (await axios.get(`${baseUrl}/${id}`)).data;
            } catch (error) {
                throw new Error(error.response.data.message || 'No se ha podido recuperar el libro');
            }
        },
        async update(id, params) {
            await axios.put(`${baseUrl}/${id}`, params);
        },
        async delete(id) {
            // add isDeleting prop to user being deleted
            this.users.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

            // remove user from list after deleted
            this.users = this.users.filter(x => x.id !== id);

            // auto logout if the logged in user deleted their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                authStore.logout();
            }
        }
    }
});