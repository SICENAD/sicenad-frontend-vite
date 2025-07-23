<template>
  <hr class='w-100'>
  <div class="row">
    <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4">
      {{ props.content.nombre }}
      <CartografiaModalComponent :nombreArchivo="props.content.nombreArchivo" :nombre="props.content.nombre"
        :escala="props.content.escala" :idCartografia="props.content.idString" :descripcion="props.content.descripcion"
        :idCenad="props.idCenad" @emiteModal="actualizarCartografiaEnElemento" />
    </div>
    <div class="col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2">{{ props.content.escala }}</div>
    <div class="col-10 col-sm-10 col-md-5 col-lg-5 col-xl-5">{{ props.content.descripcion }}</div>
    <div class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center"><a :href="linkDescarga"
        :download="props.content.nombreArchivo"><v-icon name="fa-download"></v-icon></a></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import CartografiaModalComponent from './CartografiaModalComponent.vue'
import CartografiaService from '@/services/CartografiaService'
const props = defineProps(['content', 'idCenad'])
const emits = defineEmits(['emiteElemento'])
let linkDescarga = ref('')
const service = new CartografiaService()

onMounted(async () => {
  linkDescarga.value = await service.fetchArchivoCartografia(props.content.nombreArchivo, props.idCenad)
})
function actualizarCartografiaEnElemento() {
  emits('emiteElemento')
}
</script>
<style scoped lang="scss">
div,
div a {
  color: #A3B18A;
  font-weight: bold
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
