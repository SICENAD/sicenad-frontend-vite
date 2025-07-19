<template>
  <header>
    <span class="d-flex mb-2">
      <h5 class="me-3">{{ $t('comun.selectLanguage') }}</h5>
      <span class="dropdown">
        <button class="btn btn-outline-secondary dropdown-toggle d-flex align-items-center rounded-pill px-3"
          type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img :src="getFlag($i18n.locale)" width="20" height="15" alt="Bandera" />
          {{ getLanguageLabel($i18n.locale) }}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li v-for="locale in $i18n.availableLocales" :key="locale">
            <a class="dropdown-item d-flex align-items-center" href="#" @click.prevent="$i18n.locale = locale">
              <img :src="getFlag(locale)" class="me-2" width="20" height="15" />
              {{ getLanguageLabel(locale) }}
            </a>
          </li>
        </ul>
      </span>
    </span>
    <p v-if="authStore.token" class="alert alert-success">
      {{ authStore.username }}
      {{ $t('comun.usuarioIdentificado') }} {{ authStore.rol }}
      <button class="btn btn-success ml-3" @click="logout">{{ $t('comun.cerrarSesion') }}</button>
    </p>
    <p v-else class="alert alert-danger">
      {{ $t('comun.usuarioNoIdentificado') }}
      <RouterLink :to="{ name: 'login' }">
        <button class="btn btn-danger ml-2">{{ $t('comun.iniciarSesion') }}</button>
      </RouterLink>
    </p>
  </header>
</template>
<script setup>
import router from '@/router'
import { RouterLink } from 'vue-router'
import useAuthStore from '@/stores/auth'
import { baseNormalizada } from '@/utils'

const authStore = useAuthStore()

const getLanguageLabel = (locale) => {
  const labels = {
    es: 'Español',
    en: 'English',
    fr: 'Français',
  }
  return labels[locale] || locale
}

const getFlag = (locale) => {
  const flags = {
    es: `${baseNormalizada()}img/banderas/es.svg`, // 🇪🇸
    en: `${baseNormalizada()}img/banderas/us.svg`, // 🇺🇸
    fr: `${baseNormalizada()}img/banderas/fr.svg`, // 🇫🇷
  }
  return flags[locale] || `${baseNormalizada()}img/banderas/default.svg`
}

const logout = () => {
  authStore.logout()
  router.push({ name: 'home' })
}
</script>
<style lang="scss">
header {
  margin-top: 30px;
}

header .miNavBarRow {
  margin-left: 50px;
  margin-right: 50px;
}

header .nav {
  min-height: 80px;
  overflow: visible;
  background: #fff;
}

/*-- LOGOTIPO ---*/
header .logo h2,
header .logo span,
header .logo p {
  font-size: 16px;
  display: inline-block;
  /*--para que os elementos se ponga uno al lado del otro--*/
  margin: 0;
}

header .logo h2 {
  font-weight: 900;
  /* -- el cogido de la fuente de google-- */
  text-transform: uppercase;
  color: #ef1b2d;
}

header .logo h5 {
  font-weight: 600;
  /* -- el cogido de la fuente de google-- */
  color: blue;
}

header .logo h2:hover {
  color: #23f010;
}

header .logo .color-0 {
  color: #df0bcd;
}

header .logo p {
  color: #dd12e4;
}

/* ------ menu ------*/
header .menu {
  padding: 0;
}

header .menu a {
  display: block;
  /*--- Se transforman en elementos de bloque, por lo que siempre empiezan en una nueva línea y siempre ocupan todo el espacio disponible en la línea, aunque sus contenidos no ocupen todo el sitio ---*/
  padding: 0 30px;
  /*--  0 en el eje x y 30 en el eje y--*/
  text-decoration: none;
  color: #fff;
  /*--- Texto de color blanco ---*/
}

header .menu a div span {
  font-weight: 600;
}

/*--- Para cambiar e fondo de los enlaces ---*/
header .menu .color-1 {
  background-color: #3da5e2;
}

header .menu .color-2 {
  background-color: #005385;
}

header .menu .color-3 {
  background-color: #003855;
}

header .menu .color-4 {
  background-color: #1083bd;
}

/*--- hover de los enlaces ---*/
header .menu .color-1:hover {
  background: #ef1b2d;
}

header .menu .color-2:hover {
  background: orange;
}

header .menu .color-3:hover {
  background: deeppink;
}

header .menu .color-4:hover {
  background: #eef107;
}

.logueado {
  color: darkgrey;
}

.router-link-active div {
  color: yellow;
}






header {
  margin-top: 10px;
}

.logueado {
  color: darkgrey;
}

.btn {
  background: #A3B18A;
}

.titulo {
  color: #3A5A40;
}

.identificar:hover {
  background: green;
}

.cerrar:hover {
  background: red;
}

.letra {
  color: #588157;
}
</style>
