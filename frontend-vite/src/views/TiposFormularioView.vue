<template>
    <!-- muestra la vista de categorias de fichero -->
    <div class="container-fluid">
        <div class="row ms-4 mb-0 ps-3">
            <RouterLink class="nav-link volver" :to="{ name: 'superadministrador' }">
                <v-icon name="fa-arrow-alt-circle-left" scale="2" class="me-2" /><strong>Volver</strong>
            </RouterLink>
        </div>
        <div class="row mt-4">
            <div class="col-9 text-center">
                <h3 class="text-center titulo1"><u>GESTIÓN DE TIPOS DE FORMULARIO</u></h3>
            </div>
            <div class="col-3 justify-content-end">
                <button class="btn text-white " data-bs-toggle="modal" data-bs-target="#modal-nuevo-tipoFormulario">
                    Nuevo <b>Tipo de Formulario</b>
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
                    <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo">
                        <b>CÓDIGO DE TIPO</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-7 col-lg-7 col-xl-7 titulo">
                        <b>DESCRIPCIÓN</b>
                    </div>
                </div>
                <TipoFormularioComponent v-for="(item, index) in tiposFormulario" :key="index" :content="item"
                    @emiteElemento="actualizarTipoFormularioEnView" />
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modal-nuevo-tipoFormulario" tabindex="-1"
        aria-labelledby="modal-nuevo-tipoFormulario-Label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-nuevo-tipoFormulario-Label">
                        Nuevo Tipo de Formulario
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="titulo"><b>NOMBRE DEL TIPO DE FORMULARIO<sup
                                        class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo me-2"><b>CÓDIGO DEL TIPO DE FORMULARIO<sup class="text-danger">*</sup></b></label>
                            <input type="number" class="form-control letra" id="codTipo" v-model="codTipo" />
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
                    <button type="button" @click="crearTipoFormulario" data-bs-dismiss="modal" class="btn btn-primary">
                        Crear Tipo de Formulario
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import TipoFormularioComponent from '@/components/TipoFormularioComponent.vue'
import TipoFormularioService from '@/services/TipoFormularioService'
import { ref, onMounted } from 'vue'

let nombre = ref('')
let codTipo = ref('')
let descripcion = ref('')

const service = new TipoFormularioService()
const tiposFormulario = service.getTiposFormulario()

onMounted(async () => {
    await getTiposFormulario()
})
const crearTipoFormulario = async () => {
    await service.crearTipoFormulario(nombre.value, codTipo.value, descripcion.value)
    nombre.value = ''
    codTipo.value = ''
    descripcion.value = ''
    await getTiposFormulario()
}
const getTiposFormulario = async () => {
    await service.fetchAll()
}

function actualizarTipoFormularioEnView() {
   getTiposFormulario()
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
