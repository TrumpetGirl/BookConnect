<script setup>
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const password = ref('');

const login = () => {
  axios.post('http://localhost:3000/login', {
    email: username.value,
    password: password.value,
  })
  .then(response => {
    const token = response.data.token;
    localStorage.setItem('token', token);      
  })
  .catch(error => {
    console.error('Error al iniciar sesión:', error);
  });
};
</script>

<template>
  <div class="container">
    <div class="left-pane">
      <fieldset class="login-fieldset">
        <legend>Inicia sesión para acceder a tu cuenta</legend>
        <v-form ref="form" class="login-form">        
          <v-text-field
            v-model="loginUsername"
            label="Nombre de Usuario"
            required
          ></v-text-field>

          <v-text-field
            v-model="loginPassword"
            label="Contraseña"
            type="password"
            required
          ></v-text-field>

          <v-row>
            <v-col cols="6">
              <v-btn
                color="#d3d3d3"
                @click="cancel"
                block
              >
                Cancelar
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="#ff7eb9"
                @click="login"
                block
              >
                Iniciar Sesión
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <p>¿No tienes cuenta? <RouterLink to="/">Regístrate aquí</RouterLink></p>
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

