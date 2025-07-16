<template>
  <div class="container">
    <form>
      <p class="text-danger">{{ loginError }}</p>
      <div class="mb-3">
        <label for="tfno" class="form-label"><b>{{ toTitleCase($t('administracion.tfno')) }}</b></label>
        <input type="text" class="form-control" id="tfno" v-model="tfno" />
      </div>
      <div class="mb-3">
        <label for="InputEmail1" class="form-label"><b>{{ toTitleCase($t('administracion.correo')) }}</b></label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="email" />
        <div id="emailHelp" class="form-text">{{ $t('administracion.helpMail') }}</div>
      </div>
      <div class="mb-3">
        <label class="titulo"><b>¿QUIERE RECIBIR NOTIFICACIONES?<sup class="text-danger">*</sup></b></label>
        <input type="checkbox" class="form-control letra" id="emailAdmitido" v-model="emailAdmitido" />
      </div>
      <div class="mb-3">
        <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
        <input type="textarea" class="form-control letra" id="descripcion" v-model="descripcion" />
      </div>
      <div class="row mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
        <label for="username" class="form-label"><b>{{ $t('administracion.username') }}</b></label>
        <input type="text" class="form-control" id="username" aria-describedby="username" v-model="username" />
      </div>
      <div class="row mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
        <label for="password" class="form-label"><b>{{ $t('administracion.password') }}</b></label>
        <input type="password" class="form-control" id="password" v-model="password" />
      </div>
      <!-- Abrir el modal manualmente -->
      <button type="button" class="btn btn-primary text-white col-2" data-bs-toggle="modal"
        data-bs-target="#modal-crear-usuario">
        {{ $t('administracion.crearUsuario') }}
      </button>
    </form>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="modal-crear-usuario" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">{{ $t('administracion.crearUsuario') }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          <label class="form-label passwordSistema"><b>{{ $t('administracion.passwordRequired') }}</b></label>
          <input type="password" class="form-control" v-model="passwordForRegisterFromUser" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button type="button" class="btn btn-primary" @click="solicitudRegistro" data-bs-dismiss="modal">
            {{ $t('administracion.crearUsuario') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import AuthService from '@/services/AuthService'
import { toTitleCase } from '@/utils'

let username = ref('')
let password = ref('')
let tfno = ref('')
let email = ref('')
let emailAdmitido = ref('')
let descripcion = ref('')
let loginError = ref('')
let passwordForRegisterFromUser = ref('')

const service = new AuthService()

const solicitudRegistro = async () => {
  await service.solicitudRegistro(
    username.value,
    password.value,
    tfno.value,
    email.value,
    emailAdmitido.value,
    descripcion.value,
    passwordForRegisterFromUser.value,
    loginError.value,
  )
}
</script>
<style scoped lang="scss">
form {
  margin: 20px;
}

.passwordSistema {
  color: red;
}
</style>
