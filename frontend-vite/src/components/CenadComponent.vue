<template>
  <hr class='w-100'>
  <div class="row">
    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4">
      {{ props.content.nombre }}
      <CenadModalComponent :provincia="props.content.provincia" :nombre="props.content.nombre"
        :direccion="props.content.direccion" :tfno="props.content.tfno" :email="props.content.email"
        :descripcion="props.content.descripcion" :idCenad="props.content.idString" :escudo="props.content.escudo"
        @emiteModal="actualizarCenadEnElemento" />
    </div>
    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4">{{ toTitleCase(provincia) }}</div>
    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4" v-if='usuarioAdministrador'>{{
      toTitleCase(usuarioAdministrador.username) }}</div>
    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4" v-else>NO TIENE</div>
  </div>
</template>
<script setup>
import { toTitleCase } from '@/utils'
import { onMounted, ref, computed } from 'vue'
import CenadModalComponent from './CenadModalComponent.vue'
import useUtilsStore from '@/stores/utils'
import CenadService from '@/services/CenadService'
const props = defineProps(['content'])
const emits = defineEmits(['emiteElemento'])
const utils = useUtilsStore()
const provincia = computed(() => {
  const idProvincia = props.content.provincia
  const provincias = utils.provincias
  const encontrada = provincias.find(p => p.idProvincia == idProvincia)
  return encontrada ? encontrada.nombre : ''
})
let usuarioAdministrador = ref()
let service = new CenadService()

onMounted(async () => {
  //tendre que recuperar, si existe, el usuario administrador del cenad
  usuarioAdministrador.value = await service.getUsuarioAdministrador(props.content.idString)
})
function actualizarCenadEnElemento() {
  emits('emiteElemento')
}
</script>
<style scoped lang="scss">
div,
div a {
  color: #A3B18A;
  font-weight: bold;
}

fa-icon:hover {
  color: #588157;
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

.list:hover {
  background-color: aqua;
}
</style>
