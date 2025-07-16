<template>
  <!-- Llamada al modal -->
  <a data-bs-toggle="modal" :data-bs-target="'#' + idModal"><v-icon name="fa-edit" scale="1.5" /></a>
  <!-- Modal -->
  <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="modal-editar-unidad-Label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-unidad-Label">
            {{ $t('unidades.editarUnidad') }}{{ props.nombre }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="titulo"><b>NOMBRE DE LA UNIDAD<sup class="text-danger">*</sup></b></label>
              <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
            </div>
            <div class="mb-3">
              <label class="titulo"><b>DIRECCIÓN<sup class="text-danger">*</sup></b></label>
              <input type="text" class="form-control letra" id="direccion" v-model="direccion" />
            </div>
            <div class="mb-3">
              <label class="titulo"><b>TELÉFONO<sup class="text-danger">*</sup></b></label>
              <input type="text" class="form-control letra" id="tfno" v-model="tfno" />
            </div>
            <div class="mb-3">
              <label class="titulo"><b>EMAIL<sup class="text-danger">*</sup></b></label>
              <input type="email" class="form-control letra" id="email" v-model="email" />
            </div>
            <div class="mb-3">
              <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
              <input type="textarea" class="form-control letra" id="descripcion" v-model="descripcion" />
            </div>
            <div class="mb-3">
              <label class="titulo"><b>POC<sup class="text-danger">*</sup></b></label>
              <input type="text" class="form-control letra" id="poc" v-model="poc" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button class="btn btn-danger" :data-bs-target="'#' + idModalEliminar" data-bs-toggle="modal">
            {{ $t('unidades.borrarUnidad') }}
          </button>
          <button type="button" @click="editarUnidad" data-bs-dismiss="modal" class="btn btn-success">
            {{ $t('unidades.guardarUnidad') }}
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
            {{ $t('unidades.eliminarUnidad') }}{{ nombre }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">{{ $t('unidades.preguntaEliminar') }}{{ nombre }}?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button type="button" @click="borrarUnidad" data-bs-dismiss="modal" class="btn btn-danger">
            {{ $t('comun.borrar') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import UnidadService from '@/services/UnidadService'
import { ref } from 'vue'

const props = defineProps(['nombre', 'descripcion', 'email', 'tfno', 'direccion', 'poc', 'idUnidad'])
const emits = defineEmits(['emiteModal'])
const nombre = ref(props.nombre)
const descripcion = ref(props.tipoTiro)
const email = ref(props.email)
const tfno = ref(props.tfno)
const direccion = ref(props.direccion)
const poc = ref(props.poc)
const idUnidad = ref(props.idUnidad)
const idModal = 'modal-unidad-' + props.idUnidad
const idModalEliminar = 'modal-unidad-eliminar' + props.idUnidad
const service = new UnidadService()

const editarUnidad = async () => {
  await service.editarUnidad(nombre.value, descripcion.value, email.value, tfno.value, direccion.value, poc.value, idUnidad.value)
  emits('emiteModal');
}
const borrarUnidad = async () => {
  await service.deleteUnidad(idUnidad.value)
  emits('emiteModal')
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
