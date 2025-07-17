<template>
    <!-- vista de administrador->ve gestores de su cenad -->
    <div>
        <h5 class="text-center titulo"><b>SUPERADMINISTRADORES</b></h5>
        <hr class="w-100" />
        <div class="d-flex justify-content-end mb-2">

            <RouterLink :to="{ name: 'register' }">
                <button class="btn text-white mt-2">Nuevo <b>Usuario Superadministrador</b></button>
            </RouterLink>

        </div>
        <hr class="w-100" />
        <div class="row titulos">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 titulo">
                <b>SUPERADMINISTRADOR</b>
            </div>
        </div>
        <UsuarioSuperadministradorComponent v-for="(item, index) in usuariosSuperadministrador" :key="index" :content="item"
            @emiteElemento="actualizarUsuarioSuperadministradorEnView" />
    </div>
</template>
<script setup>
import { onMounted } from 'vue'
import UsuarioService from '@/services/UsuarioService'
import UsuarioSuperadministradorComponent from '@/components/UsuarioSuperadministradorComponent.vue'

const service = new UsuarioService()
let usuariosSuperadministrador = service.getUsuariosSuperadministrador()

onMounted(async () => {
    await getUsuariosSuperadministrador()
})

const getUsuariosSuperadministrador = async () => {
    await service.fetchUsuariosSuperadministrador()
}
async function actualizarUsuarioSuperadministradorEnView() {
    await getUsuariosSuperadministrador()
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
