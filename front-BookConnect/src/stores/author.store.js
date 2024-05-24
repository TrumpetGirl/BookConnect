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
            await axios.post(baseUrl, author);
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
                console.log(error)
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