<template>
    <div class="container-fluid">
        <div class="row mt-1">
            <div v-if="props.isCenad">
                <h3 class="text-center titulo1"><u>FICHEROS DEL CENAD/CMT</u></h3>
            </div>
            <div v-else>
                <h3 class="text-center titulo1"><u>FICHEROS DE LA UNIDAD</u></h3>
            </div>
            <div class="text-end">
                <button type="button" class="btn btn-primary text-white" @click="mostrarFormulario = !mostrarFormulario"
                    v-if="!mostrarFormulario">
                    <span>Nuevo</span>
                    <b v-if="props.isCenad"> Fichero de CENAD/CMT</b>
                    <b v-else> Fichero de Unidad</b>
                </button>
            </div>
        </div>
        <hr class='w-100 mt-3'>
        <!-- 👇 Formulario en línea (visible solo cuando mostrarFormulario = true) -->
        <div v-if="mostrarFormulario" class="card mt-3 shadow-sm">
            <div class="card-body">
                <h5 class="card-title">Nuevo Fichero</h5>
                <form>
                    <div class="row g-3 align-items-end">
                        <div class="col-md-4">
                            <label><b>Nombre del fichero *</b></label>
                            <input type="text" class="form-control" v-model="nombre" />
                        </div>
                        <div class="col-md-4">
                            <label><b>Categoría del fichero *</b></label>
                            <select class="form-select" v-model="idCategoriaFichero">
                                <option disabled value="">Selecciona categoría de fichero</option>
                                <option v-for="categoriaFichero in categoriasFichero" :key="categoriaFichero.idString"
                                    :value="categoriaFichero.idString">
                                    {{ categoriaFichero.nombre }}
                                </option>
                            </select>
                        </div>
                        <!-- Archivo -->
                        <div class="col-md-4">
                            <label class="form-label">
                                <b>Archivo *</b> (Máx: {{ sizeMaxDocRecurso }} MB)
                            </label>
                            <input type="file" class="form-control" @change="onFileChange" />
                            <small class="text-muted">{{ nombreArchivo }}</small>
                        </div>
                    </div>
                    <!-- 🔹 Descripción -->
                    <div class="row g-3 mt-3">
                        <div class="col-12"> <label><b>Descripción *</b></label>
                            <textarea class="form-control" v-model="descripcion"></textarea>
                        </div>
                    </div>
                    <div class="text-end mt-3">
                        <button type="button" class="btn btn-primary me-4"
                            @click="mostrarFormulario = !mostrarFormulario" v-if="mostrarFormulario">
                            Cancelar
                        </button>
                        <button type="button" class="btn btn-primary" @click="crearDocumentacion"
                            :disabled="!formularioValidado">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="row ms-5 p-0" >
            <div class="col col-md-12" v-if="mostrarListado">
                <div class="row mt-2 titulos">
                    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3 titulo">
                        <b>NOMBRE</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3 titulo">
                        <b>CATEGORÍA DE FICHERO</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-5 col-lg-5 col-xl-5 titulo ">
                        <b>DESCRIPCIÓN</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 titulo text-center">
                        <b>DESCARGA</b>
                    </div>
                </div>
                <FicheroDeSolicitudComponent v-for="item in documentacion" :key="item.idString" :content="item"
                    :idCenad="idCenad" :idRecurso="idRecurso" @emiteElemento="actualizarFicheroEnView" />
            </div>
        </div>
    </div>
</template>
<script setup>
import useAuthStore from '@/stores/auth'
import { ref, computed, onMounted } from 'vue'
import useUtilsStore from '@/stores/utils'
import { useRoute } from 'vue-router'
import FicheroService from '@/services/FicheroService'
import CategoriaFicheroService from '@/services/CategoriaFicheroService'
import FicheroDeSolicitudComponent from './FicheroDeSolicitudComponent.vue'
const props = defineProps(['rol', 'isCenad', 'idSolicitud'])
const utils = useUtilsStore()
const auth = useAuthStore()
const route = useRoute()
const idCenad = computed(() => route.params.id)
let sizeMaxDocRecurso = ref(utils.sizeMaxDocRecurso)
let nombre = ref('')
let nombreArchivo = ref('')
let descripcion = ref('')
let ficheroFile = ref(null)
const idCategoriaFichero = ref('')
const categoriasFichero = computed(() => auth.categoriasFichero)
const mostrarFormulario = ref(false)

