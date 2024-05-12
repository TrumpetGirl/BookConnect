<template>
  <div class="container">
    <div class="content">
      <h2>Bienvenido/a a BookConnect. La red social para los amantes de los libros</h2>
      <p>Registra y organiza tus lecturas. Descubre usuarios con tus mismos gustos</p>
    </div>
    <div class="social-media">
      <v-icon icon="mdi-facebook" style="margin-right: 20px;" />
      <v-icon icon="mdi-twitter" style="margin-right: 20px;" />
      <v-icon icon="mdi-instagram" />
    </div>
    <p class="copyright">BookConnect, 2024. Todos los derechos reservados.</p>
  </div>
</template>

<style scoped>
.container {
  background-color: #f9e3e3; /* Color de fondo */
  height: 100vh; /* Altura del 100% de la pantalla */
  width: 100%; /* Ancho del 100% de la pantalla */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content {
  width: 90%;
  max-width: 600px; /* Ancho máximo del contenido */
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
}

h2 {
  color: #ff7eb9;
  margin-bottom: 20px; /* Agrega separación entre el h2 y el párrafo */
}

p {
  color: #ff7eb9; /* Cambia el color del párrafo */
  font-size: 20px;
}

.social-media {
  margin-top: 10px;
  margin-bottom: 20px; /* Agrega un margen en la parte inferior para separar los íconos del pie de página */
  display: flex;
  justify-content: center; /* Centra los íconos horizontalmente */
}
</style>
