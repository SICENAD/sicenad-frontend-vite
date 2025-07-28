<template>
    <!-- muestra la vista de ficheros -->
    <div class="container-fluid">
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
                <FicheroComponent v-for="(item, index) in ficheros" :key="index" :content="item" :idCenad="idCenad"
                    :idRecurso="idRecurso" @emiteElemento="actualizarFicheroEnView"/>
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
                            <label class="titulo"><b>NOMBRE DEL FICHERO<sup class="text-danger">*</sup></b></label>
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
                            <input type="textarea" class="form-control letra" id="descripcion" v-model="descripcion" />
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
</template>
<script setup>
import useAuthStore from '@/stores/auth'
import { ref, computed, onMounted } from 'vue'
import useUtilsStore from '@/stores/utils'
import { useRoute } from 'vue-router'
import FicheroComponent from '@/components/FicheroComponent.vue'
import FicheroService from '@/services/FicheroService'
import UsuarioService from '@/services/UsuarioService'

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

const isGestorEsteRecurso = ref(false)

const service = new FicheroService()
const usuarioService = new UsuarioService()
const ficheros = service.getFicheros()

onMounted(async () => {
    await getFicheros()
    let gestor = await usuarioService.fetchUsuarioGestorDeRecurso(idRecurso.value)
    idGestor.value = gestor.idString
    if (idGestor.value == auth.usuario.idString) {
        isGestorEsteRecurso.value = true
    } else {
        isGestorEsteRecurso.value = false
    }
})
function onFileChange(e) {
    const file = e.target.files[0]
    ficheroFile.value = file
}
async function getFicheros() {
    await service.fetchAll(idRecurso.value)
}
function actualizarFicheroEnView() {
    getFicheros()
}
const crearFichero = async () => {
    await service.crearFichero(nombre.value, descripcion.value, ficheroFile.value, idCategoriaFichero.value, idCenad.value, idRecurso.value)
    nombre.value = ''
    ficheroFile.value = ''
    descripcion.value = ''
    idCategoriaFichero.value = ''
    getFicheros()
}
// Validación: todos los campos deben estar llenos
const formularioValidado = computed(() => {
    return (
        nombre.value.trim() != '' &&
        descripcion.value.trim() != '' &&
        idCategoriaFichero.value != '' &&
        ficheroFile.value != null
    )
});
</script>
<style scoped lang="scss">
.btn {
    background: #3A5A40;
    padding: 0.5;
    font-size: 14px;
}

.btn:hover {
    background-color: #A3B18A;
}

.titulo {
    color: #3A5A40;
    font-weight: bold;
}

.titulo1 {
    color: #588157;
}

h5 {
    color: #354f52;
    font-weight: bold;
}

a.volver {
    color: #3A5A40;
    font-size: 18px;
}

a.volver:hover {
    color: #A3B18A;
}

.row {
    height: auto;
    padding: auto;
    margin: auto;
}

hr {
    margin-bottom: 0;
    margin-top: 1;
}

.modal {
    max-height: 100%;
    max-width: 100%;
    margin: auto;
}
</style>
