<template>
  <hr class='w-100'>
  <div class="row">
    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4">
      {{ props.content.nombre }}
      <CategoriaModalComponent :nombre="props.content.nombre" :idCategoria="props.content.idString"
        :descripcion="props.content.descripcion" :categoriaPadre="categoriaPadre" :idCenad="props.idCenad"
        @emiteModal="actualizarCategoriaEnElemento" />
    </div>
    <div class="col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8">{{ props.content.descripcion }}</div>
  </div>
</template>
<script setup>
import CategoriaModalComponent from './CategoriaModalComponent.vue'
const props = defineProps(['content', 'idCenad'])
const emits = defineEmits(['emiteElemento'])

function actualizarCategoriaEnElemento() {
  emits('emiteElemento')
}
</script>
<style scoped lang="scss">
div,
div a {
  color: #A3B18A;
  font-weight: bold
}

v-icon:hover {
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
