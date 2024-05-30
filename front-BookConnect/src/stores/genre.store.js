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
        async create(genre) {
            await axios.post(baseUrl, genre);
        },
        async getAll() {
            try {
                const response = await axios.get(baseUrl);
                this.genres = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getAllGenresSelector() {
            try {
                const response = await axios.get(`${baseUrl}/names`);
                this.genres = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getById(id) {
            try {
                this.genre = await axios.get(`${baseUrl}/${id}`);
            } catch (error) {
                console.log(error)
            }
        },
        async update(id, params) {
            await axios.put(`${baseUrl}/${id}`, params);
        },
        async delete(id) {
            // add isDeleting prop to user being deleted
            this.genres.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

            // remove user from list after deleted
            this.genres = this.genres.filter(x => x.id !== id);

            // auto logout if the logged in user deleted their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                authStore.logout();
            }
        }
    }
});