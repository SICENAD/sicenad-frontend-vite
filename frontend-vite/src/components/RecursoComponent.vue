<template>
  <hr class='w-100'>
  <div class="row">
    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4">
      {{ props.content.nombre }}
      <RecursoModalComponent :nombre="props.content.nombre" :idRecurso="props.content.idString" :otros="props.content.otros"
        :descripcion="props.content.descripcion" :categoria="categoria" :idCenad="props.idCenad" :tipoFormulario="tipoFormulario" :usuarioGestor="usuarioGestor"
        @emiteModal="actualizarCategoriaEnElemento" />
    </div>
        <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4">{{ categoria?.nombre }}</div>
        <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4">{{ props.content.descripcion }}</div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import RecursoModalComponent from './RecursoModalComponent.vue'
import RecursoService from '@/services/RecursoService'
const props = defineProps(['content', 'idCenad'])
const emits = defineEmits(['emiteElemento'])
const service = new RecursoService()
let categoria = ref()
let tipoFormulario = ref()
let usuarioGestor = ref()

onMounted(async () => {
   const responseCategoria = await service.getCategoria(props.content.idString)
   categoria.value = responseCategoria
   const responseTipoFormulario = await service.getTipoFormulario(props.content.idString)
   tipoFormulario.value = responseTipoFormulario
      const responseUsuarioGestor = await service.getUsuarioGestor(props.content.idString)
   usuarioGestor.value = responseUsuarioGestor
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
