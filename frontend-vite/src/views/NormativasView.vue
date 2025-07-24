<template>
    <!-- muestra la vista de normativas -->
    <div class="container-fluid">
        <div class="row ms-4 mb-0 ps-3">
            <RouterLink class="nav-link volver" :to="{ name: 'cenad-home', params: { id: idCenad } }">
                <v-icon name="fa-arrow-alt-circle-left" scale="2" class="me-2" /><strong>Volver</strong>
            </RouterLink>
        </div>
        <div class="row mt-1">
            <div class="col-9 text-center">
                <h3 class="text-center titulo1"><u>NORMATIVA DEL {{ auth.cenad.nombre }}</u></h3>
            </div>
            <div class="col-3 justify-content-end">
                <button class="btn text-white " data-bs-toggle="modal" data-bs-target="#modal-nueva-normativa">
                    Nueva <b>Normativa</b>
                </button>
            </div>
        </div>
        <hr class='w-100'>
        <div class="row ms-5 p-0">
            <div class="col col-md-12">
                <div class="row mt-2 titulos">
                    <div class="col-10 col-sm-10 col-md-5 col-lg-5 col-xl-5 titulo">
                        <b>NOMBRE</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 titulo ">
                        <b>DESCRIPCIÓN</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 titulo text-center">
                        <b>DESCARGA</b>
                    </div>
                </div>
                <NormativaComponent v-for="(item, index) in normativas" :key="index" :content="item" :idCenad="idCenad"
                    @emiteElemento="actualizarNormativaEnView" />
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modal-nueva-normativa" tabindex="-1" aria-labelledby="modal-nueva-normativa-Label"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-nueva-normativa-Label">
                        Nueva Normativa
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="titulo"><b>NOMBRE DE LA NORMATIVA<sup class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
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
                    <button type="button" @click="crearNormativa" data-bs-dismiss="modal" class="btn btn-primary" :disabled="!formularioValidado">
                        Crear Normativa
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import NormativaComponent from '@/components/NormativaComponent.vue'
import useAuthStore from '@/stores/auth'
import { ref, onMounted, computed } from 'vue'
import useUtilsStore from '@/stores/utils'
import NormativaService from '@/services/NormativaService'
import { useRoute } from 'vue-router'

const utils = useUtilsStore()
const auth = useAuthStore()
const route = useRoute()
const idCenad = computed(() => route.params.id)

let sizeMaxDocRecurso = ref(utils.sizeMaxDocRecurso)
let nombre = ref('')
let nombreArchivo = ref('')
let descripcion = ref('')
let normativaFile = ref(null)


const service = new NormativaService()
const normativas = service.getNormativas()

function onFileChange(e) {
    const file = e.target.files[0]
    normativaFile.value = file
}
onMounted(async () => {
    await getNormativas()
})
const crearNormativa = async () => {
    await service.crearNormativa(nombre.value, descripcion.value, normativaFile.value, idCenad.value)
    nombre.value = ''
    normativaFile.value = ''
    descripcion.value = ''
    await getNormativas()
}
const getNormativas = async () => {
    await service.fetchAll(idCenad.value)
}

function actualizarNormativaEnView() {
    getNormativas()
}
// Validación: todos los campos deben estar llenos
const formularioValidado = computed(() => {
    return (
        nombre.value.trim() != '' &&
        descripcion.value.trim() != '' &&
        normativaFile.value.trim() != ''
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
