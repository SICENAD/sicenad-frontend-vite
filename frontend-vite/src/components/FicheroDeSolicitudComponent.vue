<template>
  <hr class="w-100" />
  <div class="row" v-if="props.content">
    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
      {{ props.content?.nombre }}
      <FicheroDeSolicitudModalComponent
        :nombreArchivo="props.content?.nombreArchivo"
        :nombre="props.content?.nombre"
        :idFichero="props.content?.idString"
        :descripcion="props.content?.descripcion"
        :idCenad="props.idCenad"
        :idSolicitud="props.idSolicitud"
        :categoriaFichero="categoriaFichero"
        @emiteModal="actualizarFicheroEnElemento"
      />
    </div>

    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3" v-if="categoriaFichero">
      {{ categoriaFichero.nombre }}
    </div>

    <div class="col-10 col-sm-10 col-md-5 col-lg-5 col-xl-5">
      {{ props.content?.descripcion }}
    </div>

    <div class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center">
      <a :href="linkDescarga" :download="props.content?.nombreArchivo">
        <v-icon name="fa-download"></v-icon>
      </a>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import FicheroService from '@/services/FicheroService'
import CategoriaFicheroService from '@/services/CategoriaFicheroService'
import FicheroDeSolicitudModalComponent from './FicheroDeSolicitudModalComponent.vue'

// ✅ Props y Emits
const props = defineProps(['content', 'idCenad', 'idSolicitud'])
const emits = defineEmits(['emiteElemento'])

// ✅ Estado
const linkDescarga = ref('')
const categoriaFichero = ref(null)

// ✅ Servicios
const service = new FicheroService()
const categoriaFicheroService = new CategoriaFicheroService()

console.log('Componente cargando...')

// ✅ Lógica al montar
onMounted(async () => {
  console.log('Entrando en onMounted...')
  try {
    
    console.log('para linkdescarga uso nombrearchivo, idcenad y idsolicitud ' + props.content?.nombreArchivo + props.idCenad + props.idSolicitud)
    // Link descarga
    linkDescarga.value = await service.fetchArchivoDocumentacionSolicitud(
      props.content?.nombreArchivo,
      props.idCenad,
      props.idSolicitud
    )

    // Cargar categoría (si hay idString)
    if (props.content?.idString) {
      categoriaFichero.value = await categoriaFicheroService.fetchCategoriaFicheroDeFichero(
        props.content.idString
      )
      console.log('Categoría cargada en onMounted:', categoriaFichero.value)
    }
  } catch (error) {
    console.error('Error en onMounted:', error)
  }
})

// ✅ Watch para asegurar que la categoría se carga si props llega tarde
watch(
  () => props.content?.idString,
  async (nuevoId) => {
    if (nuevoId) {
      try {
        categoriaFichero.value = await categoriaFicheroService.fetchCategoriaFicheroDeFichero(nuevoId)
        console.log('Categoría cargada en watch:', categoriaFichero.value)
      } catch (error) {
        console.error('Error cargando categoría en watch:', error)
      }
    }
  },
  { immediate: true }
)

// ✅ Emit al actualizar
function actualizarFicheroEnElemento() {
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
