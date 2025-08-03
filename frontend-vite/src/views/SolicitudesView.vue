<template>
    <!-- muestra la vista principal de la gestión de solicitudes. -->
    <div class="d-flex align-items-center position-relative p-2 bg-light">
        <RouterLink class="nav-link volver" :to="{ name: 'cenad-home', params: { id: idCenad } }">
            <v-icon name="fa-arrow-alt-circle-left" scale="2" class="me-2" /><strong>Volver</strong>
        </RouterLink>
        <h3 class="position-absolute start-50 translate-middle-x m-0 mb-3 titulo">
            <u>SOLICITUDES</u>
        </h3>
        <button class="btn text-white ms-auto" data-bs-toggle="modal" data-bs-target="#modal-nueva-solicitud">
            Nueva <b>Solicitud</b>
        </button>
    </div>
    <div class="mt-0">
        <div class="row solicitadas-validadas mb-3">
            <div class="col-6 solicitadas">
                <SolicitudesEstadoComponent :estado="'Solicitada'" />
            </div>
            <div class="col-6 validadas">
                <SolicitudesEstadoComponent :estado="'Validada'" />
            </div>
        </div>
    </div>
    <div class="row rechazadas-canceladas mb-3">
        <div class="col-6 rechazadas">
            <SolicitudesEstadoComponent :estado="'Rechazada'" />
            <hr class='w-100 titulo-rechazadas'>
        </div>
        <div class="col-6 borrador">
            <SolicitudesEstadoComponent :estado="'Borrador'" />
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modal-nueva-solicitud" tabindex="-1" aria-labelledby="modal-nueva-solicitud-Label"
        aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-nueva-solicitud-Label">
                        Nueva Solicitud
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="formulario">
                       
                        <div class="row py-2 justify-content-between">
                            <div class="col-lg-3 col-md-12 ms-2 mt-2">
                                <label class="me-2">Unidad Solicitante: <sup class="text-danger">*</sup></label>
                                <input type="text" class="form-control" v-model="nombreUnidad"
                                    placeholder="Unidad Solicitante" name="UcoSol" readonly />
                            </div>
                            <div class="col-lg-2 col-md-12 ms-2">
                                <label for="validationServer02">Fecha Solicitud: <sup class="text-danger"></sup></label>
                                <input type="date" class="form-control" v-model="fechaSolicitud"
                                    placeholder="dd-MM-yyyy" required name="fechaSol" />
                            </div>
                            <div class="col-lg-3 col-md-12 ms-2 me-2">
                                <label>Unidad Usuaria: <sup class="text-danger">*</sup></label>
                                <input type="text" class="form-control" v-model="unidadUsuaria"
                                    placeholder="Unidad Usuaria" name="UcoUsuaria" required minlength="4"
                                    maxlength="30" />
                            </div>
                        </div>
                        <div class="row py-2 mt-2 justify-content-between">
                            <div class="col-lg-3 col-md-12 ms-2">
                                <label>POC para el EJERCICIO: <sup class="text-danger">*</sup></label>
                                <input type="text" class="form-control" v-model="pocEjercicio"
                                    placeholder="POC para el Ejercicio" name="pocEjercicio" required />
                            </div>
                            <div class="col-lg-3 col-md-12 ms-2">
                                <label>Jefe Unidad Usuaria: <sup class="text-danger">*</sup></label>
                                <input type="text" class="form-control" v-model="jefeUnidadUsuaria"
                                    placeholder="Jefe UCO Usuaria" name="jefeUcoUsuaria" required minlength="8"
                                    maxlength="20" />
                            </div>
                            <div class="col-lg-3 col-md-12 ms-2 me-2">
                                <label>Redactor (Teléfono): <sup class="text-danger">*</sup></label>
                                <input type="text" class="form-control" v-model="tlfnRedactor"
                                    placeholder="RCT UCO/ RCT durante EX" name="tfno" required />
                            </div>
                        </div>
                        <div class="row py-2 mt-2 justify-content-between">
                            <div class="col-lg-3 col-md-12 ms-2">
                                <label class="d-block">Categoría Seleccionada: <sup class="text-danger me-2">*</sup></label>
                                <input type="text" class="form-control ms-2" v-if="recurso && categoria"
                                    v-model="nombreCategoria" name="categoria1" readonly />

                                <label class="me-5">Categoría: <sup class="text-danger me-3">*</sup>{{
                                    categoriaSeleccionada?.nombre }}</label>
                                <!--el filtro de elegir categorias-->

                                <select name="categoriasFiltradas" id="categoriasFiltradas"
                                    v-model="categoriaSeleccionada">
                                    <option>a
                                    </option>
                                </select>


                                <button class="btn-filtros mt-2 ms-1" v-if='categoriaSeleccionada'>Borrar Filtros
                                    Categoria</button>
                            </div>
                            <!--el filtro de elegir recurso segun categoria-->
                            <div class="col-lg-3 col-md-12 ms-2">
                                <label>Recurso: <sup class="text-danger me-2">*</sup></label>
                                <select name="recursosFiltrados" id="recursosFiltrados" v-model="uRlRecursoSeleccionado"
                                    required>
                                    <option>{{
                                        recurso?.nombre }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-lg-2 col-md-12 ms-2">
                                <label for="validationServer02">Fecha-Hora Inicio: <sup
                                        class="text-danger"></sup></label>
                                <input type="datetime-local" class="form-control" v-model="fechaInicio"
                                    placeholder="dd-MM-yyyy HH:mm:ss" required />
                            </div>
                            <div class="col-lg-2 col-md-12 me-2">
                                <label for="validationServer02">Fecha-Hora Fin: <sup class="text-danger"></sup></label>
                                <input type="datetime-local" class="form-control" v-model="fechaFin"
                                    placeholder="dd-MM-yyyy HH:mm:ss" required />
                            </div>
                        </div>
                        <div class="row py-2 mt-2 justify-content-center me-3">
                            <div class="col-lg-12 col-md-12 ms-2">
                                <label class="ms-2">Observaciones: <sup class="text-danger">*</sup></label>
                                <textarea class="form-control ms-2" name="observacionesUco"
                                    v-model="observaciones" placeholder="Observaciones de la UCO"> 
                                </textarea>
                            </div>
                        </div>             
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t('comun.cerrar') }}
                    </button>
                    <button type="button" @click="crearSolicitud" data-bs-dismiss="modal" class="btn btn-primary"
                        :disabled="!formularioValidado">
                        Crear Solicitud
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import useAuthStore from '@/stores/auth'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SolicitudService from '@/services/SolicitudService'
import SolicitudesEstadoComponent from '@/components/SolicitudesEstadoComponent.vue'
const auth = useAuthStore()
const route = useRoute()
const idCenad = computed(() => route.params.id)
let observaciones = ref('')
let jefeUnidadUsuaria = ref('')
let unidadUsuaria = ref('')
let pocEjercicio = ref('')
let tlfnRedactor = ref('')
let fechaSolicitud = ref()
let fechaInicio = ref()
let fechaFin = ref()
let idRecurso = ref('1')

