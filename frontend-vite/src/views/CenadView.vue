<template>
  <CenadHeaderComponent />
  <div>
    <RouterView />
  </div>
  <CenadFooterComponent />
</template>
<script setup>
import { RouterView } from 'vue-router'
import CenadHeaderComponent from '@/components/CenadHeaderComponent.vue';
import CenadFooterComponent from '@/components/CenadFooterComponent.vue';
</script>
<style scoped></style>