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
import TipoFormularioService from '@/services/TipoFormularioService'
import CategoriaService from '@/services/CategoriaService'
import UsuarioService from '@/services/UsuarioService'
const props = defineProps(['content', 'idCenad'])
const emits = defineEmits(['emiteElemento'])
const tipoFormularioService = new TipoFormularioService()
const categoriaService = new CategoriaService()
const usuarioService = new UsuarioService()
let categoria = ref()
let tipoFormulario = ref()
let usuarioGestor = ref()

onMounted(async () => {
   const responseCategoria = await categoriaService.fetchCategoriaDeRecurso(props.content.idString)
   categoria.value = responseCategoria
   const responseTipoFormulario = await tipoFormularioService.fetchTipoFormularioDeRecurso(props.content.idString)
   tipoFormulario.value = responseTipoFormulario
      const responseUsuarioGestor = await usuarioService.fetchUsuarioGestorDeRecurso(props.content.idString)
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
