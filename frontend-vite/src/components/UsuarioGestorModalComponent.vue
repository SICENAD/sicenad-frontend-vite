<template>
  <!-- Llamada al modal -->
  <a data-bs-toggle="modal" :data-bs-target="'#' + idModal"><v-icon name="fa-edit" scale="1.5" /></a>
  <!-- Modal -->
  <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="modal-editar-usuario-Label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-usuario-Label">
            {{ $t('administracion.editarUsuario') }}{{ props.username }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="username" class="form-label"><b>{{ $t('administracion.username') }}</b></label>
              <input type="text" class="form-control" id="usernameUsuarioGestor" aria-describedby="username" v-model="username" />
            </div>
            <div class="mb-3">
              <label for="tfno" class="form-label"><b>{{ toTitleCase($t('administracion.tfno'))
                  }}</b></label>
              <input type="text" class="form-control" id="tfnoUsuarioGestor" v-model="tfno" />
            </div>
            <div class="mb-3">
              <label for="InputEmail1" class="form-label"><b>{{ toTitleCase($t('administracion.correo'))
                  }}</b></label>
              <input type="email" class="form-control" id="emailUsuarioGestor" aria-describedby="emailHelp" v-model="email" />
              <div id="emailHelp" class="form-text">{{ $t('administracion.helpMail') }}</div>
            </div>
            <div class="mb-3">
              <label class="titulo"><b>¿QUIERE RECIBIR NOTIFICACIONES?<sup class="text-danger">*</sup></b></label>
              <input type="checkbox" class="letra" id="emailAdmitidoUsuarioGestor" v-model="emailAdmitido" />
            </div>
            <div class="mb-3">
              <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
              <input type="textarea" class="form-control letra" id="descripcionUsuarioGestor" v-model="descripcion" />
            </div>
            <div class="mb-3">
              <label class="titulo me-2"><b>CENAD<sup class="text-danger">*</sup></b></label>
              <select class="form-select" aria-label="cenad" v-model="idCenad">
                <option disabled value="">Selecciona el Cenad</option>
                <option v-for="cenad in cenads" :key="cenad.idString" :value="cenad.idString">
                  {{ cenad.nombre }}
                </option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <!-- Llamada al modal para eliminar-->
          <button class="btn btn-danger" :data-bs-target="'#' + idModalEliminar" data-bs-toggle="modal">
            {{ $t('administracion.borrarUsuario') }}
          </button>
          <button type="button" @click="editarUsuario" data-bs-dismiss="modal" class="btn btn-success">
            {{ $t('administracion.guardarUsuario') }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal para eliminar-->
  <div class="modal fade" :id="idModalEliminar" aria-hidden="true" aria-labelledby="confirmaEliminar-Label"
    tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="confirmaEliminar-Label">
            {{ $t('administracion.eliminarUsuario') }}{{ username }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">{{ $t('administracion.preguntarEliminar') }}{{ username }}?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button type="button" @click="borrarUsuario" data-bs-dismiss="modal" class="btn btn-danger">
            {{ $t('comun.borrar') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import UsuarioService from '@/services/UsuarioService'
import { toTitleCase } from '@/utils'
import CenadService from '@/services/CenadService'
const props = defineProps(['username', 'tfno', 'email', 'emailAdmitido', 'descripcion', 'cenad', 'idUsuario'])
const emits = defineEmits(['emiteModal'])

let username = ref(props.username)
let tfno = ref(props.tfno)
let email = ref(props.email)
let emailAdmitido = ref(props.emailAdmitido)
let descripcion = ref(props.descripcion)
let idCenad = ref(props.cenad?.idString || '')
let idUsuario = ref(props.idUsuario)
let idModal = 'modal-usuario-' + props.idUsuario
let idModalEliminar = 'modal-usuario-eliminar' + props.idUsuario
const service = new UsuarioService()
const cenadService = new CenadService()
let cenads = cenadService.getCenads()

onMounted(async () => {
  getCenads()
})
const getCenads = async () => {
  await cenadService.fetchAll()
}
const editarUsuario = async () => {
  let cenad = null
  cenads.value.forEach(c => {
    if (c.idString == idCenad.value) {
      cenad = c
    }
  })
  console.log(cenad.nombre)
  console.log(idUsuario.value)
  await service.editarUsuarioGestor(username.value, tfno.value, email.value, emailAdmitido.value, descripcion.value, cenad, idUsuario.value)
  emits('emiteModal')
}
const borrarUsuario = async () => {
  await service.deleteUsuario(idUsuario.value)
  emits('emiteModal')
}
</script>
<style scoped lang="scss">
.passwordHelp {
  font-size: small;
  color: red;
}
</style>
