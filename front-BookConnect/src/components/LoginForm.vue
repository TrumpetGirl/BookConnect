<template>
  <div>
    <div class="container">
      <div class="login-container">
        <fieldset class="login-fieldset">
          <legend>Inicia sesión</legend>
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
                  @click="login"
                  block
                >
                  Iniciar Sesión
                </v-btn>
              </v-col>
            </v-row>
          </v-form>

    <p><router-link to="/">Todavía no estoy registrado/a</router-link></p>
        </fieldset>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      axios.post('http://localhost:3000/login', {
        email: this.email,
        password: this.password,
      })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token);      
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container {
  width: 400px;
}

.login-fieldset {
  padding: 20px; 
}

.login-form {
  max-width: 400px;
  margin: 0 auto;
}

.v-form {
  width: 50%; 
  max-width: 300px; 
  padding: 20px; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
}
</style>
