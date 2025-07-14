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
      toTitleCase(usuarioAdministrador) }}</div>
    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4" v-else>NO TIENE</div>
  </div>
</template>
<script setup>
import { toTitleCase } from '@/utils'
import { onMounted, ref } from 'vue'
import CenadModalComponent from './CenadModalComponent.vue'
import useUtilsStore from '@/stores/utils'
const props = defineProps(['content'])
const emits = defineEmits(['emiteElemento'])
let provincia = ref('')
let usuarioAdministrador = ref(false)

onMounted(async () => {
  getProvincia(props.content)
  //tendre que recuperar, si existe, el usuario administrador del cenad
})
function actualizarCenadEnElemento() {
  emits('emiteElemento')
}

function getProvincia(cenad) {
  const utils = useUtilsStore()
  let provincias = utils.provincias
  provincias.forEach(p => {
    if (p.idProvincia == cenad.provincia) {
      provincia.value = p.nombre;
    }
  })
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
