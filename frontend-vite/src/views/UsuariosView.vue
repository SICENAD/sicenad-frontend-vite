<template>
    <!-- muestra la vista principal de la gestión de usuarios. si se accede como superadministrador mostrará 
administradores y normales y si se entra como administrador de un cenad mostrara gestores de su cenad y normales -->
    <div class="container-fluid">
        <div class="row ms-4 mb-3 ps-3">
            <RouterLink class="nav-link volver" :to="{ name: name, params: params }">
                <v-icon name="fa-arrow-alt-circle-left" scale="2" class="me-2" /><strong>Volver</strong>
            </RouterLink>
        </div>
        <hr class='w-100 mb-2'>
        <div class="row ms-5 p-0" v-if="(rol == 'Normal' || rol == 'Gestor' || (rol == 'Administrador' && !isMiCenad))">
            <p class="titulo mt-3">NO ESTÁS AUTORIZADO</p>
        </div>
        <!-- vista de superadministrador->ve superadministradores,administradores y usuarios normales -->
        <div class="row ms-5" v-if='rol == "Superadministrador"'>
            <!-- superadministradores -->
            <div class="col col-md-4">
                <UsuariosSuperadministradorView />
            </div>
            <!-- administradores -->
            <div class="col col-md-4 filtro">
                <UsuariosAdministradorView />
            </div>
            <!-- usuarios normales -->
            <div class="col col-md-4 filtro">
                <UsuariosNormalView />
            </div>
        </div>
        <!-- vista de administrador->ve gestores y usuarios normales -->
        <div class="row ms-5" v-if='(rol == "Administrador" && isMiCenad)'>
            <!-- superadministradores -->
            <div class="col col-md-6">
                <UsuariosGestorView />
            </div>
            <!-- usuarios normales -->
            <div class="col col-md-6 filtro">
                <UsuariosNormalView />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import useAuthStore from '@/stores/auth'
import UsuariosAdministradorView from './UsuariosAdministradorView.vue'
import UsuariosNormalView from './UsuariosNormalView.vue'
import UsuariosGestorView from './UsuariosGestorView.vue'
import UsuariosSuperadministradorView from './UsuariosSuperadministradorView.vue'
const auth = useAuthStore()
let name = ref('superadministrador')
let params = ref({})
let idCenad = 1 //tendre que captar el idCenad del administrador, ya que es para el caso en el que el usuario sea el Administrador de un CENAD
//let volver = ref('{ name: superadministrador }')//tengo que hacer condicion para que si es superadmistrador valga eso y si es administradot vaya a la pagina del cenad concreto 
let isMiCenad = ref(true)//se modificara si estoy en un CENAD perteneciente al usuario gestor o administrador
let rol = ref(auth.rol)
//rol.value = 'Administrador'

onMounted(async () => {
    definirBtnVolver()
})
function definirBtnVolver() {
    name.value = rol.value === 'Superadministrador' ? 'superadministrador' : 'cenads'
    params.value = rol.value === 'Superadministrador' ? {} : { id: idCenad }
}
</script>
<style scoped lang="scss">
.btn {
    background: #3A5A40;
    padding: 0.5;
    font-size: 14px;
}

.btn:hover {
    background-color: #A3B18A;
}

.titulo {
    color: #3A5A40;
    font-weight: bold;
}

.titulo1 {
    color: #588157;
}

h5 {
    color: #354f52;
    font-weight: bold;
}

a.volver {
    color: #3A5A40;
    font-size: 18px;
}

a.volver:hover {
    color: #A3B18A;
}

.row {
    height: auto;
    padding: auto;
    margin: auto;
}

hr {
    margin-bottom: 0;
    margin-top: 1;
}

.modal {
    max-height: 100%;
    max-width: 100%;
    margin: auto;
}

div.filtro {
    border: 6px solid #588157;
    border-top: 0px;
    border-bottom: 0px;
    border-right: 0px;
}

.btn {
    background: #3A5A40;
    padding: 0.5;
    font-size: 14px;
}

.btn:hover {
    background-color: #A3B18A;
}

.titulo {
    color: #3A5A40;
    font-weight: bold;
}

.titulo1 {
    color: #588157;
}

h5 {
    color: #354f52;
    font-weight: bold;
    background-color: lightgreen;
}

a.volver {
    color: #3A5A40;
    font-size: 18px;
}

a.volver:hover {
    color: #A3B18A;
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

.modal {
    max-height: 100%;
    max-width: 100%;
    margin: auto;
}

div.titulos {
    background-color: #DAD7CD;
}
</style>
