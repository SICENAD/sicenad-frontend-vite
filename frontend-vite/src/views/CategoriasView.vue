<template>
    <!-- muestra la vista de categorias -->
    <div class="container-fluid">
        <div class="row ms-4 mb-0 ps-3">
            <RouterLink class="nav-link volver" :to="{ name: 'cenad-home', params: { id: idCenad} }">
                <v-icon name="fa-arrow-alt-circle-left" scale="2" class="me-2" /><strong>Volver</strong>
            </RouterLink>
        </div>
        <div class="row mt-1">
            <div class="col-9 text-center">
                <h3 class="text-center titulo1"><u>CATEGORÍAS DEL {{ auth.cenad.nombre }}</u></h3>
            </div>
            <div class="col-3 justify-content-end">
                <button class="btn text-white " data-bs-toggle="modal" data-bs-target="#modal-nueva-categoria">
                    Nueva <b>Categoría</b>
                </button>
            </div>
        </div>
        <hr class='w-100'>
        <div class="row ms-5 p-0">
            <div class="col col-md-12">
                <div class="row mt-2 titulos">
                    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3 titulo">
                        <b>CATEGORÍA</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3 titulo">
                        <b>CATEGORÍA PADRE</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 titulo ">
                        <b>DESCRIPCIÓN</b>
                    </div>
                </div>
                <CategoriaComponent v-for="(item, index) in categorias" :key="index" :content="item" :idCenad="idCenad"
                    @emiteElemento="actualizarCategoriaEnView" />
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modal-nueva-categoria" tabindex="-1" aria-labelledby="modal-nueva-categoria-Label"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-nueva-categoria-Label">
                        Nueva Categoría
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="titulo"><b>NOMBRE DE LA CATEGORÍA<sup class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>CATEGORÍA PADRE<sup class="text-danger">*</sup></b></label>
                            <select class="form-select" aria-label="categoriaPadre" v-model="idCategoriaPadre">
                                <option disabled value="">Selecciona la Categoría Padre</option>
                                <option v-for="categoria in categorias" :key="categoria.idString"
                                    :value="categoria.idString">
                                    {{ categoria.nombre }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
                            <input type="textarea" class="form-control letra" id="descripcion" v-model="descripcion" />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t('comun.cerrar') }}
                    </button>
                    <button type="button" @click="crearCategoria" data-bs-dismiss="modal" class="btn btn-primary">
                        Crear Categoría
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
import CategoriaComponent from '@/components/CategoriaComponent.vue'
import CategoriaService from '@/services/CategoriaService'

const auth = useAuthStore()
const route = useRoute()
const idCenad = computed(() => route.params.id)

let nombre = ref('')
let descripcion = ref('')
let idCategoriaPadre = ref('')


const service = new CategoriaService()
const categorias = service.getCategorias()

onMounted(async () => {
    await getCategorias()
})
const crearCategoria = async () => {
    await service.crearCategoria(nombre.value, descripcion.value, idCenad.value, idCategoriaPadre.value)
    nombre.value = ''
    idCategoriaPadre.value = ''
    descripcion.value = ''
    await getCategorias()
}
const getCategorias = async () => {
    await service.fetchAll(idCenad.value)
}

function actualizarCategoriaEnView() {
    getCategorias()
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
