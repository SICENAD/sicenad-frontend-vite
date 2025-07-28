<template>
  <hr class='w-100'>
  <div class="row">
    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
      {{ props.content.nombre }}
      <FicheroModalComponent :nombreArchivo="props.content.nombreArchivo" :nombre="props.content.nombre"
        :idFichero="props.content.idString" :descripcion="props.content.descripcion" :idCenad="props.idCenad" :idRecurso="props.idRecurso" :categoriaFichero="categoriaFichero"
        @emiteModal="actualizarFicheroEnElemento" />
    </div>
    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3" v-if="categoriaFichero">{{ categoriaFichero.nombre }}</div>
    <div class="col-10 col-sm-10 col-md-5 col-lg-5 col-xl-5">{{ props.content.descripcion }}</div>
    <div class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center"><a :href="linkDescarga"
        :download="props.content.nombreArchivo"><v-icon name="fa-download"></v-icon></a></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import useAuthStore from '@/stores/auth'
import FicheroService from '@/services/FicheroService'
import FicheroModalComponent from './FicheroModalComponent.vue'
import CategoriaFicheroService from '@/services/CategoriaFicheroService'
const props = defineProps(['content', 'idCenad', 'idRecurso'])
const emits = defineEmits(['emiteElemento'])
const auth = useAuthStore()
let linkDescarga = ref('')
const service = new FicheroService()
const categoriaFicheroService = new CategoriaFicheroService()
let idGestor = ref('')
const isGestorEsteRecurso = ref(false)
const categoriaFichero = ref()
onMounted(async () => {
categoriaFichero.value = await categoriaFicheroService.fetchCategoriaFicheroDeFichero(props.content.idString)
    let gestor = await usuarioService.fetchUsuarioGestorDeRecurso(idRecurso.value)
    idGestor.value = gestor.idString
    if (idGestor.value == auth.usuario.idString) {
        isGestorEsteRecurso.value = true
    } else {
        isGestorEsteRecurso.value = false
    }  linkDescarga.value = await service.fetchArchivoFichero(props.content.nombreArchivo, props.idCenad, props.idRecurso)
})
function actualizarFicheroEnElemento() {
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