const service = new SolicitudService()
const solicitudes = service.getSolicitudes()

onMounted(async () => {
    await getSolicitudes()
})

async function getSolicitudes() {
    await service.fetchAll(idCenad.value)
}

function actualizarSolicitudEnView() {
    getSolicitudes()
}
const crearSolicitud = async () => {
    console.log(fechaSolicitud.value)//2025-08-04T19:34

    await service.crearSolicitud(observaciones.value, unidadUsuaria.value, jefeUnidadUsuaria.value, pocEjercicio.value, tlfnRedactor.value, fechaSolicitud.value, fechaInicio.value, fechaFin.value, idCenad.value, idRecurso.value, auth.usuario.idString)
        observaciones.value = '',
        unidadUsuaria.value = '',
        jefeUnidadUsuaria.value = '',
        pocEjercicio.value = '',
        tlfnRedactor.value = '',
        fechaSolicitud.value = null,
        fechaInicio.value = null,
        fechaFin.value = null,
        idRecurso.value = ''
    getSolicitudes()
}
// Validación: todos los campos deben estar llenos
const formularioValidado = computed(() => {
    if (!observaciones.value || !unidadUsuaria.value || !jefeUnidadUsuaria.value || !pocEjercicio.value || !tlfnRedactor.value || !fechaSolicitud.value || !fechaInicio.value || !fechaFin.value || !idRecurso.value) return false
    return observaciones.value.trim() != '' && unidadUsuaria.value.trim() != '' && jefeUnidadUsuaria.value != '' && pocEjercicio.value != '' && tlfnRedactor.value != '' && fechaSolicitud.value != null && fechaInicio.value != null && fechaFin.value != null && idRecurso.value != ''
})
</script>
<style scoped lang="scss">
.btn {
    background: #588157;
    padding: 0.5;
    font-size: 14px;
}

