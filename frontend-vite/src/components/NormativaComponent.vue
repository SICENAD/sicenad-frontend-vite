<template>
  <hr class='w-100'>
  <div class="row">
    <div class="col-10 col-sm-10 col-md-5 col-lg-5 col-xl-5">
      {{ props.content.nombre }}
      <NormativaModalComponent :nombreArchivo="props.content.nombreArchivo" :nombre="props.content.nombre"
         :idNormativa="props.content.idString" :descripcion="props.content.descripcion" :idCenad="props.idCenad"
        @emiteModal="actualizarNormativaEnElemento" v-if="isAdminEsteCenad" />
    </div>
    <div class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">{{ props.content.descripcion }}</div>
    <div class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center"><a :href="linkDescarga" :download="props.content.nombreArchivo"><v-icon name="fa-download"></v-icon></a></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import NormativaModalComponent from './NormativaModalComponent.vue'
import NormativaService from '@/services/NormativaService'
import useAuthStore from '@/stores/auth'
const props = defineProps(['content', 'idCenad'])
const emits = defineEmits(['emiteElemento'])
const auth = useAuthStore()
let linkDescarga = ref('')
const service = new NormativaService()
const isAdminEsteCenad = ref(false)

onMounted(async () => {
      auth.rol == 'Administrador' && (isAdminEsteCenad.value = props.idCenad == auth.cenad.idString)
    linkDescarga.value = await service.fetchArchivoNormativa(props.content.nombreArchivo, props.idCenad)
})
function actualizarNormativaEnElemento() {
  emits('emiteElemento')
}
</script>
<style scoped lang="scss">
div, div a {
  color: #A3B18A; font-weight: bold
}

v-icon:hover {
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
