<template>
    <div class="titulos">
        <h5 :class="`text-center titulo-${claseEstado}`">{{ estadoTitulo }}
            <label class="ms-5 ps-5 ver-todas" @click="verTodas(estado)"> <v-icon name="fa-glasses" scale="1.5" class="me-2"
                    />Ver Todas
            </label>
        </h5>
        <hr :class='`w-100 titulo-${claseEstado}`'>
        <div class="row">
            <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo"><b><u>UCO</u></b></div>
            <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo"><b><u>SOLICITUD</u></b></div>
            <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 titulo"><b><u>RECURSO</u></b></div>
            <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo"><b><u>F. INICIO</u></b></div>
            <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo"><b><u>F. FIN</u></b></div>
        </div>
    </div>
<div v-if="solicitudes?.length">
        <SolicitudComponent v-for="(item, index) in solicitudes" :key="index" :content="item" @emiteModal="actualizarSolicitudEnView"/>
    </div>
    <div v-else class="row justify-content-center">
        <h6 class="no-existen">NO EXISTEN</h6>
    </div>
    <hr :class='`w-100 titulo-${claseEstado}`'>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import SolicitudComponent from './SolicitudComponent.vue'
import SolicitudService from '@/services/SolicitudService'
const props = defineProps(['estado'])
const route = useRoute()
const idCenad = computed(() => route.params.id)

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
const service = new SolicitudService()
let solicitudes = service.getSolicitudes()
onMounted(async () => {
    await getSolicitudes()
})
// Obtener recursos y asignar categorías
const getSolicitudes = async () => {
   await service.fetchSolicitudesDeCenadPorEstado(idCenad.value, estado.value)
}
function actualizarSolicitudEnView() {
    getSolicitudes()
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