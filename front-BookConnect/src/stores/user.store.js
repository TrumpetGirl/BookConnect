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
            try {
                await axios.post(baseUrl, user);
                return 'El usuario ha sido registrado con éxito'
            } catch (error) {
                throw new Error(error.response.data.message || 'Error al registrar usuario');
              }
           
        },
        async getAll() {
            try {
                this.users = (await axios.get(baseUrl)).data; 
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
                throw new Error('Error al verificar la disponibilidad del usuario');
            }
        },
        async existsUsername(username) {
            try {
                return await axios.post(`${baseUrl}/existsUsername`, { username });
            } catch (error) {
                console.log(error);
                throw new Error('Error al verificar la disponibilidad del usuario');
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
            try {
                await axios.delete(`${baseUrl}/${id}`);
                this.users = this.users.filter(user => user.id !== id); 
                return 'El usuario ha sido eliminado'
            } catch (error) {
                console.log(error);
            }
        }
  
    }
});