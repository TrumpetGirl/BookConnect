<script setup>
 import carousel1 from '@/assets/images/carousel-1.jpg';
 import carousel2 from '@/assets/images/carousel-2.jpg';
 import carousel3 from '@/assets/images/carousel-3.jpg';
  import { ref } from 'vue';

  const items = [
    { src: carousel1, text: 'Registra y organiza tus lecturas' },
    { src: carousel2, text: 'Comparte con toda la red tus valoraciones e impresiones' },
    { src: carousel3, text: 'Descubre usuarios con tus mismos gustos literarios' },
  ];
</script>

<template>
  <div class="container">
    <div class="content">
      <h2>Bienvenido/a a la red social para los amantes de los libros</h2>
    </div>
    <v-carousel cycle interval="5000" hide-delimiters>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        cover
      >
        <div class="carousel-caption">
          <h3>{{ item.text }}</h3>
        </div>
      </v-carousel-item>
    </v-carousel>
    <div class="social-media">
      <v-icon icon="mdi-facebook" class="social-icon" />
      <v-icon icon="mdi-twitter" class="social-icon" />
      <v-icon icon="mdi-instagram" class="social-icon" />
    </div>
  </div>
</template>



<style scoped>
.container {
  background: linear-gradient(135deg, #f9a2c9 0%, #fa8ab7 100%);
  color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  text-align: center;
}

.content {
  width: 90%;
  max-width: 600px;
  margin: auto;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.social-media {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.social-icon {
  font-size: 2.5em;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.social-icon:hover {
  transform: scale(1.2);
}

.carousel-caption {
  width: 500px;
  position: absolute;
  top: 20px; 
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
}

.carousel-caption h3 {
  color: #fff;
  margin: 0;
  font-size: 1.1em;
}
</style>
