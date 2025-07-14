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
        <div class="row align-items-center">
            <div class="col-4 pl-0">
                <RouterLink class="nav-link ml-4 home" :to="{ name: 'about' }">
                    <v-icon name="gi-dog-house" color="blue" scale="2" /><strong>Home</strong>
                </RouterLink>
            </div>
            <div class="col-8 text-right">
                <button class="btn usuario text-white me-2">
                    <RouterLink :to="{ name: 'about' }"> <b>Usuarios</b></RouterLink>
                </button>
                <button class="btn unidad text-white me-2">
                    <RouterLink :to="{ name: 'about' }"> <b>Unidades</b></RouterLink>
                </button>
                <button class="btn tipoFormulario text-white me-2">
                    <RouterLink :to="{ name: 'about' }"> <b>Tipos de Formulario</b></RouterLink>
                </button>
                <button class="btn categoriaFichero text-white me-2">
                    <RouterLink :to="{ name: 'about' }"> <b>Categorías de Ficheros</b></RouterLink>
                </button>
                <button class="btn arma text-white me-2">
                    <RouterLink :to="{ name: 'about' }"> <b>Armas</b></RouterLink>
                </button>
            </div>
            <hr class="w-100" />
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



                <!-- aqui ira el componente que lista los CENAD,s
                <CenadComponent v-for="(item, index) in props.content" :key="index" :content="item"
                    @emiteElemento="actualizarCenadEnLayout" />
            -->
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
                                <option v-for="provincia in provincias" :key="provincia.idProvincia" :value="provincia.idProvincia">
                                    {{ provincia.nombre}}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>DIRECCIÓN<sup class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="direccion" v-model="direccion" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>TELÉFONO<sup class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="telefono" v-model="telefono" />
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
                            <input type="file" class="form-control" @click="cargarArchivo" />
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
import { defineAsyncComponent, ref, onMounted } from 'vue'
import ClienteService from '@/services/ClienteService'

let provincias = ref([
    { idProvincia: 15, nombre: "A CORUÑA" },
    { idProvincia: 1, nombre: "ALAVA" },
    { idProvincia: 2, nombre: "ALBACETE" },
    { idProvincia: 3, nombre: "ALICANTE" },
    { idProvincia: 4, nombre: "ALMERIA" },
    { idProvincia: 33, nombre: "ASTURIAS" },
    { idProvincia: 5, nombre: "AVILA" },
    { idProvincia: 6, nombre: "BADAJOZ" },
    { idProvincia: 8, nombre: "BARCELONA" },
    { idProvincia: 9, nombre: "BURGOS" },
    { idProvincia: 10, nombre: "CACERES" },
    { idProvincia: 11, nombre: "CADIZ" },
    { idProvincia: 39, nombre: "CANTABRIA" },
    { idProvincia: 12, nombre: "CASTELLON" },
    { idProvincia: 51, nombre: "CEUTA" },
    { idProvincia: 13, nombre: "CIUDAD REAL" },
    { idProvincia: 14, nombre: "CORDOBA" },
    { idProvincia: 16, nombre: "CUENCA" },
    { idProvincia: 17, nombre: "GERONA" },
    { idProvincia: 18, nombre: "GRANADA" },
    { idProvincia: 19, nombre: "GUADALAJARA" },
    { idProvincia: 20, nombre: "GUIPUZCOA" },
    { idProvincia: 21, nombre: "HUELVA" },
    { idProvincia: 22, nombre: "HUESCA" },
    { idProvincia: 7, nombre: "ISLAS BALEARES" },
    { idProvincia: 23, nombre: "JAEN" },
    { idProvincia: 26, nombre: "LA RIOJA" },
    { idProvincia: 24, nombre: "LEON" },
    { idProvincia: 25, nombre: "LERIDA" },
    { idProvincia: 27, nombre: "LUGO" },
    { idProvincia: 28, nombre: "MADRID" },
    { idProvincia: 29, nombre: "MALAGA" },
    { idProvincia: 52, nombre: "MELILLA" },
    { idProvincia: 30, nombre: "MURCIA" },
    { idProvincia: 31, nombre: "NAVARRA" },
    { idProvincia: 32, nombre: "OURENSE" },
    { idProvincia: 34, nombre: "PALENCIA" },
    { idProvincia: 35, nombre: "LAS PALMAS" },
    { idProvincia: 36, nombre: "PONTEVEDRA" },
    { idProvincia: 37, nombre: "SALAMANCA" },
    { idProvincia: 40, nombre: "SEGOVIA" },
    { idProvincia: 41, nombre: "SEVILLA" },
    { idProvincia: 42, nombre: "SORIA" },
    { idProvincia: 38, nombre: "STA CRUZ TENERIFE" },
    { idProvincia: 43, nombre: "TARRAGONA" },
    { idProvincia: 44, nombre: "TERUEL" },
    { idProvincia: 45, nombre: "TOLEDO" },
    { idProvincia: 46, nombre: "VALENCIA" },
    { idProvincia: 47, nombre: "VALLADOLID" },
    { idProvincia: 48, nombre: "VIZCAYA" },
    { idProvincia: 49, nombre: "ZAMORA" },
    { idProvincia: 50, nombre: "ZARAGOZA" },
  ])

let nombre = ref('')
let provincia = ref('')
let direccion = ref('')
let telefono = ref('')
let descripcion = ref('')
let email = ref('')
let escudo = ref('')
const service = new ClienteService()
const clientes = service.getClientes()
let clientesFiltrados = ref([])
clientesFiltrados.value = clientes.value

onMounted(async () => {
    await getClientes()
})
const crearCenad = async () => {
    await service.crearCenad(dni.value, nombreCliente.value, apellido1.value, apellido2.value, tfno.value, correoCliente.value)
    dni.value = ''
    nombreCliente.value = ''
    apellido1.value = ''
    apellido2.value = ''
    tfno.value = ''
    correoCliente.value = ''
    await getClientes()
}
const getClientes = async () => {
    await service.fetchAll()
    clientesFiltrados.value = clientes.value

}

function actualizarCenadEnLayout() {
    getClientes()
}
</script>
<style scoped lang="scss">
</style>
