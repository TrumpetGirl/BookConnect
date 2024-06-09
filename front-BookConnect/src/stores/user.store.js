import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}/user`;

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        users: [],
        user: {},
        userCount: 0
    }),
    actions: {
        async getAll() {
            try {
                this.users = (await axios.get(baseUrl)).data; 
            } catch (error) {
                throw new Error(error.response.data.message || 'No se han podido recuperar los usuarios');
            }
        },
        async getById(id) {
            try {
                this.user = (await axios.get(`${baseUrl}/${id}`)).data;
            } catch (error) {
                throw new Error(error.response.data.message || 'No se ha podido recuperar el usuario');
            }
        },
        async create(author) {
            try {
                const response = await axios.post(`${baseUrl}/create`, author);
                return {author: response.data, message:'El usuario ha sido creado con éxito'}
            } catch (error) {
                throw new Error(error.response.data.message || 'Error al añadir al usuario');
            }            
        },
       
        async register(user) {
            try {
                await axios.post(`${baseUrl}/register`, user);
                return 'El usuario ha sido registrado con éxito'
            } catch (error) {
                return error.response || 'Error al registrar usuario';
            }
        },
        async update(id, params) {
            try {
                const response = await axios.put(`${baseUrl}/${id}`, params);
                return {user: response.data, message:'El usuario ha sido editado con éxito'}
            } catch {
                throw new Error(error.response.data.message || 'Error al editar el autor');
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
        },
        async getUserNames() {
            try {
                const response = await axios.get(`${baseUrl}/names`);
                this.users = response.data;
            } catch (error) {
                console.log(error);
                return []; 
            }
        },
        async getCount() {
            try {
              const response = await axios.get(`${baseUrl}/num`);
              this.userCount = response.data.totalUsers;
            } catch (error) {
              console.log(error);
            }
          },
        async existsUser(user) {
            try {
                const response = await axios.post(`${baseUrl}/existsUser`, JSON.parse(user))
                return response.data;
            } catch (error) {
                return error.response
            }
        },
        async existsUsername(username) {
            try {
                return (await axios.post(`${baseUrl}/existsUsername`, { username })).data;
            } catch (error) {
                console.log(error)
                return error.response || 'Error al verificar la disponibilidad del nombre de usuario.';
            }
        },

  
    }
});