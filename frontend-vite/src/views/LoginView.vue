<template>
  <div class="container">
    <form class="login-form">
      <p class="text-danger">{{ feedback }}</p>
      <div class="mb-3">
        <label for="username" class="form-label">
          <b>{{ $t('administracion.username') }}</b>
        </label>
        <input type="text" class="form-control" id="username" v-model="username" />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">
          <b>{{ $t('administracion.password') }}</b>
        </label>
        <input type="password" class="form-control" id="password" v-model="password" />
      </div>

      <button type="button" @click="login" class="btn btn-primary">
        {{ $t('comun.iniciarSesion') }}
      </button>

      <p class="text-danger">{{ feedback }}</p>
    </form>

    <span>
      {{ $t('administracion.ofertaRegistro') }}
      <RouterLink :to="{ name: 'register' }" class="link-personalizado">
        {{ $t('administracion.crearCuenta') }}
      </RouterLink>
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthService from '@/services/AuthService'

let username = ref('')
let password = ref('')
let feedback = ref('')
const service = new AuthService()

const login = async () => {
  const response = service.login(username.value, password.value, feedback.value)
  response && await router.push({ name: 'home' })
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
</style>