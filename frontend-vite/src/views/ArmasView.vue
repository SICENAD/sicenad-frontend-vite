<template>
    <!-- muestra la vista de armas -->
    <div class="container-fluid">

        <div class="row ms-4 mb-0 ps-3">
            <RouterLink class="nav-link volver" :to="{ name: 'superadministrador' }">
                <v-icon name="fa-arrow-alt-circle-left" scale="2" class="me-2" /><strong>Volver</strong>
            </RouterLink>
        </div>
        <div class="row mt-4">
            <div class="col-9 text-center">
                <h3 class="text-center titulo1"><u>GESTIÓN DE ARMAS</u> </h3>
            </div>
            <div class="col-3 justify-content-end">
                <button class="btn text-white " data-bs-toggle="modal" data-bs-target="#modal-nuevo-arma">
                    Nuevo <b>Arma</b>
                </button>
            </div>
        </div>
        <hr class='w-100'>

        <div class="row ms-5 p-0">
            <div class="col col-md-12">
               
                <div class="row mt-2 titulos">
                    <div class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 titulo">
                        <b>NOMBRE</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 titulo">
                        <b>TIPO DE TIRO</b>
                    </div>
                </div>
                <ArmaComponent v-for="(item, index) in armas" :key="index" :content="item"
                    @emiteElemento="actualizarArmaEnView" />
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modal-nuevo-arma" tabindex="-1" aria-labelledby="modal-nuevo-arma-Label"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-nuevo-arma-Label">
                        Nuevo Arma
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="titulo"><b>NOMBRE DEL ARMA<sup class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo me-2"><b>TIPO DE TIRO<sup class="text-danger">*</sup></b></label>
                            <select class="form-select" aria-label="tipoTiro" v-model="tipoTiro">
                                <option disabled value="">Selecciona el Tipo de tiro</option>
                                <option v-for="(tipoTiro, index) in tiposTiro" :key="index"
                                    :value="tipoTiro">
                                    {{ tipoTiro }}
                                </option>
                            </select>
                        </div>


                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t('comun.cerrar') }}
                    </button>
                    <button type="button" @click="crearArma" data-bs-dismiss="modal" class="btn btn-primary">
                        Crear Arma
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import ArmaComponent from '@/components/ArmaComponent.vue'
import ArmaService from '@/services/ArmaService'
import useUtilsStore from '@/stores/utils'

const utils = useUtilsStore()
let tiposTiro = utils.tiposTiro
let nombre = ref('')
let tipoTiro = ref('')

const service = new ArmaService()
const armas = service.getArmas()

onMounted(async () => {
    await getArmas()
})
const crearArma = async () => {
    await service.crearArma(nombre.value, tipoTiro.value)

    nombre.value = ''
    tipoTiro.value = ''
    await getArmas()
}
const getArmas = async () => {
    await service.fetchAll()
}

function actualizarArmaEnView() {
    getArmas()
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
  height: 1.5em;
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
