<template>
    <!-- muestra la vista de ficheros  que verá quien no sea gestor del recurso-->
    <div v-if="props.rol == 'Gestor'">
        <div v-for="categoriaFichero in categoriasFicheroImagenesMisFicheros" :key="categoriaFichero.idString"
            class="titulo">
            <h4 class="text-center"><b>{{ categoriaFichero.nombre }} {{ props.rol }}</b></h4>
            <hr>
            <a v-for="fichero in categoriaFichero.ficheros" :key="fichero.idString" href="#"
                @click.prevent="show(fichero)">
                <figure class="pe-4 pt-2 pb-3">
                    <img :src="fichero.url" width="350" :alt="fichero.nombre" />
                    <figcaption class="text-center pt-2">{{ fichero.nombre }}</figcaption>
                </figure>
            </a>
        </div>
        <div v-for="categoriaFichero in categoriasFicheroNoImagenesMisFicheros" :key="categoriaFichero.idString"
            class="titulo">
            <h4 class="text-center"><b>{{ categoriaFichero.nombre }}</b></h4>
            <hr>
            <div v-for="fichero in categoriaFichero.ficheros" :key="fichero.idString">
                <a v-if="fichero.url" :href="fichero.url" :download="fichero.nombreArchivo" class="texto href ms-3">{{
                    fichero.nombre }}</a>
            </div>
        </div>
    </div>
    <!-- muestra la vista de ficheros que verá el gestor-->
    <div class="container-fluid" v-if="props.rol != 'Gestor'">
        <div class="row mt-1">
            <div>
                <h3 class="text-center titulo1"><u>FICHEROS</u></h3>
            </div>
            <div class="text-end">
                <button class="btn text-white " data-bs-toggle="modal" data-bs-target="#modal-nuevo-fichero">
                    Nuevo <b>Fichero</b>
                </button>
            </div>
        </div>
        <hr class='w-100'>
        <div class="row ms-5 p-0">
            <div class="col col-md-12">
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
                <FicheroComponent v-for="item in ficheros" :key="item.idString" :content="item" :idCenad="idCenad"
                    :idRecurso="idRecurso" @emiteElemento="actualizarFicheroEnView" />
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modal-nuevo-fichero" tabindex="-1" aria-labelledby="modal-nuevo-fichero-Label"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-nuevo-fichero-Label">
                        Nuevo Fichero
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="titulo"><b>NOMBRE DEL FICHERO <sup class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>CATEGORÍA DEL FICHERO<sup class="text-danger">*</sup></b></label>
                            <select class="form-select" aria-label="tipoFormulario" v-model="idCategoriaFichero">
                                <option disabled value="">Selecciona la Categoría del fichero</option>
                                <option v-for="categoriaFichero in categoriasFichero" :key="categoriaFichero.idString"
                                    :value="categoriaFichero.idString">
                                    {{ categoriaFichero.nombre }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
                            <textarea class="form-control letra" id="descripcion" v-model="descripcion"></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>ARCHIVO<sup class="text-danger mr-2">*</sup></b> (Tamaño máximo
                                permitido: {{ sizeMaxDocRecurso }} MB)</label>
                            <input type="file" accept="*" @change="onFileChange" />{{ nombreArchivo }}
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t('comun.cerrar') }}
                    </button>
                    <button type="button" @click="crearFichero" data-bs-dismiss="modal" class="btn btn-primary"
                        :disabled="!formularioValidado">
                        Crear Fichero
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal de imagen -->
    <div v-if="showModal" class="modal" tabindex="-1" role="dialog" style="display: block;" aria-modal="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{ toTitleCase(imagenModal.nombre) }}</h4>
                    <button type="button" class="close" @click="hide" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <figure>
                        <img class="pe-2 pt-2 inline img-fluid" :src="imagenModal.url" :alt="imagenModal.nombre" />
                        <figcaption class="text-center pt-2">{{ imagenModal.descripcion }}</figcaption>
                    </figure>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn text-white" @click="hide">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Fondo modal para oscurecer -->
    <div v-if="showModal" class="modal-backdrop fade show"></div>
</template>
<script setup>
import useAuthStore from '@/stores/auth'
import { ref, computed, onMounted } from 'vue'
import useUtilsStore from '@/stores/utils'
import { useRoute } from 'vue-router'
import FicheroComponent from '@/components/FicheroComponent.vue'
import FicheroService from '@/services/FicheroService'
import UsuarioService from '@/services/UsuarioService'
import CategoriaFicheroService from '@/services/CategoriaFicheroService'
import { toTitleCase } from '@/utils'
const props = defineProps(['rol'])
const utils = useUtilsStore()
const auth = useAuthStore()
const route = useRoute()
const idCenad = computed(() => route.params.id)
const idRecurso = computed(() => route.params.idRecurso)
let sizeMaxDocRecurso = ref(utils.sizeMaxDocRecurso)
let nombre = ref('')
let nombreArchivo = ref('')
let descripcion = ref('')
let ficheroFile = ref(null)
const idGestor = ref('')
const idCategoriaFichero = ref('')
const categoriasFichero = computed(() => auth.categoriasFichero)
const showModal = ref(false)
const imagenModal = ref()
const isGestorEsteRecurso = ref(false)
const service = new FicheroService()
const usuarioService = new UsuarioService()
const categoriaFicheroService = new CategoriaFicheroService()
const ficheros = service.getFicheros()
const categoriasFicheroImagenesMisFicheros = ref([])
const categoriasFicheroNoImagenesMisFicheros = ref([])
function show(imagen) {
    imagenModal.value = imagen
    showModal.value = true
}
function hide() {
    showModal.value = false
    imagenModal.value = null
}
onMounted(async () => {
    await getFicheros()
    let gestor = await usuarioService.fetchUsuarioGestorDeRecurso(idRecurso.value)
    idGestor.value = gestor.idString
    if (idGestor.value == auth.usuario.idString) {
        isGestorEsteRecurso.value = true
    } else {
        isGestorEsteRecurso.value = false
    }
    obtenerCategoriasMisFicheros(ficheros.value)
})
function onFileChange(e) {
    const file = e.target.files[0]
    ficheroFile.value = file
    nombreArchivo.value = file ? file.name : ''
}
async function getFicheros() {
    await service.fetchAll(idRecurso.value)
    // Añadir la URL a cada fichero
    for (let fichero of ficheros.value) {
        fichero.url = await service.fetchArchivoFichero(fichero.nombreArchivo, idCenad.value, idRecurso.value)
    }
}
function actualizarFicheroEnView() {
    getFicheros()
}
const crearFichero = async () => {
    await service.crearFichero(nombre.value, descripcion.value, ficheroFile.value, idCategoriaFichero.value, idCenad.value, idRecurso.value)
    nombre.value = ''
    ficheroFile.value = null
    descripcion.value = ''
    idCategoriaFichero.value = ''
    getFicheros()
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