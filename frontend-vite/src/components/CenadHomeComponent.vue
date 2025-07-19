<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col col-md-8 escudo p-5">
        <img class="cenad" :alt="escudoCenad" :src="pathImg" />
      </div>
      <div class="col col-md-4 enlaces p-4 mt-5">
        <h3>
          <v-icon scale="2" class="me-2" name="fa-link" />
          <u><strong>Enlaces más importantes</strong></u>
        </h3>
        <ul>
          <li class="pt-4" v-if="isSuperAdmin">
            <router-link :to="`/calendarios/${idCenad}`">
          <v-icon scale="2" class="me-2" name="fa-calendar-alt" />
              Planificar Recursos
            </router-link>
          </li>
          <li class="pt-4" v-if="!isSuperAdmin">
            <router-link :to="`/calendarios/${idCenad}`">
          <v-icon scale="2" class="me-2" name="fa-calendar-alt" />
              Calendario
            </router-link>
          </li>
          <li class="pt-4">
            <router-link :to="`/consultaRecursos/${idCenad}`">
          <v-icon scale="2" class="me-2" name="fa-folder-open" />
              Consultar Recursos
            </router-link>
          </li>
          <li class="pt-4">
            <router-link :to="`/cartografias/${idCenad}`">
          <v-icon scale="2" class="me-2" name="fa-map" />
              Cartografía
            </router-link>
          </li>
          <li class="pt-4" v-if="isUserNormal">
            <router-link :to="`/solicitudesRecursos/${idCenad}/formulario/${idCenad}/${idSolicitud}`">
          <v-icon scale="2" class="me-2" name="fa-business-time" />
              Solicitar Recurso
            </router-link>
          </li>
          <li class="pt-4" v-if="!isUserNormal">
            <a href="#" @click.prevent="mensaje">
          <v-icon scale="2" class="me-2" name="fa-business-time" />
              Solicitar Recurso
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import useAuthStore from '@/stores/auth'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import useUtilsStore from '@/stores/utils'
import CenadService from '@/services/CenadService'

const route = useRoute()
const auth = useAuthStore()
const utils = useUtilsStore()
const idCenad = computed(() => route.params.id)
const idSolicitud = ref('') // poner valor si aplica

const cenad = ref({})
const escudoCenad = ref('')
const pathRelativo = ref('')
const pathImg = ref('')

pathRelativo.value = `${utils.urlApi}/files/escudos`

function mensaje() {
  alert('Debe identificarse como Usuario Normal para acceder a esta opción....')
}

async function cargarCenad() {
  const service = new CenadService()
  const response = await service.fetchCenad(idCenad.value)
  cenad.value = response
  escudoCenad.value = cenad.value.escudo
  pathImg.value = await service.fetchEscudo(escudoCenad.value)
}

onMounted(async () => {
  await cargarCenad()
})
</script>

<style scoped>
h3 {
  color: #3A5A40;
}

img.cenad {
  display: block;
  width: 365px;
  height: 533px;
  align-content: center;
  margin: auto;
  padding-bottom: 2px;
}

div.enlaces {
  border: 6px solid #354f52;
  border-top: 0px;
  border-bottom: 0px;
  border-right: 0px;
}

div a {
  color: #588157;
  font-weight: bold;
  font-size: 20px;
}

div.menu a {
  color: #588157;
  font-weight: bold;
  font-size: 18px;
  margin-top: 12px;
  margin-right: 20px;
}

div a:hover {
  color: yellowgreen;
}
</style>
