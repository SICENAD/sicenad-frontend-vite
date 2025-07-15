<template>
  <!-- Llamada al modal -->
  <a data-bs-toggle="modal" :data-bs-target="'#' + idModal"><v-icon name="fa-edit" scale="1.5" /></a>
  <!-- Modal -->
  <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="modal-editar-categoriaFichero-Label"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-categoriaFichero-Label">
            {{ $t('categoriasFichero.editarCategoriaFichero') }}{{ props.nombre }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="titulo"><b>NOMBRE DE LA CATEGORÍA DE FICHERO<sup class="text-danger">*</sup></b></label>
              <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
            </div>
            <div class="mb-3">
              <label class="titulo me-2"><b>TIPO<sup class="text-danger">*</sup></b></label>
              <select class="form-select letra" aria-label="tipo" v-model="tipo">
                <option disabled value="">{{ $t('categoriasFichero.selectTipo') }}</option>
                <option value=0>Imágenes</option>
                <option value=1>Otros archivos</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
              <input type="textarea" class="form-control letra" id="descripcion" v-model="descripcion" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button class="btn btn-danger" :data-bs-target="'#' + idModalEliminar" data-bs-toggle="modal">
            {{ $t('categoriasFichero.borrarCategoriaFichero') }}
          </button>
          <button type="button" @click="editarCategoriaFichero" data-bs-dismiss="modal" class="btn btn-success">
            {{ $t('categoriasFichero.guardarCategoriaFichero') }}
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
            {{ $t('categoriasFichero.eliminarCategoriaFichero') }}{{ nombre }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">{{ $t('categoriasFichero.preguntaEliminar') }}{{ nombre }}?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button type="button" @click="borrarCategoriaFichero" data-bs-dismiss="modal" class="btn btn-danger">
            {{ $t('comun.borrar') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import useUtilsStore from '@/stores/utils'
import CategoriaFicheroService from '@/services/CategoriaFicheroService'

const props = defineProps(['nombre', 'tipo', 'descripcion', 'idCategoriaFichero'])
const emits = defineEmits(['emiteModal'])
const utils = useUtilsStore()
const tipo = ref(props.tipo)
const descripcion = ref(props.descripcion)
const nombre = ref(props.nombre)
const idCategoriaFichero = ref(props.idCategoriaFichero)
const idModal = 'modal-categoriaFichero-' + props.idCategoriaFichero
const idModalEliminar = 'modal-categoriaFichero-eliminar' + props.idCategoriaFichero
const service = new CategoriaFicheroService()

const editarCategoriaFichero = async () => {
  await service.editarCategoriaFichero(
    nombre.value,
    tipo.value,
    descripcion.value,
    idCategoriaFichero.value
  );
  emits('emiteModal');
}
const borrarCategoriaFichero = async () => {
  await service.deleteCategoriaFichero(idCategoriaFichero.value)
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