const service = new FicheroService()
const categoriaFicheroService = new CategoriaFicheroService()
const documentacionCenad = service.getDocumentacionCenad()
const documentacionUnidad = service.getDocumentacionUnidad()
const categoriasFicheroImagenesMisFicheros = ref([])
const categoriasFicheroNoImagenesMisFicheros = ref([])
const documentacion = ref([])
const mostrarListado = computed(() => documentacion.value && documentacion.value.length > 0)

onMounted(async () => {
    documentacion.value = await getDocumentacion()

    documentacion.value != null && obtenerCategoriasMisFicheros(documentacion.value)
})
function onFileChange(e) {
    const file = e.target.files[0]
    ficheroFile.value = file
    nombreArchivo.value = file ? file.name : ''
}
async function getDocumentacionCenad() {
    const datos = await service.fetchDocumentacionSolicitudCenad(props.idSolicitud)
    // Añadir la URL a cada fichero
    if (datos) {
        for (let fichero of datos) {
            fichero.url = await service.fetchArchivoDocumentacionSolicitud(fichero.nombreArchivo, idCenad.value, props.idSolicitud)
        }
    }
    documentacionCenad.value = datos
    return documentacionCenad.value
}
async function getDocumentacionUnidad() {
    const datos = await service.fetchDocumentacionSolicitudUnidad(props.idSolicitud)
    // Añadir la URL a cada fichero
    if (datos) {
        for (let fichero of datos) {
            fichero.url = await service.fetchArchivoDocumentacionSolicitud(fichero.nombreArchivo, idCenad.value, props.idSolicitud)
        }
    }
    documentacionUnidad.value = datos
    return documentacionUnidad.value
}
function getDocumentacion() {
    return props.isCenad ? getDocumentacionCenad() : getDocumentacionUnidad()
}
function actualizarFicheroEnView() {
    getDocumentacion()
}
const crearDocumentacion = async () => {
    await service.crearDocumentacionSolicitud(nombre.value, descripcion.value, ficheroFile.value, idCategoriaFichero.value, idCenad.value, props.idSolicitud, props.isCenad)
    nombre.value = ''
    ficheroFile.value = null
    descripcion.value = ''
    idCategoriaFichero.value = ''
    mostrarFormulario.value = false

    getDocumentacion()
}
// Validación: todos los campos deben estar llenos
const formularioValidado = computed(() => {
    if (!nombre.value || !descripcion.value || !idCategoriaFichero.value || !ficheroFile.value) return false;
    return nombre.value.trim() != '' && descripcion.value.trim() != '' && idCategoriaFichero.value != '' && ficheroFile.value != null;
})
async function obtenerCategoriasMisFicheros(ficheros) {
    // 1. Hacer llamadas a cada URL de categoriaFichero
    const categoriasFichero = await Promise.all(
        ficheros.map(async (fichero) => {
            const response = await categoriaFicheroService.fetchCategoriaFicheroDeFichero(fichero.idString);
            return { ...response, fichero } // Se espera que devuelva { id, nombre, tipo }
        })
    )
    // Agrupar por categoría
    const mapaCategoriasFicheroFichero = new Map();
    categoriasFichero.forEach(({ idString, nombre, tipo, fichero }) => {
        if (!mapaCategoriasFicheroFichero.has(idString)) {
            mapaCategoriasFicheroFichero.set(idString, { idString, nombre, tipo, ficheros: [] });
        }
        mapaCategoriasFicheroFichero.get(idString).ficheros.push(fichero);
    });
    const categoriasFicheroUnicas = Array.from(mapaCategoriasFicheroFichero.values());
    // 3. Separar en dos listas según el tipo
    categoriasFicheroImagenesMisFicheros.value = categoriasFicheroUnicas.filter(cat => cat.tipo === 0);
    categoriasFicheroNoImagenesMisFicheros.value = categoriasFicheroUnicas.filter(cat => cat.tipo === 1);
}
</script>
<style scoped lang="scss">
.btn {
    background: #3A5A40;
}

.btn:hover {
    background-color: #A3B18A;
}

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

a {
    text-decoration: none;
    /* Sin subrayado */
    color: #3A5A40;
    /* Color por defecto */
}

a:visited {
    color: #3A5A40;
    /* Evita color morado */
}

a:hover {
    color: #A3B18A;
    /* Color al pasar el mouse */
}

a:active {
    color: #3A5A40;
    /* Mantiene color al hacer clic */
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

.close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

figure {
    display: inline-block;
}
</style>