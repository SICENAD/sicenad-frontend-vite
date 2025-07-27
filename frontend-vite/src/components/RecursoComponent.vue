<template>
  <hr class='w-100'>
  <div class="row">
    <div class="col-10 col-sm-10 col-md-5 col-lg-5 col-xl-5 d-flex">
      <router-link class="nav-link me-2" :to="{ name: 'recurso', params: { id: idCenad, idRecurso: props.content.idString } }" v-if="!isAdminEsteCenad">
        <v-icon scale="1.5" name="fa-eye" />
      </router-link>
      <p class="me-2">{{ props.content.nombre }}</p>
      <RecursoModalComponent :nombre="props.content.nombre" :idRecurso="props.content.idString"
        :otros="props.content.otros" :descripcion="props.content.descripcion" :categoria="categoria"
        :idCenad="props.idCenad" :tipoFormulario="tipoFormulario" :usuarioGestor="usuarioGestor"
        @emiteModal="actualizarCategoriaEnElemento" v-if="isAdminEsteCenad" />
    </div>
    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">{{ categoria?.nombre }}</div>
    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4">{{ props.content.descripcion }}</div>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue'
import RecursoModalComponent from './RecursoModalComponent.vue'
import TipoFormularioService from '@/services/TipoFormularioService'
import CategoriaService from '@/services/CategoriaService'
import UsuarioService from '@/services/UsuarioService'
import useAuthStore from '@/stores/auth'
import { useRoute } from 'vue-router'
const props = defineProps(['content', 'idCenad'])
const emits = defineEmits(['emiteElemento'])
const auth = useAuthStore()
const route =useRoute()
const idCenad = computed(() => route.params.id)
const isAdminEsteCenad = ref(false)
const tipoFormularioService = new TipoFormularioService()
const categoriaService = new CategoriaService()
const usuarioService = new UsuarioService()
let categoria = ref()
let tipoFormulario = ref()
let usuarioGestor = ref()

onMounted(async () => {
  auth.rol == 'Administrador' && (isAdminEsteCenad.value = idCenad.value == auth.cenad.idString)
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
