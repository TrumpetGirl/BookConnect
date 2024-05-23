import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}/list`;

export const useListStore = defineStore({
    id: 'list',
    state: () => ({
        lists: {},
        list: {}
    }),
    actions: {
        async getAll() {
            try {
                this.lists = await axios.get(baseUrl); 
            } catch (error) {
                console.log(error)
            }
        },
        async getById(id) {
            try {
                this.list = await axios.get(`${baseUrl}/${id}`);
            } catch (error) {
                console.log(error)
            }
        },
        async update(id, params) {
            await axios.put(`${baseUrl}/${id}`, params);
        },
        async delete(id) {
            // add isDeleting prop to user being deleted
            this.lists.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

            // remove user from list after deleted
            this.list = this.list.filter(x => x.id !== id);

            // auto logout if the logged in user deleted their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                authStore.logout();
            }
        }
    }
});