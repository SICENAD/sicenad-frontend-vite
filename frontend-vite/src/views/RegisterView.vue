<template>
  <div class="container">
    <form>
      <div class="mb-3">
        <label for="tfno" class="form-label"><b>{{ toTitleCase($t('administracion.tfno')) }}</b></label>
        <input type="text" class="form-control" id="tfno" v-model="tfno" />
        <span v-if="phoneError" class="text-danger">{{ phoneError }}</span>
      </div>
      <div class="mb-3">
        <label for="InputEmail1" class="form-label"><b>{{ toTitleCase($t('administracion.correo')) }}</b></label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="email" />
        <div id="emailHelp" class="form-text">{{ $t('administracion.helpMail') }}</div>
        <span v-if="emailError" class="text-danger">{{ emailError }}</span>
      </div>
      <div class="mb-3">
        <label class="form-label me-2"><b>¿QUIERE RECIBIR NOTIFICACIONES?<sup class="text-danger">*</sup></b></label>
        <input type="checkbox" class="letra" id="emailAdmitido" v-model="emailAdmitido" />
      </div>
      <div class="mb-3">
        <label class="form-label"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
        <input type="textarea" class="form-control letra" id="descripcion" v-model="descripcion" />
      </div>
      <div class="mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
        <label for="username" class="form-label"><b>{{ $t('administracion.username') }}</b></label>
        <input type="text" class="form-control" id="username" aria-describedby="username" v-model="username" />
      </div>
      <div class="mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
        <label for="password" class="form-label"><b>{{ $t('administracion.password') }}</b></label>
        <input type="password" class="form-control" id="password" v-model="password" />
      </div>
      <RouterLink :to="{ name: 'login' }">
        <button class="btn btn-primary text-white col-2 me-5">Cancelar</button>
      </RouterLink>
      <!-- Abrir el modal manualmente -->
      <button type="button" class="btn btn-primary text-white col-2" data-bs-toggle="modal"
        data-bs-target="#modal-crear-usuario" :disabled="!formularioValidado">
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
import { computed, ref } from 'vue'
import AuthService from '@/services/AuthService'
import { toTitleCase } from '@/utils'

let username = ref('')
let password = ref('')
let tfno = ref('')
let email = ref('')
let emailAdmitido = ref('')
let descripcion = ref('')
let passwordForRegisterFromUser = ref('')

const service = new AuthService()

// Validación Email
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// Validación Teléfono (exactamente 9 dígitos)
const isValidPhone = (phone) => /^[0-9]{9}$/.test(phone)

// Errores individuales
const emailError = computed(() => {
  if (email.value.trim() === '') return null
  return isValidEmail(email.value) ? null : 'El correo no es válido'
})
const phoneError = computed(() => {
  if (tfno.value.trim() === '') return null
  return isValidPhone(tfno.value) ? null : 'El teléfono debe tener 9 dígitos'
})
const formularioValidado = computed(() => {
  return (
    username.value.trim() != '' &&
    password.value.trim() != '' &&
    tfno.value.trim() != '' &&
    isValidPhone(tfno.value) &&        // Teléfono válido
    email.value.trim() != '' &&
    isValidEmail(email.value) &&       // <-- validación email
    descripcion.value.trim() != ''
  )
})
const solicitudRegistro = async () => {
  service.solicitudRegistro(
    username.value,
    password.value,
    tfno.value,
    email.value,
    emailAdmitido.value,
    descripcion.value,
    passwordForRegisterFromUser.value
  )
}
</script>
<style scoped lang="scss">
.container {
  padding: 20px;
  color: #a3b18a;
}

.login-form {
  max-width: 300px;
  /* Controla el ancho */
  text-align: left;
  /* Alinea el contenido a la izquierda */
  font-weight: bold;
}

.btn-primary {
  background: #a3b18a;
  border: none;
  font-size: 14px;
  color: white;
  padding: 8px 16px;
}

.btn-primary:hover {
  background-color: #588157;
}

.link-personalizado {
  color: #a3b18a;
  text-decoration: underline;
  font-weight: bold;
}

.link-personalizado:hover {
  color: #588157;
}

.passwordSistema {
  color: red;
}
</style>
