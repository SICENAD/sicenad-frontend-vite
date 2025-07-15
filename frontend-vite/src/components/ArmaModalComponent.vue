<template>
  <!-- Llamada al modal -->
  <a data-bs-toggle="modal" :data-bs-target="'#' + idModal"><v-icon name="fa-edit" scale="1.5" /></a>
  <!-- Modal -->
  <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="modal-editar-arma-Label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-arma-Label">
            {{ $t('armas.editarArma') }}{{ props.nombre }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="titulo"><b>NOMBRE DEL ARMA<sup class="text-danger">*</sup></b></label>
              <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
            </div>
            <div class="mb-3">
              <label class="titulo me-2"><b>TIPO DE TIRO<sup class="text-danger">*</sup></b></label>
              <select class="form-select" aria-label="tipoTiro" v-model="tipoTiro">
                <option v-for="(tipoTiro, index) in tiposTiro" :key="index" :value="tipoTiro">
                  {{ tipoTiro }}
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
            {{ $t('armas.borrarArma') }}
          </button>
          <button type="button" @click="editarArma" data-bs-dismiss="modal" class="btn btn-success">
            {{ $t('armas.guardarArma') }}
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
            {{ $t('armas.eliminarArma') }}{{ nombre }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">{{ $t('armas.preguntaEliminar') }}{{ nombre }}?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button type="button" @click="borrarArma" data-bs-dismiss="modal" class="btn btn-danger">
            {{ $t('comun.borrar') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import useUtilsStore from '@/stores/utils'
import ArmaService from '@/services/ArmaService'

const props = defineProps(['nombre', 'tipoTiro', 'idArma'])
const emits = defineEmits(['emiteModal'])
const utils = useUtilsStore()

const tiposTiro = utils.tiposTiro
const tipoTiro = ref(props.tipoTiro)
const nombre = ref(props.nombre)
const idArma = ref(props.idArma)
const idModal = 'modal-arma-' + props.idArma
const idModalEliminar = 'modal-arma-eliminar' + props.idArma
const service = new ArmaService()

const editarArma = async () => {
  await service.editarArma(
    nombre.value,
    tipoTiro.value,
    idArma.value
  );
  emits('emiteModal');
}



const borrarArma = async () => {
  await service.deleteArma(idArma.value)
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
