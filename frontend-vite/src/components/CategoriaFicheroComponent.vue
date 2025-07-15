<template>
  <hr class='w-100'>
  <div class="row">
    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4">
      {{ props.content.nombre }}
      <CategoriaFicheroModalComponent :tipo="props.content.tipo" :nombre="props.content.nombre"
         :idCategoriaFichero="props.content.idString" :descripcion="props.content.descripcion"
        @emiteModal="actualizarCategoriaFicheroEnElemento" />
    </div>
    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4" v-if="tipo == 0">Imágenes</div>
    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4" v-if="tipo == 1">Otros archivos</div>
    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4">{{ props.content.descripcion }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import CategoriaFicheroModalComponent from './CategoriaFicheroModalComponent.vue'
const props = defineProps(['content'])
const emits = defineEmits(['emiteElemento'])
let tipo = ref(props.content.tipo)

function actualizarCategoriaFicheroEnElemento() {
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
