import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}/user`;

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        users: {},
        user: {}
    }),
    actions: {
        async register(user) {
            await axios.post(baseUrl, user);
        },
        async getAll() {
            try {
                this.users = await axios.get(baseUrl); 
            } catch (error) {
                console.log(error)
            }
        },
        async getById(id) {
            try {
                this.user = await axios.get(`${baseUrl}/${id}`);
            } catch (error) {
                console.log(error)
            }
        },
        async existsUser(user) {
            try {
                return await axios.post(`${baseUrl}/existsUser`, JSON.parse(user));
            } catch (error) {
                console.log(error)
            }
        },
        async update(id, params) {
            await axios.put(`${baseUrl}/${id}`, params);

            // update stored user if the logged in user updated their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                 // update auth user in pinia state
                authStore.user = user;
            }
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