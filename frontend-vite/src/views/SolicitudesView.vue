<template>
    <!-- muestra la vista principal de la gestión de solicitudes. -->
    <div class="d-flex align-items-center position-relative p-2 bg-light">
        <RouterLink class="nav-link volver" :to="{ name: 'cenad-home', params: { id: idCenad } }">
            <v-icon name="fa-arrow-alt-circle-left" scale="2" class="me-2" /><strong>Volver</strong>
        </RouterLink>
        <h3 class="position-absolute start-50 translate-middle-x m-0 mb-3 titulo">
            <u>SOLICITUDES</u>
        </h3>
        <button class="btn text-white ms-auto" data-bs-toggle="modal" data-bs-target="#modal-nueva-solicitud"
            v-if="auth.rol == 'Normal' || isAdminEsteCenad || isGestorEsteCenad">
            Nueva <b>Solicitud</b>
        </button>
    </div>
    <div v-if="auth.rol != 'Normal' && !isAdminEsteCenad && !isGestorEsteCenad" class="row justify-content-center">
        <h6 class="no-permiso text-center mt-4">NO TIENE PERMISO PARA GESTIONAR LAS SOLICITUDES</h6>
    </div>
    <div class="row solicitadas-validadas mb-3" v-if="auth.rol == 'Normal' || isAdminEsteCenad || isGestorEsteCenad">
        <div class="col-6 solicitadas">
            <SolicitudesEstadoComponent :estado="'Solicitada'" :solicitudes="solicitudesPorEstado.Solicitada" />
        </div>
        <div class="col-6 validadas">
            <SolicitudesEstadoComponent :estado="'Validada'" :solicitudes="solicitudesPorEstado.Validada" />
        </div>
    </div>
    <div class="row rechazadas-canceladas mb-3" v-if="auth.rol == 'Normal' || isAdminEsteCenad || isGestorEsteCenad">
        <div class="col-6 rechazadas">
            <SolicitudesEstadoComponent :estado="'Rechazada'" :solicitudes="solicitudesPorEstado.Rechazada" />
            <hr class='w-100 titulo-rechazadas'>
        </div>
        <div class="col-6 canceladas" v-if="auth.rol != 'Normal'">
            <SolicitudesEstadoComponent :estado="'Cancelada'" :solicitudes="solicitudesPorEstado.Cancelada" />
        </div>
        <div class="col-6 borrador" v-if="auth.rol == 'Normal'">
            <SolicitudesEstadoComponent :estado="'Borrador'" :solicitudes="solicitudesPorEstado.Borrador" />
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modal-nueva-solicitud" tabindex="-1" aria-labelledby="modal-nueva-solicitud-Label"
        aria-hidden="true">
        <div class="modal-dialog modal-xxl modal-dialog-centered modal-dialog-scrollable">
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
                            <div class="col-lg-2 col-md-12">
                                <label class="me-2">Unidad Solicitante: <sup class="text-danger">*</sup></label>
                                <select class="form-select" aria-label="unidad" v-model="unidad">
                                    <option disabled value="">Selecciona la unidad</option>
                                    <option v-for="unidad in unidades" :key="unidad.idString" :value="unidad">
                                        {{ unidad.nombre }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-lg-2 col-md-12">
                                <label>Jefe Unidad Usuaria: <sup class="text-danger">*</sup></label>
                                <input type="text" class="form-control" v-model="jefeUnidadUsuaria"
                                    placeholder="Jefe UCO Usuaria" name="jefeUcoUsuaria" required minlength="8"
                                    maxlength="20" />
                            </div>
                            <div class="col-lg-2 col-md-12">
                                <label for="validationServer02">Fecha Solicitud: <sup class="text-danger"></sup></label>
                                <input type="date" class="form-control" v-model="fechaSolicitud"
                                    placeholder="dd-MM-yyyy" required name="fechaSol" />
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
                                <label class="d-block me-2 mt-2" v-if="historialCategorias.length > 0">
                                    Categoría Seleccionada:
                                    <strong>{{ historialCategorias[historialCategorias.length - 1].nombre.toUpperCase()
                                        }}</strong>
                                </label>
                                <label class="me-5">Categoría: <sup class="text-danger me-3">*</sup></label>
                                <select v-if="(categoriasFiltradas || []).length > 0" v-model="categoriaSeleccionada"
                                    @change="filtrar" class="form-select mb-3">
                                    <option :value="null" disabled>Selecciona una categoría</option>
                                    <option v-for="categoria in categoriasFiltradas" :key="categoria.idString"
                                        :value="categoria">
                                        {{ categoria.nombre.toUpperCase() }}
                                    </option>
                                </select>
                                <div class="d-flex gap-2 mb-2">
                                    <button v-if="historialCategorias.length > 0" @click="retroceder"
                                        class="btn btn-secondary">
                                        Atrás
                                    </button>
                                    <button v-if="historialCategorias.length > 0" @click="borrarFiltros"
                                        class="btn btn-danger">
                                        Borrar filtros
                                    </button>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <label>Recurso: <sup class="text-danger me-2">*</sup></label>
                                <select name="recursos" id="recursos" v-model="idRecurso" required>
                                    <option value="" disabled selected>Selecciona un recurso</option>
                                    <option v-for="recurso in recursos" :key="recurso.idString"
                                        :value="recurso.idString">
                                        {{ recurso.nombre }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-lg-2 col-md-12">
                                <label for="validationServer02">Fecha-Hora Inicio: <sup
                                        class="text-danger"></sup></label>
                                <input type="datetime-local" class="form-control" v-model="fechaInicio"
                                    placeholder="dd-MM-yyyy HH:mm:ss" required />
                            </div>
                            <div class="col-lg-2 col-md-12">
                                <label for="validationServer02">Fecha-Hora Fin: <sup class="text-danger"></sup></label>
                                <input type="datetime-local" class="form-control" v-model="fechaFin"
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
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t('comun.cerrar') }}
                    </button>
                    <button type="button" @click="crearSolicitud" data-bs-dismiss="modal" class="btn btn-primary"
                        :disabled="!formularioValidado">
                        Crear Solicitud (Borrador)
                    </button>
                    <button type="button" @click="crearYEnviarSolicitud" data-bs-dismiss="modal" class="btn btn-primary"
                        :disabled="!formularioValidado">
                        Crear y Enviar Solicitud
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import useAuthStore from '@/stores/auth'
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import SolicitudService from '@/services/SolicitudService'
import SolicitudesEstadoComponent from '@/components/SolicitudesEstadoComponent.vue'
import CategoriaService from '@/services/CategoriaService'
import RecursoService from '@/services/RecursoService'
const auth = useAuthStore()
const route = useRoute()
const idCenad = computed(() => route.params.id)
let unidades = computed(() => auth.unidades)

