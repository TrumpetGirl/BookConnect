<template>
    <div class="container">
        <router-view />
    </div>
</template>

<!-- <template>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-card>
            <v-card-title>Libros en tu colección:</v-card-title>
            <v-card-text>{{  }}</v-card-text>
          </v-card>
  
        
          <v-btn color="primary" block @click="">Listas</v-btn>
        </v-col>
  
        <v-col cols="6">
        
          <v-card>
            <v-card-title>
              <v-avatar size="32">
                <img src="url_de_la_foto_de_perfil" alt="Foto de perfil">
              </v-avatar>
              {{  }}
            </v-card-title>
          </v-card>
  
          <v-card>
            <v-card-title>Tus libros</v-card-title>
            <v-card-text>
              <v-row>
                <v-col v-for="(libro, index) in libros" :key="index" cols="4">
                  <v-img :src="libro.portada" aspect-ratio="1.5"></v-img>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template> -->