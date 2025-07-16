<template>
  <hr class='w-100'>
  <div class="row">
    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
      {{ props.content.nombre }}
      <UnidadModalComponent :descripcion="props.content.descripcion" :nombre="props.content.nombre"
        :direccion="props.content.direccion" :email="props.content.email" :tfno="props.content.tfno"
        :poc="props.content.poc" :idUnidad="props.content.idString" @emiteModal="actualizarUnidadEnElemento" />
    </div>
    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-34">{{ props.content.email }}</div>
    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">{{ props.content.tfno }}</div>
    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">{{ props.content.poc }}</div>
  </div>
</template>
<script setup>
import UnidadModalComponent from './UnidadModalComponent.vue'
const props = defineProps(['content'])
const emits = defineEmits(['emiteElemento'])

function actualizarUnidadEnElemento() {
  emits('emiteElemento')
}
</script>
<style scoped lang="scss">
div,
div a {
  color: #A3B18A;
  font-weight: bold
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
