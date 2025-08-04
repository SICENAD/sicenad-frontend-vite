<template>
    <div class="row">
        <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo1">
            <b class="me-2">{{ props.content.unidadUsuaria }}</b>
            <SolicitudModalComponent :content="props.content" :recurso="recurso?.nombre" @emiteModal="actualizarSolicitudEnElemento"/>
        </div>
        <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo1">
            <b>{{ formatearFecha(props.content.fechaSolicitud) }}</b>
        </div>
        <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 titulo1"><b>{{ recurso?.nombre }}</b></div>
        <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo1">
            <b>{{ formatearFecha(props.content.fechaHoraInicioRecurso) }}</b>
        </div>
        <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo1">
            <b>{{ formatearFecha(props.content.fechaHoraFinRecurso) }}</b>
        </div>
    </div>
</template>
<script setup>
import RecursoService from '@/services/RecursoService'
import { formatearFecha } from '@/utils'
import { onMounted, ref } from 'vue'
import SolicitudModalComponent from './SolicitudModalComponent.vue'

const props = defineProps(['content'])
const emits = defineEmits(['emiteElemento'])
const recursoService = new RecursoService()
const recurso = ref()
function actualizarSolicitudEnElemento() {
    emits('emiteElemento')
}
onMounted(async () => {
    const responseRecurso = await recursoService.fetchRecursoDeSolicitud(props.content.idString)
    recurso.value = responseRecurso
})
</script>
<style lang="scss" scoped>
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