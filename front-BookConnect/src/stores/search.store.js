import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useSearchStore = defineStore({
    id: 'search',
    state: () => ({
        searchValues: [],
        searchText: ''
    }),
    actions: {
        async getAll() {
            try {
                this.searchValues = (await axios.post(`${baseUrl}/author/searchName`, {search: this.searchText})).data
                Array.prototype.push.apply( this.searchValues, (await axios.post(`${baseUrl}/book/searchTitle`, {search: this.searchText})).data )
                Array.prototype.push.apply( this.searchValues, ( await axios.post(`${baseUrl}/user/searchName`, {search: this.searchText})).data )
            } catch (error) {
                console.log(error);
            }
        }
    }
});