let observaciones = ref('')
let jefeUnidadUsuaria = ref('')
let pocEjercicio = ref('')
let tlfnRedactor = ref('')
let fechaSolicitud = ref()
let fechaInicio = ref()
let fechaFin = ref()
let idRecurso = ref('')
let unidad = ref(null)
let estado = 'Borrador'
const categoriasFiltradas = ref([])
const recursos = ref([])
const categoriaSeleccionada = ref(null)
const historialCategorias = ref([])
const loading = ref(false)
// Caché local para evitar llamadas repetidas
const cacheSubcategorias = reactive(new Map()) // idCategoria -> subcategorias[]
const cacheRecursos = reactive(new Map())      // idCategoria -> recursos[]
const isAdminEsteCenad = ref(false)
const isGestorEsteCenad = ref(false)

const service = new SolicitudService()
const categoriaService = new CategoriaService()
const recursoService = new RecursoService()
const solicitudes = service.getSolicitudes()
const solicitudesPorEstado = ref({
    Solicitada: [],
    Validada: [],
    Rechazada: [],
    Cancelada: [],
    Borrador: []
})
onMounted(async () => {
    auth.rol == 'Gestor' && (isGestorEsteCenad.value = idCenad.value == auth.cenad.idString)
    auth.rol == 'Administrador' && (isAdminEsteCenad.value = idCenad.value == auth.cenad.idString)
    await getSolicitudes()
    loading.value = true
    await cargarCategoriasPadre()
    loading.value = false
})

