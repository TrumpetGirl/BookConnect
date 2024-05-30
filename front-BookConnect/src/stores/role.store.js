import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}/role`;

export const useRoleStore = defineStore({
    id: 'role',
    state: () => ({
        roles: [],
        role: {}
    }),
    actions: {
        async create(role) {
            await axios.post(baseUrl, role);
        },
        async getAll() {
            try {
                const response = await axios.get(baseUrl);
                this.roles = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getAllRolesSelector() {
            try {
                const response = await axios.get(`${baseUrl}/names`);
                this.roles = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getById(id) {
            try {
                this.role = await axios.get(`${baseUrl}/${id}`);
            } catch (error) {
                console.log(error)
            }
        }
      }
});