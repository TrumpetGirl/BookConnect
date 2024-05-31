<template>
    <v-container>
      <v-card>
        <v-card-title>Configuración de Usuario</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-avatar size="100">
                <v-img :src="profileImage" />
              </v-avatar>
              <input type="file" @change="handleFileChange" accept="image/*" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="username" label="Nombre de Usuario" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="birthDate" label="Fecha de Nacimiento" outlined v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="birthDate" no-title @input="menu = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="email" label="Correo Electrónico" outlined type="email"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="currentPassword" label="Contraseña Actual" outlined type="password"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newPassword" label="Nueva Contraseña" outlined type="password"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="confirmNewPassword" label="Confirmar Nueva Contraseña" outlined type="password"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="cancelChanges">Cancelar</v-btn>
          <v-btn color="primary" @click="saveChanges">Guardar Cambios</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  
  </script>
  
  <style scoped>
  .v-avatar {
    margin: 0 auto;
  }
  </style>
  