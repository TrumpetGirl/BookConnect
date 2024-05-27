<script setup>
  import { RouterLink } from 'vue-router';
  import { useAuthStore, useSnackbarStore } from '@/stores';
  import { ref, onMounted  } from 'vue';
  import router from '@/router'

  const authStore = useAuthStore();
  const snackbarStore = useSnackbarStore();

  const username = ref('');
  const password = ref('');

  const handleLogin = async () => {
    try {
      const response = await authStore.login(username.value, password.value);
      if (authStore.isLoggedIn) {
        if (authStore.isAdmin()) {
          router.push('/dashboard');
        } else {
          router.push('/search');
        }
        snackbarStore.success(response)
      } else {
        snackbarStore.error('La contraseña es incorrecta')
      }
    } catch (error) {
      snackbarStore.error(error.message)
    }
  };

  const cancel = () => {
    username.value = '';
    password.value = '';
  };

  onMounted(() => {
  if (localStorage.getItem('logout')) {
    snackbarStore.success('Has cerrado sesión correctamente');
    localStorage.removeItem('logout');
  }
});
</script>

<template>
  <div class="container">
    <div class="left-pane">
      <fieldset class="login-fieldset">
        <legend>Inicia sesión para acceder a tu cuenta</legend>
        <v-form ref="form" class="login-form">
          <v-text-field
            v-model="username"
            label="Nombre de Usuario"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            required
          ></v-text-field>
          <v-row>
            <v-col cols="6">
              <v-btn color="#d3d3d3" @click="cancel" block>
                Cancelar
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn color="#ff7eb9" @click="handleLogin" block>
                Iniciar Sesión
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <p>¿No tienes cuenta? <RouterLink to="/user/register">Regístrate aquí</RouterLink></p>
      </fieldset>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.left-pane {
  width: 80%;
  max-width: 500px;
}

.login-fieldset {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

legend {
  color: #ff7eb9;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
}

p {
  text-align: center;
  margin-top: 15px;
}
</style>
