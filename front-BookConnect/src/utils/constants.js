import { ref } from 'vue'
// import { useRoute, useRouter } from 'vue-router';
// import { useAuthorStore, useFileStore, useSnackbarStore, useBookStore, useAuthStore } from '@/stores';

// export const route = useRoute();
// export const router = useRouter();
// export const authorStore = useAuthorStore();
// export const fileStore = useFileStore();
// export const snackbarStore = useSnackbarStore();
// export const bookStore = useBookStore();
// export const authStore = useAuthStore();

export const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const fNac = ref(new Date().toLocaleDateString());

