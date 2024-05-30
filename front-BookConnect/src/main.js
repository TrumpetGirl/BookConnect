//import './assets/css/main.css'
import { createApp } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores';

import App from './App.vue'
import router from './router'
import axios from 'axios'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { es } from "vuetify/locale";

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: "es",
    fallback: "es",
    messages: { es }
  },
  date: {
    locale: {
      es: 'es-ES'
    }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
const authStore = useAuthStore();
app.mount('#app')

axios.interceptors.request.use((config) => {
  const { token } = storeToRefs(authStore);
  if (token.value) {
    config.headers.Authorization = 'Bearer ' + token.value
  }
  return config
})

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      // if (useAuthStore().isLoggedIn) {
        if (error.response.status === 401) {
          router.push('/unauthorized')
        } else  if (error.response.status === 403) {
          router.push('/forbidden')
        } else {
          alert('Parece que ha ocurrido un error. Vuelve a intentarlo.')
        }
      // }
    }
    return Promise.reject(error)
  },
);