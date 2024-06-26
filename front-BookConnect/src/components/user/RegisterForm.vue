<script setup>
  import * as validation from '../../utils/validations';
  import * as constant from '../../utils/constants';
  import * as navigation from '../../utils/navigation';
  import { RouterLink } from 'vue-router';
  import { ref } from 'vue';
  import { useAuthStore, useSnackbarStore } from '@/stores'

  const user = ref({
    username: '',
    birth_date: constant.formatDateToFormInput(new Date()),
    email: '',
    password: ''
  });
 
  const confirmPassword = ref('');
  let usernameError = false;
  let usernameMessage = '';
  
  const snackbarStore = useSnackbarStore();
  const authStore = useAuthStore()

  const handleRegister = async () => {

    if (!user.value.username || !user.value.birth_date || !user.value.email || 
      !user.value.password || !confirmPassword.value) {
        snackbarStore.error('Todos los campos son obligatorios')
      return;
    }

      // const usernameExistsResponse = await userStore.existsUsername(user.value.username);
      // console.log(usernameExistsResponse)
      // if (usernameExistsResponse) {
      //   snackbarStore.error('El usuario ya existe');
      //   return;
      // }

    const age = validation.calculateAge(user.value.birth_date);
    if (age < 5) {
      snackbarStore.error('Revise su fecha de nacimiento. El usuario debe tener al menos 5 años de edad.');
      return;
    }

    if (!constant.emailPattern.test(user.value.email)) {
      snackbarStore.error('Correo electrónico no válido')
      return;
    }

    if (confirmPassword.value !== user.value.password) {
      snackbarStore.error('Las contraseñas no coinciden');
      return;
    }

    if (!validation.validatePassword(user.value.password)) {
      snackbarStore.error('La contraseña debe tener al menos 10 caracteres de longitud y, al menos, 1 número, 1 letra y 1 caracter de tipo especial');
      return;
    }

    const authStore = useAuthStore()
    await authStore.register(user.value)
  };

  const cleanForm = () => {
    user.value = {},
    user.value.birth_date = constant.formatDateToFormInput(new Date()),
    confirmPassword.value = ''
  };
</script>

<template>
  <div class="container">
    <div class="left-panel">
      <fieldset class="register-fieldset">
        <legend>Regístrate aquí para formar parte de la comunidad</legend>
        <v-form @submit.prevent="handleRegister" ref="form" class="register-form">        
          <v-text-field
            v-model="user.username"
            label="Nombre de Usuario"
            type="text"
            required
            :error="usernameError"
          ></v-text-field>
          <p v-if="usernameMessage">{{ usernameMessage }}</p>

          <v-text-field
            v-model="user.birth_date"
            label="Fecha de Nacimiento"
            type="date"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.email"
            label="Correo Electrónico"
            type="email"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.password"
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
                color="#d3d3d3"
                @click="cleanForm"
                block
              >
                Cancelar
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn type="submit" color="#ff7eb9" block>Enviar</v-btn>
            </v-col>
          </v-row>
        </v-form>
        <p>¿Ya estás registrado? <RouterLink to="/user/login">Inicia sesión aquí</RouterLink></p>
      </fieldset>
    </div>
  </div>
</template>



<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.left-panel {
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
