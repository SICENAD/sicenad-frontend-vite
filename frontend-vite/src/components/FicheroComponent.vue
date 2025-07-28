<template>
  <hr class="w-100" />
  <div class="row" v-if="props.content">
    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
      {{ props.content?.nombre }}
      <FicheroModalComponent
        :nombreArchivo="props.content?.nombreArchivo"
        :nombre="props.content?.nombre"
        :idFichero="props.content?.idString"
        :descripcion="props.content?.descripcion"
        :idCenad="props.idCenad"
        :idRecurso="props.idRecurso"
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
import useAuthStore from '@/stores/auth'
import FicheroService from '@/services/FicheroService'
import FicheroModalComponent from './FicheroModalComponent.vue'
import CategoriaFicheroService from '@/services/CategoriaFicheroService'
import UsuarioService from '@/services/UsuarioService'

// ✅ Props y Emits
const props = defineProps(['content', 'idCenad', 'idRecurso'])
const emits = defineEmits(['emiteElemento'])

// ✅ Estado
const auth = useAuthStore()
const linkDescarga = ref('')
const categoriaFichero = ref(null)
const idGestor = ref('')
const isGestorEsteRecurso = ref(false)

// ✅ Servicios
const service = new FicheroService()
const categoriaFicheroService = new CategoriaFicheroService()
const usuarioService = new UsuarioService()

console.log('Componente cargando...')

// ✅ Lógica al montar
onMounted(async () => {
  console.log('Entrando en onMounted...')
  try {
    // Obtener gestor del recurso
    const gestor = await usuarioService.fetchUsuarioGestorDeRecurso(props.idRecurso)
    idGestor.value = gestor.idString

    // Comparar con usuario actual (si existe)
    if (idGestor.value === auth.usuario?.idString) {
      isGestorEsteRecurso.value = true
    } else {
      isGestorEsteRecurso.value = false
    }

    // Link descarga
    linkDescarga.value = await service.fetchArchivoFichero(
      props.content?.nombreArchivo,
      props.idCenad,
      props.idRecurso
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
