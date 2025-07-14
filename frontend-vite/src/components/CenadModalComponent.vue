<template>
  <!-- Llamada al modal -->
  <a data-bs-toggle="modal" :data-bs-target="'#' + idModal"><v-icon name="fa-edit" scale="1.5" /></a>
  <!-- Modal -->
  <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="modal-editar-cenad-Label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-cenad-Label">
            {{ $t('cenads.editarCenad') }}{{ props.idCenad }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="titulo"><b>CENAD/CMT<sup class="text-danger">*</sup></b></label>
              <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
            </div>
            <div class="mb-3">
              <label class="titulo me-2"><b>PROVINCIA<sup class="text-danger">*</sup></b></label>
              <select class="form-select" aria-label="provincia" v-model="provincia">
                <option v-for="provincia in provincias" :key="provincia.idProvincia" :value="provincia.idProvincia">
                  {{ provincia.nombre }}
                </option>
              </select>
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
              <label class="titulo"><b>EMAIL</b></label>
              <input type="email" class="form-control letra" id="email" v-model="email" />
            </div>
            <div class="mb-3">
              <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
              <input type="textarea" class="form-control letra" id="descripcion" v-model="descripcion" />
            </div>
            <div class="mb-3">
              <label class="titulo"><b>ESCUDO<sup class="text-danger mr-2">*</sup></b> (Tamaño máximo
                permitido: {{ sizeMaxEscudo }} MB)</label>
              <input type="file" class="form-control" @click="cargarArchivo" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <!-- Llamada al modal para eliminar-->
          <button class="btn btn-danger" :data-bs-target="'#' + idModalEliminar" data-bs-toggle="modal">
            {{ $t('cenads.borrarCenad') }}
          </button>
          <button type="button" @click="editarCenad" data-bs-dismiss="modal" class="btn btn-success">
            {{ $t('cenads.guardarCenad') }}
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
            {{ $t('cenads.eliminarCenad') }}{{ idCenad }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">{{ $t('cenads.preguntaEliminar') }}{{ nombre }}?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button type="button" @click="borrarCenad" data-bs-dismiss="modal" class="btn btn-danger">
            {{ $t('comun.borrar') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import CenadService from '@/services/CenadService'
import useUtilsStore from '@/stores/utils'
const props = defineProps(['nombre', 'provincia', 'direccion', 'tfno', 'email', 'descripcion', 'escudo', 'idCenad'])
const emits = defineEmits(['emiteModal'])
const utils = useUtilsStore()
const provincias = utils.provincias
let provincia = ref(props.provincia)
let nombre = ref(props.nombre)
let direccion = ref(props.direccion)
let tfno = ref(props.tfno)
let email = ref(props.email)
let descripcion = ref(props.descripcion)
let escudo = ref(props.escudo)
let idCenad = ref(props.idCenad)
let idModal = 'modal-cenad-' + props.idCenad
let idModalEliminar = 'modal-cenad-eliminar' + props.idCenad
const service = new CenadService()
const editarCenad = async () => {
  await service.editarCenad(nombre.value, provincia.value, direccion.value, tfno.value, email.value, descripcion.value, escudo.value, idCenad.value)
  emits('emiteModal')
}
const borrarCenad = async () => {
  await service.deleteCenad(idCenad.value)
  emits('emiteModal')
}
</script>
<style scoped lang="scss">
div, div a {
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
</style>
