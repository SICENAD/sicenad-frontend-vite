<template>
    <div class="container-fluid mb-0 pb-0">
        <div class="row titulo mt-1">
            <div class="col col-md-1">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContenido"
                    aria-controls="navbarContenido" aria-expanded="false" aria-label="Toggle navigation"
                    @click="toggleMenu">
                    <v-icon scale="2" name="fa-bars" />
                </button>
            </div>
            <div class="col col-md-10">
                <h1>{{ cenad?.nombre.toUpperCase() }}</h1>
            </div>
        </div>

        <div class="row">
            <div class="col col-md-12 menu">
                <nav class="navbar navbar-expand-lg collapse navbar-collapse mt-0 pt-0 pb-0"
                    :class="{ show: menuVisible }" id="navbarContenido">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item home">
                            <router-link class="nav-link home" to="/">
                                <v-icon scale="2" name="fa-home" />
                            </router-link>
                        </li>
                        <li class="nav-item homePrincipal">
                            <router-link class="nav-link homePrincipal"
                                :to="{ name: 'cenad-home', params: { idCenad } }">
                                CENAD/CMT
                            </router-link>
                        </li>
                        <!-- Dropdown: Consultar -->
                        <li class="nav-item dropdown">
                            <button class="nav-link dropdown-toggle" href="#" role="button">
                                <v-icon scale="2" name="fa-edge" />Consultar
                            </button>
                            <div class="dropdown-menu consultar">
                                <router-link class="nav-link" :to="`/consultaRecursos/${idCenad}`">
                                    <v-icon scale="2" name="fa-folder-open" />Recurso
                                </router-link>

                                <router-link v-if="!isSuperAdmin" class="nav-link" :to="`/calendarios/${idCenad}`">
                                    <v-icon scale="2" name="fa-calendar-alt" />Calendario
                                </router-link>

                                <router-link class="nav-link" :to="`/cartografias/${idCenad}`">
                                    <v-icon scale="2" name="fa-map" />Cartografía
                                </router-link>

                                <a v-if="!isCenadZaragoza" class="nav-link" href="https://www.tiempo.com"
                                    target="_blank">
                                    <v-icon scale="2" name="fa-snowflake" />Meteorología
                                </a>

                                <a class="nav-link" href="http://srvgregwww02/GESNOEX" target="_blank">
                                    <v-icon scale="2" name="fa-bomb" />Artefactos No Explosionados
                                </a>

                                <a v-if="isCenadZaragoza" class="nav-link" href="https://10.63.172.26/so/#/login"
                                    target="_blank">
                                    <v-icon scale="2" name="fa-search-location" />Vistas ACMT
                                </a>

                                <!-- Submenú: Meteorología especial Zaragoza -->
                        <li class="nav-item dropdown-submenu" v-if="isCenadZaragoza">
                            <a class="nav-link dropdown-toggle" href="#">
                                <v-icon scale="2" name="fa-snowflake" />Meteorología
                            </a>
                            <div class="dropdown-menu submenu">
                                <a class="nav-link" href="https://www.tiempo.com/san-gregorio.htm" target="_blank">
                                    <v-icon scale="2" name="fa-cloud-sun" />Previsión
                                </a>
                                <a class="nav-link" href="assets/CENAD-SG_Calculador-de-IPI.xlsx" target="_blank">
                                    <v-icon scale="2" name="fa-fire" />IPI
                                </a>
                                <a class="nav-link" href="http://10.63.172.49/map" target="_blank">
                                    <v-icon scale="2" name="fa-globe" />Datos por Zonas
                                </a>
                            </div>
                        </li>
            </div>
            </li>
            <!-- Otros -->
            <li class="nav-item dropdown">
                <button class="nav-link dropdown-toggle" href="#">
                    <v-icon scale="2" name="fa-folder-plus" />Otros
                </button>
                <div class="dropdown-menu otros">
                    <router-link class="nav-link" :to="`/infoCenad/${idCenad}`">
                        <v-icon scale="2" name="fa-question-circle" />Información
                    </router-link>
                    <router-link class="nav-link" :to="`/normativas/${idCenad}`">
                        <v-icon scale="2" name="fa-book" />Normativa
                    </router-link>
                </div>
            </li>

            <!-- Solicitudes -->
            <li class="nav-item gestionar" v-if="isGestorNormal">
                <router-link class="nav-link gestionar" :to="`/solicitudesRecursos/${idCenad}`">
                    <v-icon scale="2" name="fa-business-time" />Solicitudes
                </router-link>
            </li>

            <li class="nav-item gestionar" v-if="isAdminEsteCenad">
                <router-link class="nav-link gestionar" :to="`/calendarios/${idCenad}`">
                    <v-icon scale="2" name="fa-business-time" />Solicitudes
                </router-link>
            </li>
            <!-- Gestionar -->
            <li class="nav-item dropdown" v-if="isAdminEsteCenad">
                <button class="nav-link dropdown-toggle" href="#">
                    <v-icon scale="2" name="fa-user" />Gestionar
                </button>
                <div class="dropdown-menu gestionar">
                    <router-link class="dropdown-item" :to="`/cartografias/${idCenad}`">
                        <v-icon scale="2" name="fa-map" />Cartografía
                    </router-link>
                    <router-link class="dropdown-item" :to="`/recursos/${idCenad}`">
                        <v-icon scale="2" name="fa-folder-open" />Recursos
                    </router-link>
                    <router-link class="dropdown-item" :to="`/categorias/${idCenad}`">
                        <v-icon scale="2" name="fa-tree" />Categorías
                    </router-link>
                    <router-link class="dropdown-item" :to="`/usuarios/${idCenad}`">
                        <v-icon scale="2" name="fa-users" />Usuarios
                    </router-link>
                    <router-link class="dropdown-item" :to="`/unidades/${idCenad}`">
                        <v-icon scale="2" name="fa-sitemap" />Unidades
                    </router-link>
                    <router-link class="dropdown-item" :to="`/normativas/${idCenad}`">
                        <v-icon scale="2" name="fa-book" />Normativa
                    </router-link>
                    <router-link class="dropdown-item" :to="`/infoCenad/${idCenad}`">
                        <v-icon scale="2" name="fa-question-circle" />Información
                    </router-link>
                </div>
            </li>
            </ul>
            </nav>
        </div>
    </div>
    </div>
