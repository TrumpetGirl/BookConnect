<template>
  <div class="container">
    <div class="left-panel">
      <div class="content">
        <h2>Mensaje de bienvenida</h2>
        <p>Breve descripción de la web</p>
      </div>
      <div class="social-media">
        <i class="fab fa-facebook"></i>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-instagram"></i>
      </div>
      <p class="copyright">BookConnect, 2024. Todos los derechos reservados.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftPanel'
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.left-panel {
  width: 50%;
  padding: 20px;
  background-color: #f0f0f0;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.content {
  margin-bottom: auto;
}

.social-media {
  
}


 .copyright {
  margin-top: 20px;
  font-size: 12px;
  color: #888;
}
</style>
