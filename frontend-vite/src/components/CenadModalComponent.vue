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
              <label class="titulo"><b>ESCUDO<sup class="text-danger mr-2">*</sup></b> (Tamaño máximo permitido: {{
                sizeMaxEscudo }} MB)</label>

              <!-- Mostrar escudo actual si existe -->
              <div v-if="escudoActual" class="mb-2">
                <p>Archivo actual: {{ escudoActual }}</p>
                <img :src="urlEscudoActual" alt="Escudo actual" style="max-height: 100px;" class="img-thumbnail" />
              </div>
              <p v-else class="text-muted">No hay ningún escudo cargado</p>

              <div class="d-flex">
                <!-- Botón personalizado para seleccionar archivo -->
                <label class="btn">
                  Seleccionar archivo
                  <input type="file" accept="image/*" @change="onFileChange" ref="inputFile" hidden />
                </label>
                <!-- Nombre del archivo seleccionado -->
                <div v-if="archivoEscudo" class="mt-2 ms-2">
                  <small>Archivo seleccionado: {{ archivoEscudo.name }}</small>
                </div>
              </div>
              <!-- Mostrar preview si se selecciona archivo nuevo -->
              <div v-if="archivoEscudo" class="mb-2 mt-2">
                <img :src="previewEscudo" alt="Preview escudo" style="max-height: 100px;" class="img-thumbnail" />
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
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
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import CenadService from '@/services/CenadService'
import useUtilsStore from '@/stores/utils'

const props = defineProps(['nombre', 'provincia', 'direccion', 'tfno', 'email', 'descripcion', 'escudo', 'idCenad'])
const emits = defineEmits(['emiteModal'])
const utils = useUtilsStore()

const provincias = utils.provincias
const provincia = ref(props.provincia)
const nombre = ref(props.nombre)
const direccion = ref(props.direccion)
const tfno = ref(props.tfno)
const email = ref(props.email)
const descripcion = ref(props.descripcion)
const idCenad = ref(props.idCenad)
const idModal = 'modal-cenad-' + props.idCenad
const idModalEliminar = 'modal-cenad-eliminar' + props.idCenad
const inputFile = ref(null)
const service = new CenadService()

const archivoEscudo = ref(null)
const escudoActual = ref(props.escudo)

// URL base para cargar imágenes de escudo (ajusta según tu servidor)
//const urlBaseEscudos = `${utils.urlApi}/files/escudos/`

// Computed para URL del escudo actual
//const urlEscudoActual = computed(() => {
//  return escudoActual.value ? urlBaseEscudos + escudoActual.value : ''
//})
const urlEscudoActual = ref('')

onMounted(async () => {
  if (escudoActual.value) {
    try {
      urlEscudoActual.value = await service.fetchEscudo(escudoActual.value)
    } catch (error) {
      console.error('Error cargando escudo:', error)
      urlEscudoActual.value = '' // para evitar mostrar URL rota
    }
  } else {
    urlEscudoActual.value = ''
  }
})


// Para preview de archivo seleccionado nuevo
const previewEscudo = ref('')

// Cuando cambie archivoEscudo, creamos preview con FileReader
watch(archivoEscudo, (newFile) => {
  if (!newFile) {
    previewEscudo.value = ''
    return
  }
  const reader = new FileReader()
  reader.onload = e => {
    previewEscudo.value = e.target.result
  }
  reader.readAsDataURL(newFile)
})

// Variable para guardar la URL creada y poder revocarla
let currentObjectURL = ''

// Cuando cambie urlEscudoActual, revocamos la anterior para evitar fuga de memoria
watch(urlEscudoActual, (newUrl, oldUrl) => {
  if (oldUrl) URL.revokeObjectURL(oldUrl)  // revoca la URL vieja
  currentObjectURL = newUrl                 // guardamos la nueva
})

// Liberamos la URL cuando el componente se desmonta
onBeforeUnmount(() => {
  if (currentObjectURL) URL.revokeObjectURL(currentObjectURL)
})


function onFileChange(event) {
  archivoEscudo.value = event.target.files[0]
}

const editarCenad = async () => {
  const success = await service.editarCenad(
    nombre.value,
    provincia.value,
    direccion.value,
    tfno.value,
    email.value,
    descripcion.value,
    archivoEscudo.value,  // archivo nuevo o null
    escudoActual.value,   // nombre actual del escudo en la base
    idCenad.value
  );

  if (success) {
    // Actualizar el escudoActual con el nombre real subido
    escudoActual.value = success; // Asumiendo que editarCenad retorna el nombreArchivo

    // Volver a cargar la URL del escudo actualizado para mostrar preview
    try {
      urlEscudoActual.value = await service.fetchEscudo(escudoActual.value)
    } catch (e) {
      urlEscudoActual.value = ''
    }
    archivoEscudo.value = null;
    previewEscudo.value = '';
  }
  emits('emiteModal');
}



const borrarCenad = async () => {
  await service.deleteCenad(idCenad.value)
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
