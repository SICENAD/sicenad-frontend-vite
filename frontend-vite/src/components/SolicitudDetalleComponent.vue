<template>

    <div class="container mt-4">
        <h1> {{ $t('solicitudes.editarSolicitud') }}{{ idSolicitud }} </h1>
        <form class="formulario">
            <!--cuando se abra como no editable todo el form sera de lectura-->
            <fieldset :disabled="!isEditable">
                <div class="row py-2 justify-content-between">
                    <div class="col-lg-2 col-md-12">
                        <label class="me-2">Unidad Solicitante: <sup class="text-danger">*</sup></label>
                        <label class="form-control">{{ solicitud?.unidadUsuaria }}</label>
                    </div>
                    <div class="col-lg-2 col-md-12">
                        <label>Jefe Unidad Usuaria: <sup class="text-danger">*</sup></label>
                        <input type="text" class="form-control" v-model="jefeUnidadUsuaria"
                            placeholder="Jefe UCO Usuaria" name="jefeUcoUsuaria" required minlength="8"
                            maxlength="20" />
                    </div>
                    <div class="col-lg-2 col-md-12">
                        <label for="validationServer02">Fecha Solicitud: <sup class="text-danger"></sup></label>
                        <input type="date" class="form-control" v-model="fechaSolicitud" placeholder="dd-MM-yyyy"
                            required name="fechaSol" readonly />
                    </div>
                    <div class="col-lg-2 col-md-12">
                        <label>POC para el EJERCICIO: <sup class="text-danger">*</sup></label>
                        <input type="text" class="form-control" v-model="pocEjercicio"
                            placeholder="POC para el Ejercicio" name="pocEjercicio" required />
                    </div>
                    <div class="col-lg-2 col-md-12">
                        <label>Redactor (Teléfono): <sup class="text-danger">*</sup></label>
                        <input type="text" class="form-control" v-model="tlfnRedactor"
                            placeholder="RCT UCO/ RCT durante EX" name="tfno" required />
                    </div>
                </div>
                <div class="row py-2 mt-2 justify-content-between">
                    <div class="col-lg-4 col-md-12">
                        <label>Recurso: <sup class="text-danger me-2">*</sup></label>
                        <label class="form-control">{{ recurso?.nombre }}</label>
                    </div>
                    <div class="col-lg-2 col-md-12">
                        <label for="validationServer02">Fecha-Hora Inicio: <sup class="text-danger"></sup></label>
                        <input type="datetime-local" class="form-control" v-model="fechaHoraInicioRecurso"
                            placeholder="dd-MM-yyyy HH:mm:ss" required />
                    </div>
                    <div class="col-lg-2 col-md-12">
                        <label for="validationServer02">Fecha-Hora Fin: <sup class="text-danger"></sup></label>
                        <input type="datetime-local" class="form-control" v-model="fechaHoraFinRecurso"
                            placeholder="dd-MM-yyyy HH:mm:ss" required />
                    </div>
                </div>
                <div class="row py-2 mt-2 justify-content-center me-3">
                    <div class="col-lg-12 col-md-12">
                        <label>Observaciones: <sup class="text-danger">*</sup></label>
                        <textarea class="form-control" name="observacionesUco" v-model="observaciones"
                            placeholder="Observaciones de la UCO">
                                </textarea>
                    </div>
                </div>
                <div class="row py-2 mt-2 justify-content-center me-3">
                    <div class="col-lg-12 col-md-12">
                        <label>Observaciones del CENAD/CMT: <sup class="text-danger">*</sup></label>
                        <textarea class="form-control" name="observacionesCenad" v-model="observacionesCenad"
                            placeholder="Observaciones del CENAD/CMT">
                                </textarea>
                    </div>
                </div>
                <div class="row py-2 mt-2 justify-content-start">
                    <div class="col-auto d-flex align-items-center">
                        <label class="me-2 mb-0">
                            <b>Estado de la solicitud: <sup class="text-danger">*</sup></b>
                        </label>
                        <select class="form-select form-select-sm w-auto" aria-label="estado" v-model="estado">
                            <option v-for="(estado, index) in estados" :key="index" :value="estado">
                                {{ estado }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="row py-2 mt-2 justify-content-start">
                    <div class="col-auto d-flex align-items-center">
                        <label class="me-2 mb-0">
                            <b>Fecha Fin Documentación: <sup class="text-danger">*</sup></b>
                        </label>
                        <input type="date" class="form-control w-auto" v-model="fechaFinDocumentacion"
                            placeholder="dd-MM-yyyy" required name="fechaFinDocumentacion" />
                    </div>
                </div>
                <div class="mb-4">
                    <FicherosDeSolicitudComponent :isCenad=true :idSolicitud="idSolicitud" />
                </div>
                <div>
                    <FicherosDeSolicitudComponent :isCenad=false :idSolicitud="idSolicitud" />
                </div>








            </fieldset>
        </form>
        <div>
            <router-link :to="{ name: 'solicitudes', params: { id: idCenad } }" class="btn btn-secondary me-2">
                {{ $t('comun.cerrar') }}
            </router-link>
            <button class="btn btn-danger" :data-bs-target="'#' + idModalEliminar" data-bs-toggle="modal"
                v-if="isEditable">
                {{ $t('solicitudes.borrarSolicitud') }}
            </button>
            <button type="button" @click="editarSolicitud" data-bs-dismiss="modal" class="btn btn-success"
                :disabled="!formularioValidado" v-if="isEditable">
                {{ $t('solicitudes.guardarSolicitud') }}
            </button>
        </div>
    </div>
    <!-- Modal para eliminar-->
    <div class="modal fade" :id="idModalEliminar" aria-hidden="true" aria-labelledby="confirmaEliminar-Label"
        tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="confirmaEliminar-Label">
                        {{ $t('solicitudes.eliminarSolicitud') }}{{ fechaSolicitud }}
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">{{ $t('solicitudes.preguntaEliminar') }}{{ fechaSolicitud }}?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t('comun.cerrar') }}
                    </button>
                    <button type="button" @click="borrarSolicitud" data-bs-dismiss="modal" class="btn btn-danger">
                        {{ $t('comun.borrar') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import SolicitudService from '@/services/SolicitudService'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import { formatDate, formatDateTime } from '@/utils'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import FicherosDeSolicitudComponent from './FicherosDeSolicitudComponent.vue'
import RecursoService from '@/services/RecursoService'
const auth = useAuthStore()
const idCenad = computed(() => route.params.id)
const idSolicitud = computed(() => route.params.idSolicitud)
const emits = defineEmits(['emiteModal'])
const route = useRoute()
const utils = useUtilsStore()
const service = new SolicitudService()
const recursoService = new RecursoService()
const estados = utils.estadosSolicitud
const isEditable = ref(false)
const solicitud = ref()
const observaciones = ref(solicitud.observaciones)
const jefeUnidadUsuaria = ref(solicitud.jefeUnidadUsuaria)
const pocEjercicio = ref(solicitud.pocEjercicio)
const tlfnRedactor = ref(solicitud.tlfnRedactor)
const fechaSolicitud = ref()
const fechaHoraInicioRecurso = ref(solicitud.fechaHoraInicioRecurso)
const fechaHoraFinRecurso = ref(solicitud.fechaHoraFinRecurso)
const estado = ref(solicitud.estado)
const observacionesCenad = ref(solicitud.observacionesCenad)
const fechaFinDocumentacion = ref(solicitud.fechaFinDocumentacion)
const isAdminEsteCenad = ref(false)
const isGestorEsteCenad = ref(false)
const recurso = ref()


const idModalEliminar = 'modal-categoria-eliminar' + solicitud.idString
watch(
    () => solicitud.value,
    (newContent) => {
        if (!newContent) return
        fechaSolicitud.value = formatDate(newContent.fechaSolicitud)
        fechaHoraInicioRecurso.value = formatDateTime(newContent.fechaHoraInicioRecurso)
        fechaHoraFinRecurso.value = formatDateTime(newContent.fechaHoraFinRecurso)
        estado.value = newContent.estado
        jefeUnidadUsuaria.value = newContent.jefeUnidadUsuaria
        pocEjercicio.value = newContent.pocEjercicio
        tlfnRedactor.value = newContent.tlfnRedactor
        observaciones.value = newContent.observaciones
        observacionesCenad.value = newContent.observacionesCenad

    },
    { immediate: true, deep: true }
)
onMounted(async () => {
    solicitud.value = await service.fetchSolicitud(idSolicitud.value)
    auth.rol == 'Gestor' && (isGestorEsteCenad.value = idCenad.value == auth.cenad.idString)
    auth.rol == 'Administrador' && (isAdminEsteCenad.value = idCenad.value == auth.cenad.idString)
    isEditable.value = (solicitud.value.estado == 'Borrador' || solicitud.value.estado == 'Solicitada' || isAdminEsteCenad.value || isGestorEsteCenad.value)
    // Normalizar fechas
    fechaSolicitud.value = formatDate(solicitud.value.fechaSolicitud) // "YYYY-MM-DD"
    fechaHoraInicioRecurso.value = formatDateTime(solicitud.value.fechaHoraInicioRecurso) // "YYYY-MM-DDTHH:mm"
    fechaHoraFinRecurso.value = formatDateTime(solicitud.value.fechaHoraFinRecurso)       // "YYYY-MM-DDTHH:mm"
    fechaFinDocumentacion.value = formatDate(solicitud.value.fechaFinDocumentacion)       // "YYYY-MM-DD"
    recurso.value = await recursoService.fetchRecursoDeSolicitud(idSolicitud.value)
})
const editarSolicitud = async () => {
    await service.editarSolicitud(
        observaciones.value, solicitud.value.unidadUsuaria, jefeUnidadUsuaria.value, pocEjercicio.value, tlfnRedactor.value, fechaHoraInicioRecurso.value, fechaHoraFinRecurso.value, estado.value, idCenad.value, idSolicitud.value, observacionesCenad.value, fechaFinDocumentacion.value
    );
    emits('emiteModal');
}
const borrarSolicitud = async () => {
    await service.deleteSolicitud(idCenad.value, idSolicitud.value)
    emits('emiteModal')
}
// Validación: todos los campos deben estar llenos
const formularioValidado = computed(() => {
    if (!jefeUnidadUsuaria.value || !pocEjercicio.value || !tlfnRedactor.value || !fechaHoraInicioRecurso.value || !fechaHoraFinRecurso.value) return false
    return jefeUnidadUsuaria.value != '' && pocEjercicio.value != '' && tlfnRedactor.value != '' && fechaHoraInicioRecurso.value != null && fechaHoraFinRecurso.value != null
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

h6.no-permiso {
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

.modal-xxl {
    max-width: 95%;
    /* casi toda la pantalla, pero con margen */
}

.modal-content {
    height: 100vh;
    /* Ocupa el 100% de la altura de la pantalla */
    border-radius: 0;
    /* Quita esquinas redondeadas para fullscreen */
}

.modal-body {
    overflow-y: auto;
    /* Scroll solo si el contenido se pasa */
    max-height: calc(100vh - 120px);
    /* Deja espacio para header y footer */
}

.formulario {
    color: #3a5a40;
    font-weight: bold;
    text-shadow: 1px 1px 1px #a3b18a;
    background-color: #dad7cd;
}
</style>