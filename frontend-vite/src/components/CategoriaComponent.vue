<template>
  <hr class='w-100'>
  <div class="row">
    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
      {{ props.content.nombre }}
      <CategoriaModalComponent :nombre="props.content.nombre" :idCategoria="props.content.idString"
        :descripcion="props.content.descripcion" :idCenad="props.idCenad" :categoriaPadre="props.categoriaPadre"
        @emiteModal="actualizarCategoriaEnElemento" />
    </div>
    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">{{ props.categoriaPadre }}</div>
    <div class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">{{ props.content.descripcion }}</div>
  </div>
</template>
<script setup>
import CategoriaModalComponent from './CategoriaModalComponent.vue'
import CategoriaService from '@/services/CategoriaService'
const props = defineProps(['content', 'idCenad', 'categoriaPadre'])
const emits = defineEmits(['emiteElemento'])
const service = new CategoriaService()

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
