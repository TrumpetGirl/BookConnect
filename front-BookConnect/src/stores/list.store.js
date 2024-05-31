import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}/list`;

export const useListStore = defineStore({
    id: 'list',
    state: () => ({
        lists: [],
        list: {}
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
        async create(list) {
            try {
                const response = await axios.post(baseUrl, list);
                return {list: response.data, message:'La lista ha sido creada con éxito'}
            } catch (error) {
                throw new Error(error.response.data.message || 'Error al añadir la lista');
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
        }
    }
});