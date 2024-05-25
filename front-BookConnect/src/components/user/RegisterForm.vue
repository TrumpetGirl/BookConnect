<script setup>
  import { RouterLink } from 'vue-router';
  import { ref, watch, computed } from 'vue';
  import { useUserStore } from '@/stores';
  import { useDate } from 'vuetify';

  const user = ref({
    username: '',
    birth_date: new Date().toISOString().substr(0, 10), 
    email: '',
    password: ''
  });

  const confirmPassword = ref('');
  const showSnackbar = ref(false);
  const snackbarMessage = ref('');
  const successSnackbar = ref(false);

  const fNac = ref(new Date().toISOString().substr(0, 10)); 
  const adapter = useDate();

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

  const handleRegister = async () => {
    try {
      if (!user.value.username || !user.value.birth_date || !user.value.email || 
        !user.value.password || !confirmPassword.value) {
        snackbarMessage.value = "Todos los campos son obligatorios";
        showSnackbar.value = true;
        return;
      }

      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(user.value.email)) {
        snackbarMessage.value = "Correo electrónico no válido";
        showSnackbar.value = true;
        return;
      }

      if (confirmPassword.value === user.value.password) {
        await useUserStore().register(user.value)
        successSnackbar.value = true;
        cleanForm()
      } else {
        snackbarMessage.value = "Las contraseñas no coinciden";
        showSnackbar.value = true;
      }
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  const cleanForm = () => {
    user.value.username = ''
    user.value.birth_date = new Date().toISOString().substr(0, 10)
    fNac.value = new Date().toISOString().substr(0, 10)
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
          ></v-text-field>

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
    <v-snackbar v-model="showSnackbar">
      {{ snackbarMessage }}
      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="showSnackbar = false"
        >
          CERRAR
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="successSnackbar" timeout="3000" color="green">
      Registro realizado con éxito
    </v-snackbar>
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
