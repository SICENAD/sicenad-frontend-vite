<template>
    <!-- muestra la vista principal del superadministrador -->
    <div class="container-fluid">
        <div class="row">
            <div class="col col-md-2 p-3">
                <img class="madoc" width="80" height="110" alt="MADOC" src="/img/madoc.png" />
            </div>
            <div class="col col-md-7 align-self-center mt-4">
                <h3 class="bienvenido text-center titulo1"><u>SUPERADMINISTRADOR</u></h3>
            </div>
            <div class="col col-md-1 mt-4 ml-5">
                <h2 class="text-center">SICENAD</h2>
            </div>
        </div>
        <div class="row ">
            <div class="col-4 ps-0">
                <RouterLink class="nav-link ml-4 home" :to="{ name: 'about' }">
                    <v-icon name="fa-home" scale="2" /><strong>Home</strong>
                </RouterLink>
            </div>
            <div class="col-8 d-flex justify-content-end">
                <button class="btn usuario me-2">
                    <RouterLink :to="{ name: 'about' }" class="link"><b>Usuarios</b></RouterLink>
                </button>
                <button class="btn unidad text-white me-2">
                    <RouterLink :to="{ name: 'unidades' }" class="link"><b>Unidades</b></RouterLink>
                </button>
                <button class="btn tipoFormulario text-white me-2">
                    <RouterLink :to="{ name: 'tiposFormulario' }" class="link"><b>Tipos de Formulario</b></RouterLink>
                </button>
                <button class="btn categoriaFichero text-white me-2">
                    <RouterLink :to="{ name: 'categoriasFichero' }" class="link"><b>Categorías de Ficheros</b></RouterLink>
                </button>
                <button class="btn arma text-white me-2">
                    <RouterLink :to="{ name: 'armas' }" class="link"><b>Armas</b></RouterLink>
                </button>
            </div>
            <hr class="w-100 mt-3" />
        </div>
        <div class="row ms-5 p-0">
            <div class="col col-md-12">
                <h5 class="text-center titulo"><b>CENAD,s/CMT,s</b></h5>
                <hr class="w-100" />
                <div class="row justify-content-end mb-1 mt-1">
                    <button class="btn text-white col-2" data-bs-toggle="modal" data-bs-target="#modal-nuevo-cenad">
                        Nuevo <b>CENAD/CMT</b>
                    </button>
                </div>
                <hr class="w-100" />
                <div class="row mt-2 titulos">
                    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 titulo">
                        <b>CENAD/CMT</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 titulo">
                        <b>PROVINCIA</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 titulo">
                        <b>ADMINISTRADOR</b>
                    </div>
                </div>
                <CenadComponent v-for="(item, index) in cenads" :key="index" :content="item"
                    @emiteElemento="actualizarCenadEnView" />
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modal-nuevo-cenad" tabindex="-1" aria-labelledby="modal-nuevo-cenad-Label"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-nuevo-cenad-Label">
                        Nuevo CENAD/CMT
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="titulo"><b>CENAD/CMT<sup class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo me-2"><b>PROVINCIA<sup class="text-danger">*</sup></b></label>
                            <select class="form-select" aria-label="provincia" v-model="provincia">
                                <option disabled value="">Selecciona la provincia</option>
                                <option v-for="provincia in provincias" :key="provincia.idProvincia"
                                    :value="provincia.idProvincia">
                                    {{ provincia.nombre }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>DIRECCIÓN<sup class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="direccion" v-model="direccion" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>TELÉFONO<sup class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="tfno" v-model="tfno" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>EMAIL</b></label>
                            <input type="email" class="form-control letra" id="email" v-model="email" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
                            <input type="textarea" class="form-control letra" id="descripcion" v-model="descripcion" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>ESCUDO<sup class="text-danger mr-2">*</sup></b> (Tamaño máximo
                                permitido: {{ sizeMaxEscudo }} MB)</label>
                            <input type="file" accept="image/*" @change="onFileChange" />{{ escudo }}
                        </div>
                        <!-- Vista previa de la imagen -->
                        <div v-if="previewEscudo" style="margin-top: 10px;">
                            <label><b>Vista previa del escudo:</b></label><br />
                            <img :src="previewEscudo" alt="Vista previa" style="max-height: 100px;" class="img-thumbnail" />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t('comun.cerrar') }}
                    </button>
                    <button type="button" @click="crearCenad" data-bs-dismiss="modal" class="btn btn-primary">
                        Crear CENAD/CMT
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import CenadComponent from '@/components/CenadComponent.vue'
import CenadService from '@/services/CenadService'
import useUtilsStore from '@/stores/utils'

const utils = useUtilsStore()
let provincias = utils.provincias
let sizeMaxEscudo = ref(utils.sizeMaxEscudo)
let nombre = ref('')
let provincia = ref('')
let direccion = ref('')
let tfno = ref('')
let descripcion = ref('')
let email = ref('')
let escudoFile = ref(null)
const previewEscudo = ref(null) // <-- URL para vista previa

const service = new CenadService()
const cenads = service.getCenads()


function onFileChange(e) {
  const file = e.target.files[0]
  escudoFile.value = file

  if (file) {
    previewEscudo.value = URL.createObjectURL(file)
  } else {
    previewEscudo.value = null
  }
}


onMounted(async () => {
    await getCenads()
})
const crearCenad = async () => {
    await service.crearCenad(nombre.value, provincia.value, direccion.value, tfno.value, email.value, descripcion.value, escudoFile.value)

    nombre.value = ''
    provincia.value = ''
    direccion.value = ''
    tfno.value = ''
    email.value = ''
    descripcion.value = ''
    escudoFile.value = ''
    this.previewEscudo.value = null
    await getCenads()
}
const getCenads = async () => {
    await service.fetchAll()
}

function actualizarCenadEnView() {
    getCenads()
}
</script>
<style scoped lang="scss">
h2 {
    color: #354f52;
}

.bienvenido {
    color: #52796f;
}

img.madoc {
    max-width: 200;
    max-height: 276;
}

div.filtro {
    border: 6px solid #588157;
    border-top: 0px;
    border-bottom: 0px;
    border-right: 0px;
}

.btn {
    background: #A3B18A;
    padding: 0.5;
    font-size: 14px;
    color: white;
}

.btn:hover,
.tipoFormulario,
.categoriaFichero,
.unidad,
.usuario,
.arma,
.link {
    background-color: #588157;
    color: white;
    text-decoration: none;
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
    background-color: lightgreen;
}

.tipoFormulario:hover,
.categoriaFichero:hover,
.unidad:hover,
.usuario:hover,
.arma:hover {
    background-color: #A3B18A;
}

a.home {
    color: #3A5A40;
    font-size: 18px;
}

a.home:hover {
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

.modal {
    max-height: 100%;
    max-width: 100%;
    margin: auto;
}

div.titulos {
    background-color: #DAD7CD;
}
</style>
