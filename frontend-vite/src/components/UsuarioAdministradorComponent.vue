<template>
  <hr class='w-100'>
  <div class="row">
    <div class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
      {{ props.content.username }}
      <UsuarioAdministradorModalComponent :username="props.content.username" :tfno="props.content.tfno"
        :email="props.content.email" :emailAdmitido="props.content.emailAdmitido"
        :descripcion="props.content.descripcion" :idUsuario="props.content.idString" :cenad="cenad"
        @emiteModal="actualizarUsuarioEnElemento" />
    </div>
    <div class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">{{ cenad?.nombre }}</div>
  </div>
</template>
<script setup>
import UsuarioService from '@/services/UsuarioService'
import { onMounted, ref } from 'vue'
import UsuarioAdministradorModalComponent from './UsuarioAdministradorModalComponent.vue'
const props = defineProps(['content'])
const emits = defineEmits(['emiteElemento'])

const service = new UsuarioService()
let cenad = ref()

onMounted(async () => {
  cenad.value = await service.fetchCenadDeUsuarioAdministrador(props.content.idString)
})
async function actualizarUsuarioEnElemento() {
  cenad.value = await service.fetchCenadDeUsuarioAdministrador(props.content.idString)
  emits('emiteElemento')
}
</script>
<style scoped lang="scss">
div, div a {
  color: #A3B18A; font-weight: bold
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
</style>
