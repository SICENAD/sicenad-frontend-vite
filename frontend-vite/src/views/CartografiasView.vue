<template>
    <!-- muestra la vista de cartografías -->
    <div class="container-fluid">
        <div class="row ms-4 mb-0 ps-3">
            <RouterLink class="nav-link volver" :to="{ name: 'cenad-home', params: { id: idCenad } }">
                <v-icon name="fa-arrow-alt-circle-left" scale="2" class="me-2" /><strong>Volver</strong>
            </RouterLink>
        </div>
        <div class="row mt-1">
            <div class="col-9 text-center">
                <h3 class="text-center titulo1"><u>CARTOGRAFÍA DEL {{ auth.cenad.nombre }}</u></h3>
            </div>
            <div class="col-3 justify-content-end">
                <button class="btn text-white " data-bs-toggle="modal" data-bs-target="#modal-nueva-cartografia">
                    Nueva <b>Cartografía</b>
                </button>
            </div>
        </div>
        <hr class='w-100'>
        <div class="row ms-5 p-0">
            <div class="col col-md-12">
                <div class="row mt-2 titulos">
                    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 titulo">
                        <b>NOMBRE</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo">
                        <b>ESCALA</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-5 col-lg-5 col-xl-5 titulo ">
                        <b>DESCRIPCIÓN</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 titulo text-center">
                        <b>DESCARGA</b>
                    </div>
                </div>
                <CartografiaComponent v-for="(item, index) in cartografias" :key="index" :content="item"
                    :idCenad="idCenad" @emiteElemento="actualizarCartografiaEnView" />
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modal-nueva-cartografia" tabindex="-1" aria-labelledby="modal-nueva-cartografia-Label"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-nueva-cartografia-Label">
                        Nueva Cartografía
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="titulo"><b>NOMBRE DE LA CARTOGRAFÍA<sup
                                        class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>ESCALA<sup class="text-danger">*</sup></b></label>
                            <select class="form-select" aria-label="escala" v-model="escala">
                                <option disabled value="">Selecciona la escala</option>
                                <option v-for="(escala, index) in escalas" :key="index"
                                    :value="escala">
                                    {{ escala }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
                            <input type="textarea" class="form-control letra" id="descripcion" v-model="descripcion" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>ARCHIVO<sup class="text-danger mr-2">*</sup></b> (Tamaño máximo
                                permitido: {{ sizeMaxCartografia }} GB)</label>
                            <input type="file" accept="*" @change="onFileChange" />{{ nombreArchivo }}
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t('comun.cerrar') }}
                    </button>
                    <button type="button" @click="crearCartografia" data-bs-dismiss="modal" class="btn btn-primary">
                        Crear Cartografía
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import useAuthStore from '@/stores/auth'
import { ref, onMounted, computed } from 'vue'
import useUtilsStore from '@/stores/utils'
import { useRoute } from 'vue-router'
import CartografiaComponent from '@/components/CartografiaComponent.vue'
import CartografiaService from '@/services/CartografiaService'

const utils = useUtilsStore()
const auth = useAuthStore()
const route = useRoute()
const idCenad = computed(() => route.params.id)
let escalas = utils.escalasCartografia
let sizeMaxCartografia = ref(utils.sizeMaxCartografia)
let nombre = ref('')
let nombreArchivo = ref('')
let descripcion = ref('')
let escala = ref('')
let cartografiaFile = ref(null)


const service = new CartografiaService()
const cartografias = service.getCartografias()

function onFileChange(e) {
    const file = e.target.files[0]
    cartografiaFile.value = file
}
onMounted(async () => {
    await getCartografias()
})
const crearCartografia = async () => {
    await service.crearCartografia(nombre.value, descripcion.value, escala.value, cartografiaFile.value, idCenad.value)
    nombre.value = ''
    cartografiaFile.value = ''
    descripcion.value = '',
    escala.value = ''
    await getCartografias()
}
const getCartografias = async () => {
    await service.fetchAll(idCenad.value)
}

function actualizarCartografiaEnView() {
    getCartografias()
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