</template>

<script setup>
import useAuthStore from '@/stores/auth'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const auth = useAuthStore()
const idCenad = computed(() => route.params.id)
const cenad = computed(() =>
    auth.cenads.find(c => c.idString == idCenad.value) || { nombre: 'CENAD' }
)
const cenads = ref([]);
const idCenadZaragoza = ref(null);

const isSuperAdmin = ref(auth.rol == 'Superadministrador')
let isCenadZaragoza = ref(false)
const isAdminEsteCenad = ref(
    idCenad.value == auth.cenad.idString && auth.rol == 'Administrador'
)
const isGestorNormal = ref(
    auth.rol == 'Gestor' || auth.rol == 'Normal'
)

const menuVisible = ref(false)
const toggleMenu = () => {
    menuVisible.value = !menuVisible.value
}
onMounted(async () => {
    console.log(idCenad.value)
    console.log(auth.cenad.idString)
    console.log(isAdminEsteCenad.value)
    cargarCenads()
    console.log(isCenadZaragoza.value)
/*
  if (!localStorage.getItem(`categorias_${this.idCenad}`)) {
      this.categoriaService
        .getCategoriasDeCenad(this.idCenad)
        .subscribe((response) =>
          localStorage.setItem(
            `categorias_${this.idCenad}`,
            JSON.stringify(this.categoriaService.extraerCategorias(response))
          )
        );
    }
    if (!localStorage.getItem(`categoriasPadre_${this.idCenad}`)) {
      this.categoriaService
        .getCategoriasPadreDeCenad(this.idCenad)
        .subscribe((response) =>
          localStorage.setItem(
            `categoriasPadre_${this.idCenad}`,
            JSON.stringify(this.categoriaService.extraerCategorias(response))
          )
        );
    }
    if (!localStorage.getItem(`recursos_${this.idCenad}`)) {
      this.recursoService
        .getRecursosDeCenad(this.idCenad)
        .subscribe((response) =>
          localStorage.setItem(
            `recursos_${this.idCenad}`,
            JSON.stringify(this.recursoService.extraerRecursos(response))
          )
        );
    }
    if(!localStorage.getItem(`usuariosGestor_${this.idCenad}`)) {
      this.usuarioGestorService.getUsuariosGestoresDeCenad(this.idCenad).subscribe((response) => localStorage.setItem(`usuariosGestor_${this.idCenad}`, JSON.stringify(this.usuarioGestorService.extraerUsuarios(response))));
    }
    if(!localStorage.getItem(`cartografias_${this.idCenad}`)) {
      this.cartografiaService.getCartografiasDeCenad(this.idCenad).subscribe((response) => localStorage.setItem(`cartografias_${this.idCenad}`, JSON.stringify(this.cartografiaService.extraerCartografias(response))));
    }
    if(!localStorage.getItem(`normativas_${this.idCenad}`)) {
      this.normativaService.getNormativasDeCenad(this.idCenad).subscribe((response) => localStorage.setItem(`normativas_${this.idCenad}`, JSON.stringify(this.normativaService.extraerNormativas(response))));
    }
  }
*/
    // Aquí irían las llamadas a los servicios usando fetch o al store
    // Por ejemplo: fetchCenad(idCenad.value).then(...)
})
 // Función corregida
function cargarCenads() {
  cenads.value = auth.cenads;
  buscarIdCenadZaragoza();
  comprobarCenadZaragoza();
}

// Buscar CENAD Zaragoza
function buscarIdCenadZaragoza() {
  cenads.value.forEach(c => {
    if (c.provincia == 50) {
      idCenadZaragoza.value = c.idString;
    }
  });
}

// Comprobar si es Zaragoza
function comprobarCenadZaragoza() {
  if (idCenadZaragoza.value == idCenad.value) {
    isCenadZaragoza.value = true;
  }
}
</script>

<style scoped>
h1 {
    color: #344e41;
    font-weight: bold;
}

h3,
.v-icon:hover {
    color: #3a5a40;
}

.nav {
    position: relative;
    margin: 0 30%;
    text-align: left;
    top: 40%;
    transform: translateY(-50%);
}

.menu {
    color: #dad7cd;
}

.titulo {
    background-color: #a3b18a;
    text-align: center;
    height: 5em;
    align-items: center;
}

.menu a {
    color: #588157;
    font-weight: bold;
    font-size: 18px;
    margin-top: 12px;
    margin-right: 20px;
}

.menu button {
    color: #588157;
    font-weight: bold;
    font-size: 18px;
    margin-right: 20px;
}

a:hover,
button:hover {
    color: yellowgreen;
}

li.home {
    margin-top: 0;
    padding-top: 0;
}

.menu a.home, a.gestionar {
    margin-top: 0;
}

.consultar {
    width: 320px !important;
}

.otros {
    width: 220px !important;
}

.dropdown-menu {
    display: none;
    position: relative;
    width: auto !important;
    white-space: nowrap;
}

.dropdown:hover .dropdown-menu {
    display: block;
}

.submenu {
    display: none !important;
    position: relative;
}

.dropdown-submenu:hover .submenu {
    display: block !important;
    position: relative;
}

.homePrincipal {
    cursor: pointer;
}
</style>