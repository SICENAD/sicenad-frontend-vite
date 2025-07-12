<template>
  <HeaderComponent />
  <div class="container">
    <RouterView />
  </div>
  <FooterComponent />
</template>
<script setup>
import { RouterView } from 'vue-router'
import FooterComponent from './components/FooterComponent.vue'
import HeaderComponent from './components/HeaderComponent.vue';
</script>
<style scoped></style>
