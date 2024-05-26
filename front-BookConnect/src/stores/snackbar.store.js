import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore({
    id: 'snackbar',
    state: () => ({
        snackbar: {
            message: '',
            type: '',
            visible: false
        }
    }),
    actions: {
        success(message) {
            this.snackbar = { message, type: 'success', visible: true };
        },
        error(message) {
            this.snackbar = { message, type: 'error', visible: true };
        },
        clear() {
            this.snackbar.visible = false;
        }
    }
});
