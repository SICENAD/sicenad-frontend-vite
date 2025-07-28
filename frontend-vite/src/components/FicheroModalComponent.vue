<template>
  <!-- Llamada al modal -->
  <a data-bs-toggle="modal" :data-bs-target="'#' + idModal"><v-icon name="fa-edit" scale="1.5" /></a>
  <!-- Modal -->
  <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="modal-editar-fichero-Label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-fichero-Label">
            {{ $t('ficheros.editarFichero') }}{{ props.nombre }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="titulo"><b>NOMBRE DEL FICHERO<sup class="text-danger">*</sup></b></label>
              <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
            </div>
            <div class="mb-3">
              <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
              <textarea class="form-control letra" id="descripcion" v-model="descripcion"></textarea>
            </div>
            <div class="mb-3">
              <label class="titulo"><b>ARCHIVO<sup class="text-danger mr-2">*</sup></b> (Tamaño máximo permitido: {{
                sizeMaxDocRecurso }} MB)</label>
              <!-- Mostrar archivo actual si existe -->
              <div v-if="archivoActual" class="mb-2">
                <p>Archivo actual: {{ archivoActual }}</p>
              </div>
              <p v-else class="text-muted">No hay ningún archivo cargado</p>

              <div class="d-flex">
                <!-- Botón personalizado para seleccionar archivo -->
                <label class="btn">
                  Seleccionar archivo
                  <input type="file" accept="*" @change="onFileChange" ref="inputFile" hidden />
                </label>
                <!-- Nombre del archivo seleccionado -->
                <div v-if="archivoFichero" class="mt-2 ms-2">
                  <small>Archivo seleccionado: {{ archivoFichero.name }}</small>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button class="btn btn-danger" :data-bs-target="'#' + idModalEliminar" data-bs-toggle="modal">
            {{ $t('ficheros.borrarFichero') }}
          </button>
          <button type="button" @click="editarFichero" data-bs-dismiss="modal" class="btn btn-success" :disabled="!formularioValidado">
            {{ $t('ficheros.guardarFichero') }}
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
            {{ $t('ficheros.eliminarFichero') }}{{ nombre }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">{{ $t('ficheros.preguntaEliminar') }}{{ nombre }}?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button type="button" @click="borrarArchivo" data-bs-dismiss="modal" class="btn btn-danger">
            {{ $t('comun.borrar') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import useUtilsStore from '@/stores/utils'
import FicheroService from '@/services/FicheroService'

const props = defineProps(['nombre', 'nombreArchivo', 'descripcion', 'idFichero', 'idCenad', 'idRecurso', 'categoriaFichero'])
const emits = defineEmits(['emiteModal'])
const utils = useUtilsStore()

let sizeMaxDocRecurso = ref(utils.sizeMaxDocRecurso)
const descripcion = ref(props.descripcion || '');
const nombre = ref(props.nombre || '');
const idFichero = ref(props.idFichero)
const idCenad = ref(props.idCenad)
const idRecurso = ref(props.idRecurso)
console.log(props)
const idCategoriaFichero = ref(props.categoriaFichero?.idString || '');
const idModal = 'modal-fichero-' + props.idFichero
const idModalEliminar = 'modal-fichero-eliminar' + props.idFichero
const inputFile = ref(null)
const service = new FicheroService()

const archivoFichero = ref(null)
const archivoActual = ref(props.nombreArchivo)

const urlArchivoActual = ref('')

// Variable para guardar la URL creada y poder revocarla
let currentObjectURL = ''

// Cuando cambie urlEscudoActual, revocamos la anterior para evitar fuga de memoria
watch(urlArchivoActual, (newUrl, oldUrl) => {
  if (oldUrl) URL.revokeObjectURL(oldUrl)  // revoca la URL vieja
  currentObjectURL = newUrl                 // guardamos la nueva
})

// Liberamos la URL cuando el componente se desmonta
onBeforeUnmount(() => {
  if (currentObjectURL) URL.revokeObjectURL(currentObjectURL)
})

function onFileChange(event) {
  archivoFichero.value = event.target.files[0]
}
onMounted(async () => {
  if (archivoActual.value) {
    try {
      urlArchivoActual.value = await service.fetchArchivoFichero(archivoActual.value, idCenad.value, idRecurso.value)
    } catch (error) {
      console.error('Error cargando archivo:', error)
      urlArchivoActual.value = '' // para evitar mostrar URL rota
    }
  } else {
    urlArchivoActual.value = ''
  }
})

const editarFichero = async () => {
 const success = await service.editarFichero(
    nombre.value,
    descripcion.value,
    archivoFichero.value,
    archivoActual.value,
    idCenad.value,
    idRecurso.value,
    idCategoriaFichero.value,
    idFichero.value
  );
  if (success) {
    // Actualizar el archivoActual con el nombre real subido
    archivoActual.value = success; // Asumiendo que editarFichero retorna el nombreArchivo

    // Volver a cargar la URL del archivo actualizado 
    try {
      urlArchivoActual.value = await service.fetchArchivoFichero(archivoActual.value, idCenad.value, idRecurso.value)
    } catch (e) {
      urlArchivoActual.value = ''
    }
    archivoFichero.value = null;
  }
  emits('emiteModal');
}
const borrarArchivo = async () => {
  await service.deleteFichero(archivoActual.value, idFichero.value, idCenad.value, idRecurso.value)
  emits('emiteModal')
}
// Validación: todos los campos deben estar llenos
const formularioValidado = computed(() => {
    return (
        nombre.value.trim() != '' &&
        descripcion.value.trim() != '' &&
        idCategoriaFichero.value != ''
    )
});
</script>
<style scoped lang="scss">
div,
div a {
  color: #A3B18A;
  font-weight: bold;
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
