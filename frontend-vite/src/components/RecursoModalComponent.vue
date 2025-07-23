<template>
  <!-- Llamada al modal -->
  <a data-bs-toggle="modal" :data-bs-target="'#' + idModal"><v-icon name="fa-edit" scale="1.5" /></a>
  <!-- Modal -->
  <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="modal-editar-recurso-Label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-recurso-Label">
            {{ $t('recursos.editarRecurso') }}{{ props.nombre }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="titulo"><b>NOMBRE DEL RECURSO<sup class="text-danger">*</sup></b></label>
              <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
            </div>
            <div class="mb-3">
              <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
              <input type="textarea" class="form-control letra" id="descripcion" v-model="descripcion" />
            </div>
            <div class="mb-3">
              <label class="titulo"><b>OTROS<sup class="text-danger">*</sup></b></label>
              <input type="textarea" class="form-control letra" id="otros" v-model="otros" />
            </div>
            <div class="mb-3">
              <label class="titulo"><b>CATEGORÍA<sup class="text-danger">*</sup></b></label>
              <select class="form-select" aria-label="categoria" v-model="idCategoria">
                <option disabled value="">Selecciona la Categoría</option>
                <option v-for="categoria in categorias" :key="categoria.idString" :value="categoria.idString">
                  {{ categoria.nombre }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="titulo"><b>TIPO DE FORMULARIO<sup class="text-danger">*</sup></b></label>
              <select class="form-select" aria-label="tipoFormulario" v-model="idTipoFormulario">
                <option disabled value="">Selecciona el Tipo de formulario</option>
                <option v-for="tipoFormulario in tiposFormulario" :key="tipoFormulario.idString"
                  :value="tipoFormulario.idString">
                  {{ tipoFormulario.nombre }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="titulo"><b>USUARIO GESTOR<sup class="text-danger">*</sup></b></label>
              <select class="form-select" aria-label="usuarioGestor" v-model="idUsuarioGestor">
                <option disabled value="">Selecciona el Gestor del recurso</option>
                <option v-for="usuarioGestor in usuariosGestor" :key="usuarioGestor.idString"
                  :value="usuarioGestor.idString">
                  {{ usuarioGestor.username }}
                </option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button class="btn btn-danger" :data-bs-target="'#' + idModalEliminar" data-bs-toggle="modal">
            {{ $t('recursos.borrarRecursos') }}
          </button>
          <button type="button" @click="editarRecurso" data-bs-dismiss="modal" class="btn btn-success">
            {{ $t('recursos.guardarRecurso') }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal para eliminar-->
  <div class="modal fade" :id="idModalEliminar" aria-hidden="true" aria-labelledby="confirmaEliminar-Label"
    tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="confirmaEliminar-Label">
            {{ $t('recursos.eliminarCategoria') }}{{ nombre }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">{{ $t('recursos.preguntaEliminar') }}{{ nombre }}?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button type="button" @click="borrarRecurso" data-bs-dismiss="modal" class="btn btn-danger">
            {{ $t('comun.borrar') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import CategoriaService from '@/services/CategoriaService'
import RecursoService from '@/services/RecursoService'
import TipoFormularioService from '@/services/TipoFormularioService'
import UsuarioService from '@/services/UsuarioService'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps(['nombre', 'categoria', 'tipoFormulario', 'usuarioGestor', 'descripcion', 'otros', 'idRecurso'])
const emits = defineEmits(['emiteModal'])
const route = useRoute()
const idCenad = computed(() => route.params.id)

const descripcion = ref(props.descripcion)
const nombre = ref(props.nombre)
const otros = ref(props.otros)
const idRecurso = ref(props.idRecurso)
const idCategoria = ref(props.categoria?.idString || '')
const idTipoFormulario = ref(props.tipoFormulario?.idString || '')
const idUsuarioGestor = ref(props.usuarioGestor?.idString || '')
const idModal = 'modal-categoria-' + props.idRecurso
const idModalEliminar = 'modal-categoria-eliminar' + props.idRecurso
const service = new RecursoService()
const categoriaService = new CategoriaService()
const tipoFormularioService = new TipoFormularioService()
const usuarioService = new UsuarioService()
const categorias = categoriaService.getCategorias()
const tiposFormulario = tipoFormularioService.getTiposFormulario()
const usuariosGestor = usuarioService.getUsuariosGestor()

const editarRecurso = async () => {
  await service.editarRecurso(
    nombre.value,
    descripcion.value,
    otros.value,
    idTipoFormulario.value,
    idCategoria.value,
    idUsuarioGestor.value,
    idRecurso.value
  );
  emits('emiteModal');
}
const borrarRecurso = async () => {
  await service.deleteRecurso(idRecurso.value)
  emits('emiteModal')
}
onMounted(async () => {
  await getCategorias()
  await getTiposFormulario()
  await getUsuariosGestor()
  idCategoria.value = props.categoria.idString
  idTipoFormulario.value = props.tipoFormulario.idString
  idUsuarioGestor.value = props.usuarioGestor.idString
})
const getCategorias = async () => {
  await categoriaService.fetchAll(idCenad.value)
}
const getTiposFormulario = async () => {
  await tipoFormularioService.fetchAll()
}
const getUsuariosGestor = async () => {
  await usuarioService.fetchUsuariosGestorDeCenad(idCenad.value)
}
</script>
<style scoped lang="scss">
div,
div a {
  color: #A3B18A;
  font-weight: bold;
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

.btn {
  background: #A3B18A;
  padding: 0.5;
  font-size: 14px;
  color: white;
}

.btn:hover {
  background-color: #588157;
  color: white;
  text-decoration: none;
}
</style>
