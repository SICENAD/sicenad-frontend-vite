<template>
    <!-- muestra la información del CENAD/CMT, con diferente vista segun este logueado como administrador de ese cenad o no -->
    <div class="container-fluid">
        <div class="row ms-0 pl-0 mb-0 pb-0">
            <RouterLink class="nav-link volver" :to="{ name: 'cenad-home', params: { id: idCenad } }">
                <v-icon name="fa-arrow-alt-circle-left" scale="2" class="me-2" /><strong>Volver</strong>
            </RouterLink>
            <hr class="w-100 mt-0 mb-1" />
        </div>
        <!-- este boton se deberá mostrar solo si eres el administrador del Cenad -->
        <div class="row  align-items-start mt-0 pt-0 ">
            <div class="col-3" v-if='isAdminEsteCenad'>
                <button class="btn text-white" @click='cambiaRol'>Cambiar a Vista {{ rol }}</button>
            </div>
        </div>
        <!--esta sera la vista del administrador-->
        <div v-if="rol != 'Administrador'">
            <form >
                <div class="row py-2">
                    <div class="col-lg-4 col-md-12">
                        <label class="titulo"><b>DIRECCIÓN<sup class="text-danger">*</sup></b></label>
                        <input type="text" class="form-control letra" v-model="direccion"
                            placeholder="Dirección del CENAD/CMT" name="direccion" required />
                    </div>
                    <div class="col-lg-4 col-md-12 pt-3">
                        <label class="titulo"><b>TELÉFONO<sup class="text-danger">*</sup></b></label>
                        <input type="tel" class="form-control letra" v-model="tfno"
                            placeholder="Teléfono de contacto del CENAD/CMT" name="telefono" required minlength="7"
                            maxlength="9" />
                    </div>
                    <div class="col-lg-4 col-md-12 pt-3">
                        <label class="titulo"><b>EMAIL</b></label>
                        <input type="email" class="form-control letra" v-model="email"
                            placeholder="Email de contacto del CENAD/CMT" name="email" />
                    </div>
                    <div class="col-lg-6 col-md-12 pt-3">
                        <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
                        <textarea class="form-control letra" v-model="descripcion"
                            placeholder="Descripción del CENAD/CMT" name="descripcion" required rows="5" cols="50">
                        </textarea>
                    </div>
                    <div class="col-lg-6 col-md-12 pt-3">
                        <label class="titulo"><b>COMO LLEGAR<sup class="text-danger mr-2">*</sup></b> (Tamaño máximo
                            permitido: {{ sizeMaxEscudo }} MB)</label>


                        <!-- Mostrar archivo actual si existe -->
                        <div v-if="infoCenadActual" class="mb-2">
                            <p>Archivo actual: {{ infoCenadActual }}</p>
                            <img :src="urlInfoCenadActual" alt="InfoCenad actual" style="max-height: 100px;"
                                class="img-thumbnail" />
                        </div>
                        <p v-else class="text-muted">No hay ningún archivo cargado</p>

                        <div class="d-flex">
                            <!-- Botón personalizado para seleccionar archivo -->
                            <label class="btn">
                                Seleccionar archivo
                                <input type="file" accept="image/*" @change="onFileChange" ref="inputFile" hidden />
                            </label>
                            <!-- Nombre del archivo seleccionado -->
                            <div v-if="archivoInfoCenad" class="mt-2 ms-2">
                                <small>Archivo seleccionado: {{ archivoInfoCenad.name }}</small>
                            </div>
                        </div>
                        <!-- Mostrar preview si se selecciona archivo nuevo -->
                        <div v-if="archivoInfoCenad" class="mb-2 mt-2">
                            <img :src="previewInfoCenad" alt="Preview infoCenad" style="max-height: 100px;"
                                class="img-thumbnail" />
                        </div>
                    </div>
                </div>
                <div class="form-row justify-content-between pt-3">
                    <div class="col-lg-5 col-md-12 mb-4">
                        <button type="button" @click="actualizar" data-bs-dismiss="modal" class="btn text-white">
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <!--esta sera la vista del usuario normal-->
        <div class="container-fluid" v-else>
            <div class="row">
                <div class="col col-md-6 escudo p-5" v-if="infoCenadActual != null && infoCenadActual != ''">
                    <img class="cenad" :alt="infoCenad" :src="pathImg"  />
                </div>
                <div class="col col-md-6 escudo p-5" v-else>
                    <img height="300" class="mx-auto d-block" alt="noInfoCenad" src="/img/noInfoCenad.png"  />
                </div>
                <div class="col col-md-6 informacion p-4 mt-5">
                    <div class="titulo">
                        <h4 class="text-center"><b>DIRECCIÓN</b></h4>
                        <hr>
                        <p class="texto">{{ direccion }}</p>
                    </div>
                    <div class="titulo">
                        <h4 class="text-center"><b>TELÉFONO</b></h4>
                        <hr>
                        <p class="texto">{{ tfno }}</p>
                    </div>
                    <div class="titulo">
                        <h4 class="text-center"><b>EMAIL</b></h4>
                        <hr>
                        <p class="texto">{{ email }}</p>
                    </div>
                    <div class="titulo">
                        <h4 class="text-center"><b>DESCRIPCIÓN</b></h4>
                        <hr>
                        <p class="texto">{{ descripcion }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import useAuthStore from '@/stores/auth'
import CenadService from '@/services/CenadService'
import useUtilsStore from '@/stores/utils'
const service = new CenadService()
const route = useRoute()
const auth = useAuthStore()
const utils = useUtilsStore()
const idCenad = computed(() => route.params.id)
let cenad = ref()
let direccion = ref('')
let tfno = ref('')
let email = ref('')
let descripcion = ref('')
let sizeMaxEscudo = ref(utils.sizeMaxEscudo)
const inputFile = ref(null)

const archivoInfoCenad = ref(null)
const infoCenadActual = ref(auth.cenadVisitado.infoCenad)
const urlInfoCenadActual = ref('')
const pathRelativo = ref('')
const pathImg = ref('')
pathRelativo.value = `${utils.urlApi}/files/${idCenad.value}/infoCenads`

const isAdminEsteCenad = ref(false)
const cambioBoton = ref(false)
const rol = ref('Administrador')
onMounted(async () => {
    await cargarCenad()
    if (idCenad.value == auth.cenad.idString && auth.rol == 'Administrador') {
        isAdminEsteCenad.value = true
    } else {
        isAdminEsteCenad.value = false
    }
    if (infoCenadActual.value) {
        try {
            urlInfoCenadActual.value = await service.fetchInfoCenad(infoCenadActual.value, idCenad.value)
        } catch (error) {
            console.error('Error cargando infoCenad:', error)
            urlInfoCenadActual.value = '' // para evitar mostrar URL rota
        }
    } else {
        urlInfoCenadActual.value = ''
    }
})
async function cargarCenad() {
    const response = await service.fetchCenad(idCenad.value)
    cenad.value = response
    direccion.value = cenad.value.direccion
    tfno.value = cenad.value.tfno
    email.value = cenad.value.email
    descripcion.value = cenad.value.descripcion 
    cenad.value.infoCenad != null && cenad.value.infoCenad != '' && (pathImg.value = await service.fetchInfoCenad(cenad.value.infoCenad, cenad.value.idString))
}
function cambiaRol() {
    if (cambioBoton.value) {
        cambioBoton.value = false
    } else {
        cambioBoton.value = true
    }
    rol.value = cambioBoton.value ? 'Previa' : 'Administrador'
}
// Para preview de archivo seleccionado nuevo
const previewInfoCenad = ref('')
// Cuando cambie archivoInfoCenad, creamos preview con FileReader
watch(archivoInfoCenad, (newFile) => {
    if (!newFile) {
        previewInfoCenad.value = ''
        return
    }
    const reader = new FileReader()
    reader.onload = e => {
        previewInfoCenad.value = e.target.result
    }
    reader.readAsDataURL(newFile)
})
// Variable para guardar la URL creada y poder revocarla
let currentObjectURL = ''

// Cuando cambie urlInfoCenadActual, revocamos la anterior para evitar fuga de memoria
watch(urlInfoCenadActual, (newUrl, oldUrl) => {
    if (oldUrl) URL.revokeObjectURL(oldUrl)  // revoca la URL vieja
    currentObjectURL = newUrl                 // guardamos la nueva
})
// Liberamos la URL cuando el componente se desmonta
onBeforeUnmount(() => {
    if (currentObjectURL) URL.revokeObjectURL(currentObjectURL)
})
function onFileChange(event) {
    archivoInfoCenad.value = event.target.files[0]
}
const actualizar = async () => {
    const success = await service.editarInfoCenad(
        direccion.value,
        tfno.value,
        email.value,
        descripcion.value,
        archivoInfoCenad.value,  // archivo nuevo o null
        infoCenadActual.value,   // nombre actual de infoCenad en la base
        idCenad.value
    );
    if (success) {
        // Actualizar el escudoActual con el nombre real subido
        infoCenadActual.value = success; // Asumiendo que editarInfoCenad retorna el nombreArchivo
        // Volver a cargar la URL de la infoCenad actualizada para mostrar preview
        try {
            urlInfoCenadActual.value = await service.fetchInfoCenad(infoCenadActual.value, idCenad.value)
        } catch (e) {
            urlInfoCenadActual.value = ''
        }
        archivoInfoCenad.value = null;
        previewInfoCenad.value = '';
        cambiaRol()
        cargarCenad()
    }
}
</script>
<style scoped>
.btn {
    background: #3A5A40;
}

.btn:hover {
    background-color: #A3B18A;
}

/* h3 {
  color: #354f52; font-weight: bold
} */
.titulo,
.texto {
    color: #3A5A40;
}

.titulo1,
.letra {
    color: #588157;
}

a.volver {
    color: #3A5A40;
    font-size: 18px;
}

a.volver:hover,
.href:hover {
    color: #A3B18A;
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

div.titulos {
    background-color: #DAD7CD;
}

figure {
    display: inline-block;
}

.texto {
    white-space: pre-wrap;
}

h3 {
    color: #3A5A40;
}

img.cenad {
    display: block;
    width: 365px;
    height: 533px;
    align-content: center;
    margin: auto;
    padding-bottom: 2px;
}

div.informacion {
    border: 6px solid #354f52;
    border-top: 0px;
    border-bottom: 0px;
    border-right: 0px;
}
</style>