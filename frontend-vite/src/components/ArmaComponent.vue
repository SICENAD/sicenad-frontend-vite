<template>
  <hr class='w-100'>
  <div class="row">
    <div class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
      {{ props.content.nombre }}
      <ArmaModalComponent :tipoTiro="props.content.tipoTiro" :nombre="props.content.nombre"
         :idArma="props.content.idString"
        @emiteModal="actualizarArmaEnElemento" />
    </div>
    <div class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">{{ tipoTiro }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import ArmaModalComponent from './ArmaModalComponent.vue'
const props = defineProps(['content'])
const emits = defineEmits(['emiteElemento'])
let tipoTiro = ref(props.content.tipoTiro)

function actualizarArmaEnElemento() {
  emits('emiteElemento')
}
</script>
<style scoped lang="scss">
div, div a {
  color: #A3B18A; font-weight: bold
}

fa-icon:hover {
  color: #588157;
}

.row {
  height: auto;
  padding: auto;
  margin: auto;
}

hr {
  margin-bottom: 0;
  margin-top: 0;
}
</style>
