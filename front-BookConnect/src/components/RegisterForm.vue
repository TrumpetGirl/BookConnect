<script setup>
import { RouterLink } from 'vue-router';
import axios from 'axios';

const username = ref('');
const birthdate = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const register = () => {
  if (password.value !== confirmPassword.value) {
    console.error('Las contraseñas no coinciden');
    return;
  }
  
  axios.post('http://localhost:3000/register', {
    username: username.value,
    birthdate: birthdate.value,
    email: email.value,
    password: password.value,
  })
  .then(response => {
  })
  .catch(error => {
    console.error('Error al registrar usuario:', error);
  });
};
</script>

<template>
  <div class="container">
    <div class="main-container">
      <div class="left-pane">
        <h2>Regístrate aquí para formar parte de la comunidad</h2>
        <v-form ref="form" class="register-form">        
          <v-text-field
            v-model="username"
            label="Nombre de Usuario"
            required
          ></v-text-field>

          <v-text-field
            v-model="birthdate"
            label="Fecha de Nacimiento (YYYY/MM/dd)"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="Correo Electrónico"
            type="email"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            required
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            label="Repite Contraseña"
            type="password"
            required
          ></v-text-field>

          <v-row>
            <v-col cols="6">
              <v-btn
                color="error"
                @click="cancel"
                block
              >
                Cancelar
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="primary"
                @click="submit"
                block
              >
                Enviar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <p>¿Ya estás registrado? <RouterLink to="/login">Inicia sesión aquí</RouterLink></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-form {
  width: 50%; 
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ccc; 
  border-radius: 5px; 
}

.left-pane {
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0;
}

.register-form {
  max-width: 300px;
  margin: 0 auto;
}

.router-link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
