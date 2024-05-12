<script setup>
import WelcomeMessage from '../components/WelcomeMessage.vue';
import LoginForm from '../components/LoginForm.vue';
</script>

<template>
  <div class="container">
    <div class="left-pane">
      <WelcomeMessage></WelcomeMessage>
    </div>
    <div class="right-pane">
      <LoginForm></LoginForm>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Ubuntu Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 100;
  font-style: normal;
}

.left-pane, .right-pane {
  flex: 1;
  padding: 20px;
}

.left-pane {
  background-color: #f0f0f0;
}

.right-pane {
  background-color: #f8f8f8;
}
</style>
