<template>
  <!-- Llamada al modal -->
  <a data-bs-toggle="modal" :data-bs-target="'#' + idModal"><v-icon name="fa-edit" scale="1.5" /></a>
  <!-- Modal -->
  <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="modal-editar-categoria-Label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-categoria-Label">
            {{ $t('categorias.editarCategoria') }}{{ props.nombre }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="titulo"><b>NOMBRE DE LA CATEGORÍA<sup class="text-danger">*</sup></b></label>
              <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
            </div>


            <div class="mb-3">
              <label class="titulo"><b>CATEGORÍA PADRE<sup class="text-danger">*</sup></b></label>
              <input type="text" class="form-control letra" id="nombre" v-model="categoriaPadre" />
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
            {{ $t('categorias.borrarCategoria') }}
          </button>
          <button type="button" @click="editarCategoria" data-bs-dismiss="modal" class="btn btn-success">
            {{ $t('categorias.guardarCategoria') }}
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
            {{ $t('categorias.eliminarCategoria') }}{{ nombre }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">{{ $t('categorias.preguntaEliminar') }}{{ nombre }}?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button type="button" @click="borrarCategoria" data-bs-dismiss="modal" class="btn btn-danger">
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
import CategoriaService from '@/services/CategoriaService'

const props = defineProps(['nombre', 'categoriaPadre', 'descripcion', 'idCategoria', 'idCenad'])
const emits = defineEmits(['emiteModal'])
const utils = useUtilsStore()

const descripcion = ref(props.descripcion)
const nombre = ref(props.nombre)
const idCategoria = ref(props.idCategoria)
categoriaPadre = ref(props.categoriaPadre)
const idCenad = ref(props.idCenad)
const idModal = 'modal-categoria-' + props.idCategoria
const idModalEliminar = 'modal-categoria-eliminar' + props.idCategoria
const service = new CategoriaService()

const editarCategoria = async () => {
  const success = await service.editarCategoria(
    nombre.value,
    descripcion.value,
    categoriaPadre.value,
    idCategoria.value
  );
  emits('emiteModal');
}
const borrarCategoria = async () => {
  await service.deleteCategoria(idCategoria.value, idCenad.value)
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
