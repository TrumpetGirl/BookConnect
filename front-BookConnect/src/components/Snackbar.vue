<script setup>
    import { storeToRefs } from 'pinia';
    import { useSnackbarStore } from '@/stores';

    const snackbarStore = useSnackbarStore();
    const { snackbar } = storeToRefs(snackbarStore);
</script>

<template>
    <v-snackbar
        v-model="snackbar.visible"
        :color="snackbar.type === 'error' ? 'red' : 'green'"
        icon="mdi-alert-circle"
        timeout="5000"
        @timeout="snackbarStore.clear"
    >
        {{ snackbar.message }}
    </v-snackbar>
</template>
