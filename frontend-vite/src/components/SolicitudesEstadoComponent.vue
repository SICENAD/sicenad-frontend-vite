<template>
    <div class="titulos">
        <h5 :class="`text-center titulo-${claseEstado}`">{{ estadoTitulo }}
            <label class="ms-5 ps-5 ver-todas" @click="abrirModal" style="cursor:pointer"> <v-icon name="fa-glasses"
                    scale="1.5" class="me-2" />Ver Todas
            </label>
        </h5>
        <hr :class='`w-100 titulo-${claseEstado}`'>
        <div class="row">
            <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo"><b><u>UCO</u></b></div>
            <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo"><b><u>SOLICITUD</u></b></div>
            <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 titulo"><b><u>RECURSO</u></b></div>
            <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo"><b><u>INICIO</u></b></div>
            <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo"><b><u>FIN</u></b></div>
        </div>
    </div>
    <div v-if="solicitudesTop5?.length">
        <SolicitudComponent v-for="(item, index) in solicitudesTop5" :key="index" :content="item" />
    </div>
    <div v-else class="row justify-content-center">
        <h6 class="no-existen">NO EXISTEN</h6>
    </div>
    <hr :class='`w-100 titulo-${claseEstado}`'>
    <!-- Modal -->
    <div class="modal fade" :class="{ show: mostrarModal }" style="display: block;" v-if="mostrarModal">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Solicitudes {{ estado }}</h5>
                    <button type="button" class="btn-close" @click="cerrarModal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo"><b><u>UCO</u></b></div>
                        <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo"><b><u>SOLICITUD</u></b></div>
                        <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 titulo"><b><u>RECURSO</u></b></div>
                        <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo"><b><u>INICIO</u></b></div>
                        <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo"><b><u>FIN</u></b></div>
                    </div>
                    <div v-if="solicitudesOrdenadas.length">
                        <SolicitudComponent v-for="(item, index) in solicitudesOrdenadas" :key="index"
                            :content="item" />
                    </div>
                    <div v-else>
                        <p>No existen solicitudes</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="cerrarModal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="mostrarModal" class="modal-backdrop fade show">
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import SolicitudComponent from './SolicitudComponent.vue'
import useAuthStore from '@/stores/auth'
const props = defineProps(['estado', 'solicitudes'])
const mostrarModal = ref(false);

const auth = useAuthStore()
// Estado para controlar la vista
const estado = ref(props.estado)
const estadoTitulo = computed(() => {
    switch (estado.value) {
        case 'Borrador':
            return 'BORRADORES'
        case 'Solicitada':
            return 'SOLICITADAS'
        case 'Rechazada':
            return 'RECHAZADAS'
        case 'Validada':
            return 'VALIDADAS'
        case 'Cancelada':
            return 'CANCELADAS'
        default:
            return 'BORRADORES'
    }
})
const claseEstado = computed(() => {
    switch (estado.value) {
        case 'Borrador':
            return 'borradores'
        case 'Solicitada':
            return 'solicitadas'
        case 'Rechazada':
            return 'rechazadas'
        case 'Validada':
            return 'validadas'
        case 'Cancelada':
            return 'canceladas'
        default:
            return 'borradores'
    }
})
const solicitudesFiltradasPorUnidad = computed(() => {
    if (!auth.unidad?.nombre) return props.solicitudes
    return props.solicitudes.filter(s => s.unidadUsuaria == auth.unidad.nombre)
})
// Ordenar por fechaInicio DESC
const solicitudesOrdenadas = computed(() => {
    return [...solicitudesFiltradasPorUnidad.value].sort((a, b) => new Date(b.fechaHoraInicioRecurso) - new Date(a.fechaHoraInicioRecurso));
});
// Solo las 5 más recientes
const solicitudesTop5 = computed(() => solicitudesOrdenadas.value.slice(0, 5))

// Funciones para modal
const abrirModal = () => {
    mostrarModal.value = true
}

const cerrarModal = () => {
    mostrarModal.value = false
}
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
.modal-body {
  max-height: 70vh; /* Ocupa máximo 70% del alto visible */
  overflow-y: auto; /* Habilita scroll vertical */
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
div.borradores {
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
.titulo-borradores {
    margin-top: 10px;
    color: #dad7cd;
    font-weight: bold;
    text-shadow: 1px 1px 2px black;
    background-color: #344e41;
}

hr.titulo-canceladas,
hr.titulo-borradores {
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
</style>