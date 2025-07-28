<template>
    <div class="container-fluid">
        <!-- Botón volver -->
        <div class="row ms-4 mb-0 ps-3">
            <RouterLink class="nav-link volver" :to="{ name: 'cenad-home', params: { id: idCenad } }">
                <v-icon name="fa-arrow-alt-circle-left" scale="2" class="me-2" /><strong>Volver</strong>
            </RouterLink>
        </div>

        <!-- Filtros -->
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
                <h3 class="titulo1 me-2" v-if="auth.cenadVisitado"><u>CATEGORÍAS DEL {{ auth.cenadVisitado.nombre }}</u>
                </h3>
                <div v-if="loading" class="spinner-border spinner-border-sm titulo" role="status"></div>
            </div>

            <div class="col-3 justify-content-end" v-if="isAdminEsteCenad">
                <button class="btn text-white" data-bs-toggle="modal" data-bs-target="#modal-nueva-categoria">
                    Nueva <b>Categoría</b>
                </button>
            </div>
        </div>

        <hr class='w-100'>

        <!-- Tabla categorías -->
        <div class="row ms-5 p-0">
            <div class="col col-md-12" v-if="isAdminEsteCenad">
                <div class="row mt-2 titulos d-flex justify-content-between align-items-center">
                    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 titulo"><span
                            v-if="historialCategorias.length === 0">
                            CATEGORÍAS PRINCIPALES ({{ categoriasMostradas.length }})
                        </span>
                        <span v-else>
                            Subcategorías de <strong>{{ historialCategorias[historialCategorias.length -
                                1].nombre.toUpperCase() }}</strong>
                            ({{ categoriasMostradas.length }})
                        </span>
                    </div>
                    <div class="col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8 titulo"><b>DESCRIPCIÓN</b></div>
                </div>
                <CategoriaComponent v-for="(item, index) in categoriasMostradas" :key="index" :content="item"
                    :idCenad="idCenad" @emiteElemento="cargarCategoriasPadre"/>
            </div>
            <div v-if="!isAdminEsteCenad" class="titulo text-center">NO PUEDES ACCEDER A LA GESTIÓN DE CATEGORÍAS DE
                OTRO CENAD/CMT</div>
        </div>
    </div>

    <!-- Modal Nueva Categoría -->
    <div class="modal fade" id="modal-nueva-categoria" tabindex="-1" aria-labelledby="modal-nueva-categoria-Label"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-nueva-categoria-Label">Nueva Categoría</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="titulo"><b>NOMBRE DE LA CATEGORÍA<sup class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" v-model="nombre" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>CATEGORÍA PADRE</b></label>
                            <select class="form-select" v-model="idCategoriaPadre">
                                <option disabled value="">Selecciona la Categoría Padre</option>
                                <option v-for="categoria in auth.categorias" :key="categoria.idString"
                                    :value="categoria.idString">
                                    {{ categoria.nombre }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
                            <textarea class="form-control letra" v-model="descripcion"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" @click="crearCategoria" data-bs-dismiss="modal" class="btn btn-primary"
                        :disabled="!formularioValidado">
                        Crear Categoría
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import useAuthStore from '@/stores/auth'
import CategoriaComponent from '@/components/CategoriaComponent.vue'
import CategoriaService from '@/services/CategoriaService'

const auth = useAuthStore()
const route = useRoute()
const idCenad = computed(() => route.params.id)
const isAdminEsteCenad = ref(false)

const service = new CategoriaService()

// Datos formulario
let nombre = ref('')
let descripcion = ref('')
let idCategoriaPadre = ref('')

// Listas y estado
const categoriasFiltradas = ref([])
const categoriaSeleccionada = ref(null)
const historialCategorias = ref([])
const categoriasMostradas = ref([])
const loading = ref(false)

// Caché
const cacheSubcategorias = reactive(new Map())

onMounted(async () => {
    auth.rol === 'Administrador' && (isAdminEsteCenad.value = idCenad.value == auth.cenad.idString)
    await cargarCategoriasPadre()
})

// Función inicial
const cargarCategoriasPadre = async () => {
    categoriasFiltradas.value = auth.categoriasPadre
    categoriasMostradas.value = auth.categoriasPadre
    historialCategorias.value = []
    categoriaSeleccionada.value = null
}

// Filtrar subcategorías
const filtrar = async () => {
    if (!categoriaSeleccionada.value) return
    loading.value = true
    const idCat = categoriaSeleccionada.value.idString
    historialCategorias.value.push(categoriaSeleccionada.value)

    let subcategorias
    if (cacheSubcategorias.has(idCat)) {
        subcategorias = cacheSubcategorias.get(idCat)
    } else {
        subcategorias = await service.fetchSubcategorias(idCat)
        cacheSubcategorias.set(idCat, subcategorias)
    }

    categoriasFiltradas.value = subcategorias
    categoriasMostradas.value = subcategorias
    categoriaSeleccionada.value = null
    loading.value = false
}

// Retroceder
const retroceder = async () => {
    if (historialCategorias.value.length == 0) return
    loading.value = true
    historialCategorias.value.pop()

    if (historialCategorias.value.length == 0) {
        await cargarCategoriasPadre()
    } else {
        const ultima = historialCategorias.value[historialCategorias.value.length - 1]
        const idCat = ultima.idString

        let subcategorias
        if (cacheSubcategorias.has(idCat)) {
            subcategorias = cacheSubcategorias.get(idCat)
        } else {
            subcategorias = await service.fetchSubcategorias(idCat)
            cacheSubcategorias.set(idCat, subcategorias)
        }
        categoriasFiltradas.value = subcategorias
        categoriasMostradas.value = subcategorias
    }
    loading.value = false
}

// Borrar filtros
const borrarFiltros = async () => {
    await cargarCategoriasPadre()
}

// Crear categoría
const crearCategoria = async () => {
    await service.crearCategoria(nombre.value, descripcion.value, idCenad.value, idCategoriaPadre.value)
    nombre.value = ''
    idCategoriaPadre.value = ''
    descripcion.value = ''
    await cargarCategoriasPadre()
}

// Validación
const formularioValidado = computed(() => nombre.value.trim() !== '' && descripcion.value.trim() !== '')
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
