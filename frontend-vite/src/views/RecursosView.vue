<template>
    <!-- muestra la vista de categorias -->
    <div class="container-fluid">
        <div class="row ms-4 mb-0 ps-3">
            <RouterLink class="nav-link volver" :to="{ name: 'cenad-home', params: { id: idCenad } }">
                <v-icon name="fa-arrow-alt-circle-left" scale="2" class="me-2" /><strong>Volver</strong>
            </RouterLink>
        </div>
        <div class="row mt-1">
            <div class="d-flex flex-column align-items-start col-3">
                <label v-if="historialCategorias.length > 0" class="me-2 mt-2">
                    Categoría Seleccionada:
                    <strong>{{ historialCategorias[historialCategorias.length - 1].nombre.toUpperCase() }}</strong>
                </label>

                <select v-if="(categoriasFiltradas || []).length > 0" v-model="categoriaSeleccionada" @change="filtrar"
                    class="form-select mb-3">
                    <option value="" disabled selected>Selecciona una categoría</option>
                    <option v-for="categoria in categoriasFiltradas" :key="categoria.idString" :value="categoria">
                        {{ categoria.nombre.toUpperCase() }}
                    </option>
                </select>

                <div class="d-flex gap-2 mb-2">
                    <button v-if="historialCategorias.length > 0" @click="retroceder" class="btn btn-secondary">
                        Atrás
                    </button>
                    <button v-if="historialCategorias.length > 0" @click="borrarFiltros" class="btn btn-danger">
                        Borrar filtros
                    </button>
                </div>
            </div>
            <div class="col-6 text-center d-flex justify-content-center align-items-center">
                <h3 class="titulo1 me-2"><u>RECURSOS DEL {{ auth.cenad.nombre }}</u></h3>
                <div v-if="loading" class="spinner-border spinner-border-sm titulo" role="status"></div>
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
                <RecursoComponent v-for="(item, index) in recursos" :key="index" :content="item" :idCenad="idCenad"
                    @emiteElemento="actualizarRecursoEnView" />
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
                    <button type="button" @click="crearRecurso" data-bs-dismiss="modal" class="btn btn-primary"
                        :disabled="!formularioValidado
                            ">
                        Crear Recurso
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import RecursoComponent from '@/components/RecursoComponent.vue'
import RecursoService from '@/services/RecursoService'
import CategoriaService from '@/services/CategoriaService'
import useUtilsStore from '@/stores/utils'
import useAuthStore from '@/stores/auth'

const auth = useAuthStore()
const utils = useUtilsStore()
const route = useRoute()
const idCenad = computed(() => route.params.id)

// Datos formulario
let nombre = ref('')
let descripcion = ref('')
let otros = ref('')
let idCategoria = ref('')
let idTipoFormulario = ref('')
let idUsuarioGestor = ref('')

// Estados
const categoriasFiltradas = ref([])
const recursos = ref([])
const categoriaSeleccionada = ref(null)
const historialCategorias = ref([])
const loading = ref(false)

// Servicios
const categoriaService = new CategoriaService()
const service = new RecursoService()

// Stores
const tiposFormulario = computed(() => auth.tiposFormulario)
const usuariosGestor = computed(() => auth.usuariosGestor)
const categorias = computed(() => auth.categorias)

// Caché local para evitar llamadas repetidas
const cacheSubcategorias = reactive(new Map()) // idCategoria -> subcategorias[]
const cacheRecursos = reactive(new Map())      // idCategoria -> recursos[]

