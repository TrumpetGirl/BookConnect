<script setup>
  import { RouterLink } from 'vue-router';
  import { ref, watch, computed } from 'vue';
  import { useUserStore, useSnackbarStore } from '@/stores';

  const user = ref({
    username: '',
    birth_date: new Date().toLocaleDateString(), 
    email: '',
    password: ''
  });

  const confirmPassword = ref('');
  const fNac = ref(new Date().toLocaleDateString());

  let usernameError = false;
  let usernameMessage = '';
  
  const userStore = useUserStore();
  const snackbarStore = useSnackbarStore();

  watch(fNac, (newVal) => {
    if (newVal) {
      user.value.birth_date = newVal;
    }
  });

  const fNacFormatted = computed({
    get: () => {
      return fNac.value;
    },
    set: (val) => {
      fNac.value = val;
    }
  });

  const checkUsernameAvailability = async () => {
    console.log(user.value.username)
    if (user.value.username) {
      try {
        const response = await userStore.existsUsername( user.value.username );
        if (response.data === user.value.username) {
          usernameError = true;
          usernameMessage = 'El usuario ya existe';
        } else {
          usernameError = false;
          usernameMessage = 'El usuario está disponible';
        }
      } catch (error) {
        console.error('Error al verificar la disponibilidad del usuario:', error);
        usernameError = true;
        usernameMessage = 'Error al verificar la disponibilidad del usuario';
      }
    }
  };

  const validatePassword = (password) => {
    const hasNumber = /[0-9]/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= 10 && hasNumber && hasLetter && hasSpecialChar;
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age;
};

  const handleRegister = async () => {
    try {
      
      if (!user.value.username || !user.value.birth_date || !user.value.email || 
        !user.value.password || !confirmPassword.value) {
          snackbarStore.error('Todos los campos son obligatorios')
        return;
      }

      const age = calculateAge(user.value.birth_date);
        if (age < 5) {
          snackbarStore.error('Revise su fecha de nacimiento');
          return;
      }

      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(user.value.email)) {
        snackbarStore.error('Correo electrónico no válido')
        return;
      }

      if (confirmPassword.value !== user.value.password) {
      snackbarStore.error('Las contraseñas no coinciden');
      return;
      }

    if (!validatePassword(user.value.password)) {
      snackbarStore.error('La contraseña debe tener al menos 10 caracteres de longitud y, al menos, 1 número, 1 letra y 1 caracter de tipo especial');
      return;
      }

    const response = await userStore.register(user.value);
    snackbarStore.success(response);
    cleanForm();
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
      snackbarStore.error(error.message);
  }
  };

  const cleanForm = () => {
    user.value.username = ''
    user.value.birth_date = new Date().toLocaleDateString()
    fNac.value = new Date().toLocaleDateString()
    user.value.email = ''
    user.value.password = ''
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
            @input="checkUsernameAvailability"
          ></v-text-field>
          <p v-if="usernameMessage">{{ usernameMessage }}</p>

          <v-text-field
            v-model="fNacFormatted"
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