.btn:hover {
    background-color: #a3b18a;
}

.titulos {
    color: #3a5a40;
    font-weight: bold;
    font-size: small;
}

.titulo1 {
    color: #588157;
}

h5 {
    color: #354f52;
    font-weight: bold;
}

.modal {
    max-height: 100%;
    max-width: 100%;
    margin: auto;
}

.row {
    height: auto;
    padding: auto;
    margin: auto;
}

hr {
    margin-bottom: 1;
    margin-top: 0;
}

hr.separacion {
    margin-bottom: 1;
    margin-top: 5;
    border: 2px solid #354f52;
}

select {
    color: #588157;
}

label span {
    color: #3a5a40;
    font-weight: bold;
}

div.validadas,
div.canceladas,
div.solicitadas,
div.rechazadas,
div.borrador {
    border: 3px solid #354f52;
}

.titulo-solicitadas {
    margin-top: 5px;
    color: #3a5a40;
    font-weight: bold;
    text-shadow: 1px 1px 1px #a3b18a;
    background-color: #dad7cd;
}

hr.titulo-solicitadas {
    color: #a3b18a;
    border: 4px;
    border-style: double;
}

.titulo-validadas {
    margin-top: 5px;
    color: blanchedalmond;
    font-weight: bold;
    text-shadow: 1px 1px 2px #344e41;
    background-color: #588157;
}

hr.titulo-validadas {
    color: #588157;
    border: 4px;
    border-style: double;
}

.titulo-rechazadas {
    margin-top: 10px;
    color: maroon;
    font-weight: bold;
    text-shadow: 1px 1px 2px wheat;
    background-color: #a3b18a;
}

hr.titulo-rechazadas {
    color: #344e41;
    border: 4px;
    border-style: double;
}

.titulo-canceladas,
.titulo-borrador {
    margin-top: 10px;
    color: #dad7cd;
    font-weight: bold;
    text-shadow: 1px 1px 2px black;
    background-color: #344e41;
}

hr.titulo-canceladas,
hr.titulo-borrador {
    color: #dad7cd;
    border: 4px;
    border-style: double;
}

h6.no-existen {
    color: #a3b18a;
    text-shadow: #344e41;
    font-weight: bold;
    font-size: x-large;
}

label.ver-todas {
    font-size: medium;
}

.ver-todas:hover {
    color: aquamarine;
    font-weight: bold;
    text-shadow: 10px 10px 20px yellowgreen;
}

a.volver {
    color: #3a5a40;
    font-size: 14px;
}

a.volver:hover {
    color: #a3b18a;
}
.modal-content {
  height: 100vh;        /* Ocupa el 100% de la altura de la pantalla */
  border-radius: 0;     /* Quita esquinas redondeadas para fullscreen */
}

.modal-body {
  overflow-y: auto;     /* Scroll solo si el contenido se pasa */
  max-height: calc(100vh - 120px); /* Deja espacio para header y footer */
}
.formulario {
  color: #3a5a40;
  font-weight: bold;
  text-shadow: 1px 1px 1px #a3b18a;
  background-color: #dad7cd;
}
</style>