const cargarCategoriasPadre = async () => {
    categoriasFiltradas.value = auth.categoriasPadre
    categoriaSeleccionada.value = null
    historialCategorias.value = []
    recursos.value = auth.recursos
}
// Filtrar por categoría seleccionada con caché
const filtrar = async () => {
    if (!categoriaSeleccionada.value) return
    loading.value = true
    const idCat = categoriaSeleccionada.value.idString
    historialCategorias.value.push(categoriaSeleccionada.value)
    // 1. Subcategorías (desde caché o API)
    let subcategorias
    if (cacheSubcategorias.has(idCat)) {
        subcategorias = cacheSubcategorias.get(idCat)
    } else {
        subcategorias = await categoriaService.fetchSubcategorias(idCat)
        cacheSubcategorias.set(idCat, subcategorias)
    }
    if (subcategorias.length === 0) {
        // 2. Recursos (desde caché o API)
        let recursosCat
        if (cacheRecursos.has(idCat)) {
            recursosCat = cacheRecursos.get(idCat)
        } else {
            recursosCat = await recursoService.fetchRecursosDeCategoria(idCat)
            cacheRecursos.set(idCat, recursosCat)
        }
        recursos.value = recursosCat
        categoriasFiltradas.value = []
    } else {
        // Hay subcategorías
        categoriasFiltradas.value = subcategorias
        // Recursos de esta categoría y subcategorías
        let recursosCat
        if (cacheRecursos.has(idCat)) {
            recursosCat = cacheRecursos.get(idCat)
        } else {
            recursosCat = await recursoService.fetchRecursosDeSubcategorias(idCat)
            cacheRecursos.set(idCat, recursosCat)
        }
        recursos.value = recursosCat
    }
    categoriaSeleccionada.value = null
    loading.value = false
}
// Borrar filtros y volver a estado inicial
const borrarFiltros = async () => {
    await cargarCategoriasPadre()
}
// Retroceder en historial con caché
const retroceder = async () => {
    if (historialCategorias.value.length === 0) return
    loading.value = true
    historialCategorias.value.pop() // Eliminar última categoría
    if (historialCategorias.value.length === 0) {
        // Volvemos a categorías padre
        await cargarCategoriasPadre()
    } else {
        const ultimaCategoria = historialCategorias.value[historialCategorias.value.length - 1]
        const idCat = ultimaCategoria.idString
        // Subcategorías desde caché o API
        if (cacheSubcategorias.has(idCat)) {
            categoriasFiltradas.value = cacheSubcategorias.get(idCat)
        } else {
            const subcategorias = await categoriaService.fetchSubcategorias(idCat)
            cacheSubcategorias.set(idCat, subcategorias)
            categoriasFiltradas.value = subcategorias
        }
        // Recursos desde caché o API
        if (cacheRecursos.has(idCat)) {
            recursos.value = cacheRecursos.get(idCat)
        } else {
            const recursosCat = await recursoService.fetchRecursosDeSubcategorias(idCat)
            cacheRecursos.set(idCat, recursosCat)
            recursos.value = recursosCat
        }
    }
    categoriaSeleccionada.value = null
    loading.value = false
}
async function getSolicitudes() {
    const data = await service.fetchAll(idCenad.value)
    solicitudesPorEstado.value.Solicitada = data.filter(s => s.estado === 'Solicitada')
    solicitudesPorEstado.value.Validada = data.filter(s => s.estado === 'Validada')
    solicitudesPorEstado.value.Rechazada = data.filter(s => s.estado === 'Rechazada')
    solicitudesPorEstado.value.Cancelada = data.filter(s => s.estado === 'Cancelada')
    solicitudesPorEstado.value.Borrador = data.filter(s => s.estado === 'Borrador')
}

function actualizarSolicitudEnView() {
    getSolicitudes()
}
const crearYEnviarSolicitud = async () => {
    estado = 'Solicitada'
    crearSolicitud()
}
const crearSolicitud = async () => {
    console.log(estado)
    await service.crearSolicitud(observaciones.value, unidad.value.nombre, jefeUnidadUsuaria.value, pocEjercicio.value, tlfnRedactor.value, fechaSolicitud.value, fechaInicio.value, fechaFin.value, estado, idCenad.value, idRecurso.value, auth.usuario.idString)
    observaciones.value = ''
    jefeUnidadUsuaria.value = ''
    pocEjercicio.value = ''
    tlfnRedactor.value = ''
    fechaSolicitud.value = null
    fechaInicio.value = null
    fechaFin.value = null
    unidad.value = null
    categoriaSeleccionada.value = null
    idRecurso.value = ''
    estado = 'Borrador'
    await cargarCategoriasPadre()
    await getSolicitudes()
}
// Validación: todos los campos deben estar llenos
const formularioValidado = computed(() => {
    if (!unidad.value || !jefeUnidadUsuaria.value || !pocEjercicio.value || !tlfnRedactor.value || !fechaSolicitud.value || !fechaInicio.value || !fechaFin.value || !idRecurso.value) return false
    return jefeUnidadUsuaria.value != '' && pocEjercicio.value != '' && tlfnRedactor.value != '' && fechaSolicitud.value != null && fechaInicio.value != null && fechaFin.value != null && idRecurso.value != '' && unidad.value != null
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