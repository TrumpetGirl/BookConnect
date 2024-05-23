<script setup>
import { WelcomeMessage } from '@/components';
import { RegisterForm } from '@/components/user';
</script>

<template>
  <div class="container">
    <div class="left-pane">
      <WelcomeMessage></WelcomeMessage>
    </div>
    <div class="right-pane">
      <RegisterForm></RegisterForm>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: stretch;
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