onMounted(async () => {
    loading.value = true
    await cargarCategoriasPadre()
    loading.value = false
})
// Obtener recursos y asignar categorías
const getRecursos = async () => {
    recursos.value = auth.recursos
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
    await Promise.all(promises)
}
function actualizarRecursoEnView() {
    getRecursos()
}
// Carga inicial de categorías padre
const cargarCategoriasPadre = async () => {
    categoriasFiltradas.value = auth.categoriasPadre
    categoriaSeleccionada.value = null
    historialCategorias.value = []
    recursos.value = auth.recursos
}
// Filtrar por categoría seleccionada con caché
const filtrar = async () => {
    if (!categoriaSeleccionada.value) return
    loading.value = true
    const idCat = categoriaSeleccionada.value.idString
    historialCategorias.value.push(categoriaSeleccionada.value)
    // 1. Subcategorías (desde caché o API)
    let subcategorias
    if (cacheSubcategorias.has(idCat)) {
        subcategorias = cacheSubcategorias.get(idCat)
    } else {
        subcategorias = await categoriaService.fetchSubcategorias(idCat)
        cacheSubcategorias.set(idCat, subcategorias)
    }
    if (subcategorias.length === 0) {
        // 2. Recursos (desde caché o API)
        let recursosCat
        if (cacheRecursos.has(idCat)) {
            recursosCat = cacheRecursos.get(idCat)
        } else {
            recursosCat = await service.fetchRecursosDeCategoria(idCat)
            cacheRecursos.set(idCat, recursosCat)
        }
        recursos.value = recursosCat
        categoriasFiltradas.value = []
    } else {
        // Hay subcategorías
        categoriasFiltradas.value = subcategorias
        // Recursos de esta categoría y subcategorías
        let recursosCat
        if (cacheRecursos.has(idCat)) {
            recursosCat = cacheRecursos.get(idCat)
        } else {
            recursosCat = await service.fetchRecursosDeSubcategorias(idCat)
            cacheRecursos.set(idCat, recursosCat)
        }
        recursos.value = recursosCat
    }
    categoriaSeleccionada.value = null
    loading.value = false
}
// Borrar filtros y volver a estado inicial
const borrarFiltros = async () => {
    await cargarCategoriasPadre()
}
// Retroceder en historial con caché
const retroceder = async () => {
    if (historialCategorias.value.length === 0) return
    loading.value = true
    historialCategorias.value.pop() // Eliminar última categoría
    if (historialCategorias.value.length === 0) {
        // Volvemos a categorías padre
        await cargarCategoriasPadre()
    } else {
        const ultimaCategoria = historialCategorias.value[historialCategorias.value.length - 1]
        const idCat = ultimaCategoria.idString
        // Subcategorías desde caché o API
        if (cacheSubcategorias.has(idCat)) {
            categoriasFiltradas.value = cacheSubcategorias.get(idCat)
        } else {
            const subcategorias = await categoriaService.fetchSubcategorias(idCat)
            cacheSubcategorias.set(idCat, subcategorias)
            categoriasFiltradas.value = subcategorias
        }
        // Recursos desde caché o API
        if (cacheRecursos.has(idCat)) {
            recursos.value = cacheRecursos.get(idCat)
        } else {
            const recursosCat = await service.fetchRecursosDeSubcategorias(idCat)
            cacheRecursos.set(idCat, recursosCat)
            recursos.value = recursosCat
        }
    }
    categoriaSeleccionada.value = null
    loading.value = false
}
// Crear recurso y refrescar recursos
const crearRecurso = async () => {
    await service.crearRecurso(
        nombre.value,
        descripcion.value,
        otros.value,
        idTipoFormulario.value,
        idCategoria.value,
        idUsuarioGestor.value
    )
    // Reset form
    nombre.value = ''
    idCategoria.value = ''
    descripcion.value = ''
    otros.value = ''
    idTipoFormulario.value = ''
    idUsuarioGestor.value = ''
    await getRecursos()
}
// Validación formulario
const formularioValidado = computed(() => {
    return (
        nombre.value.trim() !== '' &&
        descripcion.value.trim() !== '' &&
        otros.value.trim() !== '' &&
        idCategoria.value !== '' &&
        idTipoFormulario.value !== '' &&
        idUsuarioGestor.value !== ''
    )
})
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
