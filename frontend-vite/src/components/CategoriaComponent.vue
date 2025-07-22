<template>
  <hr class='w-100'>
  <div class="row">
    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
      {{ props.content.nombre }}
      <CategoriaModalComponent :nombre="props.content.nombre" :idCategoria="props.content.idString"
        :descripcion="props.content.descripcion" :categoriaPadre="categoriaPadre" :idCenad="props.idCenad"
        @emiteModal="actualizarCategoriaEnElemento" />
    </div>
    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">{{ textoCategoriaPadre }}</div>
    <div class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">{{ props.content.descripcion }}</div>
  </div>
</template>
<script setup>
import CategoriaService from '@/services/CategoriaService'
import CategoriaModalComponent from './CategoriaModalComponent.vue'
import { onMounted, ref } from 'vue'
const props = defineProps(['content', 'idCenad'])
const emits = defineEmits(['emiteElemento'])
const service = new CategoriaService()
let categoriaPadre = ref()
let textoCategoriaPadre = ref('')

onMounted(async () => {
   const response = await service.fetchCategoriaPadreDeSubcategoria(props.content.idString)
   response!= null ? ((categoriaPadre.value = response) && (textoCategoriaPadre.value = categoriaPadre.value.nombre)) : (textoCategoriaPadre.value = 'NO TIENE')

})
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
