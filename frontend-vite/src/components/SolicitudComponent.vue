<template>
    <div class="row">
        <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo"><b><u>{{props.content.unidadUsuaria}}</u></b></div>
        <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo"><b><u>{{formatearFecha(props.content.fechaSolicitud)}}</u></b></div>
        <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 titulo"><b><u>{{recurso?.nombre}}</u></b></div>
        <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo"><b><u>{{formatearFecha(props.content.fechaHoraInicioRecurso)}}</u></b></div>
        <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2 titulo"><b><u>{{formatearFecha(props.content.fechaHoraFinRecurso)}}</u></b></div>
    </div>
</template>
<script setup>
import RecursoService from '@/services/RecursoService'
import { formatearFecha } from '@/utils'
import { computed, onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'
const props = defineProps(['content'])
const emits = defineEmits(['emiteElemento'])
const route =useRoute()
const recursoService = new RecursoService()
const idCenad = computed(() => route.params.id)
const recurso = ref()
function actualizarSolicitudEnElemento() {
  emits('emiteElemento')
}
onMounted(async () => {
  const responseRecurso = await recursoService.fetchRecursoDeSolicitud(props.content.idString)
  recurso.value = responseRecurso
})
</script>