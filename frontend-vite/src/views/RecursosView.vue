<template>
    <!-- muestra la vista de categorias -->
    <div class="container-fluid">
        <div class="row ms-4 mb-0 ps-3">
            <RouterLink class="nav-link volver" :to="{ name: 'cenad-home', params: { id: idCenad } }">
                <v-icon name="fa-arrow-alt-circle-left" scale="2" class="me-2" /><strong>Volver</strong>
            </RouterLink>
        </div>

        <div class="row mt-1">
            <!-- Filtro por categoría -->
            <label v-if="idCategoriaSeleccionada" class="mr-2 mt-2">
                Categoría Seleccionada:
                <span>{{ getNombreCategoriaSeleccionada }}</span>
            </label>
            <div class="mt-0">
                <label class="mr-2">Elige una categoría:</label>
                <select class="form-select" v-model="idCategoriaSeleccionada">
                    <option disabled value="">Selecciona la Categoría</option>
                    <option v-for="categoria in categorias" :key="categoria.idString" :value="categoria.idString">
                        {{ categoria.nombre }}
                    </option>
                </select>

                <button class="mr-2 ml-3" v-if="idCategoriaSeleccionada" @click="borrarFiltros">
                    Borrar filtros
                </button>
            </div>
            <div class="col-9 text-center">
                <h3 class="text-center titulo1"><u>RECURSOS DEL {{ auth.cenad.nombre }}</u></h3>
            </div>
            <div class="col-3 justify-content-end">
                <button class="btn text-white " data-bs-toggle="modal" data-bs-target="#modal-nuevo-recurso">
                    Nuevo <b>Recurso</b>
                </button>
            </div>
        </div>
        <hr class='w-100'>
        <div class="row ms-5 p-0">
            <div class="col col-md-12">
                <div class="row mt-2 titulos">
                    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 titulo">
                        <b>RECURSO</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 titulo">
                        <b>CATEGORÍA</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 titulo">
                        <b>DESCRIPCIÓN</b>
                    </div>
                </div>
                <RecursoComponent v-for="(item, index) in recursosFiltrados" :key="index" :content="item"
                    :idCenad="idCenad" @emiteElemento="actualizarRecursoEnView" />
                <div v-if="recursosFiltrados.length == 0" class="text-center my-4">
                    <p>No hay recursos para esta categoría.</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modal-nuevo-recurso" tabindex="-1" aria-labelledby="modal-nuevo-recurso-Label"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-nuevo-recurso-Label">
                        Nuevo Recurso
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="titulo"><b>NOMBRE DEL RECURSO<sup class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
                            <input type="textarea" class="form-control letra" id="descripcion" v-model="descripcion" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>OTROS<sup class="text-danger">*</sup></b></label>
                            <input type="textarea" class="form-control letra" id="otros" v-model="otros" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>CATEGORÍA<sup class="text-danger">*</sup></b></label>
                            <select class="form-select" aria-label="categoria" v-model="idCategoria">
                                <option disabled value="">Selecciona la Categoría</option>
                                <option v-for="categoria in categorias" :key="categoria.idString"
                                    :value="categoria.idString">
                                    {{ categoria.nombre }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>TIPO DE FORMULARIO<sup class="text-danger">*</sup></b></label>
                            <select class="form-select" aria-label="tipoFormulario" v-model="idTipoFormulario">
                                <option disabled value="">Selecciona el Tipo de formulario</option>
                                <option v-for="tipoFormulario in tiposFormulario" :key="tipoFormulario.idString"
                                    :value="tipoFormulario.idString">
                                    {{ tipoFormulario.nombre }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>USUARIO GESTOR<sup class="text-danger">*</sup></b></label>
                            <select class="form-select" aria-label="usuarioGestor" v-model="idUsuarioGestor">
                                <option disabled value="">Selecciona el Gestor del recurso</option>
                                <option v-for="usuarioGestor in usuariosGestor" :key="usuarioGestor.idString"
                                    :value="usuarioGestor.idString">
                                    {{ usuarioGestor.username }}
                                </option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t('comun.cerrar') }}
                    </button>
                    <button type="button" @click="crearRecurso" data-bs-dismiss="modal" class="btn btn-primary">
                        Crear Recurso
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import useAuthStore from '@/stores/auth'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import RecursoComponent from '@/components/RecursoComponent.vue'
import RecursoService from '@/services/RecursoService'
import UsuarioService from '@/services/UsuarioService'
import TipoFormularioService from '@/services/TipoFormularioService'
import CategoriaService from '@/services/CategoriaService'
import useUtilsStore from '@/stores/utils'

const auth = useAuthStore()
const utils = useUtilsStore()
const route = useRoute()
const idCenad = computed(() => route.params.id)

let nombre = ref('')
let descripcion = ref('')
let otros = ref('')
let idCategoria = ref('')
let idTipoFormulario = ref('')
let idUsuarioGestor = ref('')
let idCategoriaSeleccionada = ref('')
const usuarioService = new UsuarioService()
const tipoFormularioService = new TipoFormularioService()
const categoriaService = new CategoriaService()
const service = new RecursoService()
const categorias = categoriaService.getCategorias()
const recursos = service.getRecursos()
const tiposFormulario = tipoFormularioService.getTiposFormulario()
const usuariosGestor = usuarioService.getUsuariosGestor()

onMounted(async () => {
    await getCategorias()
    await getTiposFormulario()
    await getUsuariosGestor()
    await getRecursos()
})
const crearRecurso = async () => {
    await service.crearRecurso(nombre.value, descripcion.value, otros.value, idTipoFormulario.value, idCategoria.value, idUsuarioGestor.value)
    nombre.value = ''
    idCategoria.value = ''
    descripcion.value = ''
    otros.value = ''
    idTipoFormulario.value = ''
    idUsuarioGestor.value = ''
    await getRecursos()
}
const getRecursos = async () => {
    await service.fetchAll(idCenad.value)

    const promises = recursos.value.map(async (recurso) => {
        if (recurso._links && recurso._links.categoria) {
            try {
                const response = await utils.fetchConToken(recurso._links.categoria.href, 'GET', null)
                const categoriaData = await response.json()
                recurso.idCategoria = categoriaData.idString
                recurso.categoriaNombre = categoriaData.nombre
            } catch (error) {
                recurso.idCategoria = ''
                recurso.categoriaNombre = 'Desconocida'
            }
        }
    })

    await Promise.all(promises) // ✅ Espera a que todas las categorías se obtengan
}
const getCategorias = async () => {
    await categoriaService.fetchAll(idCenad.value)
}
const getTiposFormulario = async () => {
    await tipoFormularioService.fetchAll()
}
const getUsuariosGestor = async () => {
    await usuarioService.fetchUsuariosGestorDeCenad(idCenad.value)
}
function actualizarRecursoEnView() {
    getRecursos()
}
const recursosFiltrados = computed(() => {
    if (!idCategoriaSeleccionada.value) return recursos.value
    console.log(recursos.value)
    return recursos.value.filter(r => r.idCategoria && r.idCategoria === idCategoriaSeleccionada.value)

})
const getNombreCategoriaSeleccionada = computed(() => {
    const cat = categorias.value.find(c => c.idString === idCategoriaSeleccionada.value)
    return cat ? cat.nombre : ''
})
function borrarFiltros() {
    idCategoriaSeleccionada.value = ''
}
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
