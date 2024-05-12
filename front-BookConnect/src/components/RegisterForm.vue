<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
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
    <div class="left-pane">
      <fieldset class="register-fieldset">
        <legend>Regístrate aquí para formar parte de la comunidad</legend>
        <v-form ref="form" class="register-form">        
          <v-text-field
            v-model="registerUsername"
            label="Nombre de Usuario"
            required
          ></v-text-field>

          <v-text-field
            v-model="registerBirthdate"
            label="Fecha de Nacimiento (YYYY/MM/dd)"
            required
          ></v-text-field>

          <v-text-field
            v-model="registerEmail"
            label="Correo Electrónico"
            type="email"
            required
          ></v-text-field>

          <v-text-field
            v-model="registerPassword"
            label="Contraseña"
            type="password"
            required
          ></v-text-field>

          <v-text-field
            v-model="registerConfirmPassword"
            label="Repite Contraseña"
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
                @click="register"
                block
              >
                Enviar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <p>¿Ya estás registrado? <RouterLink to="/login">Inicia sesión aquí</RouterLink></p>
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

.register-fieldset {
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

