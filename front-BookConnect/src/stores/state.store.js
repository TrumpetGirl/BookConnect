import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}/state`;

export const useGenreStore = defineStore({
    id: 'state',
    state: () => ({
        states: [],
        state: {}
    }),
    actions: {
        async getAll() {
            try {
                this.states = (await axios.get(baseUrl)).data;
            } catch (error) {
                throw new Error(error.response.data.message || 'No se han podido recuperar los estados');
            }
        },
        async getById(id) {
            try {
                this.state = await axios.get(`${baseUrl}/${id}`);
            } catch (error) {
                throw new Error(error.response.data.message || 'No se ha podido recuperar el estado');
            }
        },
        async create(state) {
            try {
                const response = await axios.post(baseUrl, state);
                return {state: response.data, message:'El estado ha sido creado con éxito'}
            } catch (error) {
                throw new Error(error.response.data.message || 'Error al añadir el estado');
            }          
        },
        async update(id, params) {
            try {
                const response = await axios.put(`${baseUrl}/${id}`, params);
                return {state: response.data, message:'El estado ha sido editado con éxito'}
            } catch {
                throw new Error(error.response.data.message || 'Error al editar el estado');
            }
        },
        async delete(id) {
            try {
                await axios.delete(`${baseUrl}/${id}`);
                this.states = this.states.filter(state => state.id !== id); 
                return 'El estado ha sido eliminado'
            } catch (error) {
                console.log(error);
            }
        }
    }
});