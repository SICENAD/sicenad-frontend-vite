<template>
  <hr class='w-100'>
  <div class="row">
    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
      {{ props.content.nombre }}
      <TipoFormularioModalComponent :codTipo="props.content.codTipo" :nombre="props.content.nombre"
         :idTipoFormulario="props.content.idString" :descripcion="props.content.descripcion"
        @emiteModal="actualizarTipoFormularioEnElemento" />
    </div>
    <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2">{{ props.content.codTipo }}</div>
    <div class="col-10 col-sm-10 col-md-7 col-lg-7 col-xl-7">{{ props.content.descripcion }}</div>
  </div>
</template>
<script setup>
import TipoFormularioModalComponent from './TipoFormularioModalComponent.vue'
const props = defineProps(['content'])
const emits = defineEmits(['emiteElemento'])

function actualizarTipoFormularioEnElemento() {
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
