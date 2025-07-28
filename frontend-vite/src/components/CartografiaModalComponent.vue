<template>
  <!-- Llamada al modal -->
  <a data-bs-toggle="modal" :data-bs-target="'#' + idModal"><v-icon name="fa-edit" scale="1.5" /></a>
  <!-- Modal -->
  <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="modal-editar-cartografia-Label"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-cartografia-Label">
            {{ $t('cartografias.editarCartografia') }}{{ props.nombre }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="titulo"><b>NOMBRE DE LA CARTOGRAFÍA<sup class="text-danger">*</sup></b></label>
              <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
            </div>
            <div class="mb-3">
              <label class="titulo"><b>ESCALA<sup class="text-danger">*</sup></b></label>
              <select class="form-select" aria-label="escala" v-model="escala">
                <option v-for="(escala, index) in escalas" :key="index" :value="escala">
                  {{ escala }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
              <textarea class="form-control letra" id="descripcion" v-model="descripcion"></textarea>
            </div>
            <div class="mb-3">
              <label class="titulo"><b>ARCHIVO<sup class="text-danger mr-2">*</sup></b> (Tamaño máximo permitido: {{
                sizeMaxCartografia }} GB)</label>
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
                <div v-if="archivoNormativa" class="mt-2 ms-2">
                  <small>Archivo seleccionado: {{ archivoNormativa.name }}</small>
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
            {{ $t('cartografias.borrarCartografia') }}
          </button>
          <button type="button" @click="editarCartografia" data-bs-dismiss="modal" class="btn btn-success"
            :disabled="!formularioValidado">
            {{ $t('cartografias.guardarCartografia') }}
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
            {{ $t('cartografias.eliminarCartografia') }}{{ nombre }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">{{ $t('cartografias.preguntaEliminar') }}{{ nombre }}?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button type="button" @click="borrarCartografia" data-bs-dismiss="modal" class="btn btn-danger">
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
import CartografiaService from '@/services/CartografiaService'

const props = defineProps(['nombre', 'descripcion', 'nombreArchivo', 'escala', 'idCartografia', 'idCenad'])
const emits = defineEmits(['emiteModal'])
const utils = useUtilsStore()

let sizeMaxCartografia = ref(utils.sizeMaxCartografia)
let escalas = utils.escalasCartografia

const descripcion = ref(props.descripcion || '')
const nombre = ref(props.nombre || '')
const escala = ref(props.escala || '')
const idCartografia = ref(props.idCartografia)
const idCenad = ref(props.idCenad)
const idModal = 'modal-cartografia-' + props.idCartografia
const idModalEliminar = 'modal-cartografia-eliminar' + props.idCartografia
const inputFile = ref(null)
const service = new CartografiaService()

const archivoCartografia = ref(null)
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
  archivoCartografia.value = event.target.files[0]
}
onMounted(async () => {
  if (archivoActual.value) {
    try {
      urlArchivoActual.value = await service.fetchArchivoCartografia(archivoActual.value, idCenad.value)
    } catch (error) {
      console.error('Error cargando archivo:', error)
      urlArchivoActual.value = '' // para evitar mostrar URL rota
    }
  } else {
    urlArchivoActual.value = ''
  }
})

const editarCartografia = async () => {
  const success = await service.editarCartografia(
    nombre.value,
    descripcion.value,
    escala.value,
    archivoCartografia.value,
    archivoActual.value,
    idCenad.value,
    idCartografia.value
  );
  console.log(success)
  if (success) {
    // Actualizar el archivoActual con el nombre real subido
    archivoActual.value = success; // Asumiendo que editarNormativa retorna el nombreArchivo

    // Volver a cargar la URL del archivo actualizado 
    try {
      urlArchivoActual.value = await service.fetchArchivoCartografia(archivoActual.value, idCenad.value)
    } catch (e) {
      urlArchivoActual.value = ''
    }
    archivoCartografia.value = null;
  }
  emits('emiteModal');
}
const borrarCartografia = async () => {
  await service.deleteCartografia(archivoActual.value, idCartografia.value, idCenad.value)
  emits('emiteModal')
}
// Validación: todos los campos deben estar llenos

const formularioValidado = computed(() => {
  if (!nombre.value || !descripcion.value || !escala.value) return false;
  return nombre.value.trim() != '' && descripcion.value.trim() != '' && escala.value != ''
})
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
