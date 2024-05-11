<script setup>
import WelcomeMessage from '../components/WelcomeMessage.vue';
import RegisterForm from '../components/RegisterForm.vue';
</script>

<template>
  <div>
    <div class="left-pane">
      <WelcomeMessage />
    </div>
    <div class="right-pane">
      <RegisterForm />
    </div>
  </div>
</template>

<style scoped>
.left-pane {
  flex: 1;
  background-color: #f0f0f0;
}

.right-pane {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
