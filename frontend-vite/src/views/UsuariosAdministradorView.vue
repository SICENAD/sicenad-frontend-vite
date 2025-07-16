<template>
        <!-- vista de superadministrador->ve administradores -->
        <div>
            <h5 class="text-center titulo"><b>USUARIOS ADMINISTRADORES</b></h5>
            <hr class="w-100" />
            <div class="d-flex justify-content-end mb-2">
                <button class="btn text-white mt-2" data-bs-toggle="modal"
                    data-bs-target="#modal-nuevo-usuarioAdministrador">
                    Nuevo <b>Usuario Administrador</b>
                </button>
            </div>
            <hr class="w-100" />
            <div class="row titulos">
                <div class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 titulo">
                    <b>ADMINISTRADOR</b>
                </div>
                <div class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 titulo">
                    <b>CENAD/CMT</b>
                </div>
            </div>
            <UsuarioAdministradorComponent v-for="(item, index) in usuariosAdministrador" :key="index" :content="item"
                @emiteElemento="actualizarUsuarioAdministradorEnView" />
        </div>
    <!-- Modal usuarioAdministrador-->
    <div class="modal fade" id="modal-nuevo-usuarioAdministrador" tabindex="-1"
        aria-labelledby="modal-nuevo-usuarioAdministrador-Label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-nuevo-usuarioAdministrador-Label">
                        Nuevo Usuario Administrador
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="tfno" class="form-label"><b>{{ toTitleCase($t('administracion.tfno'))
                            }}</b></label>
                            <input type="text" class="form-control" id="tfnoUsuarioAdministrador"
                                v-model="tfnoUsuarioAdministrador" />
                        </div>
                        <div class="mb-3">
                            <label for="InputEmail1" class="form-label"><b>{{
                                toTitleCase($t('administracion.correo'))
                            }}</b></label>
                            <input type="email" class="form-control" id="emailUsuarioAdministrador"
                                aria-describedby="emailHelp" v-model="emailUsuarioAdministrador" />
                            <div id="emailHelp" class="form-text">{{ $t('administracion.helpMail') }}</div>
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>¿QUIERE RECIBIR NOTIFICACIONES?<sup
                                        class="text-danger">*</sup></b></label>
                            <input type="checkbox" class="form-control letra" id="emailAdmitidoUsuarioAdministrador"
                                v-model="emailAdmitidoUsuarioAdministrador" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
                            <input type="textarea" class="form-control letra" id="descripcionUsuarioAdministrador"
                                v-model="descripcionUsuarioAdministrador" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo me-2"><b>CENAD<sup class="text-danger">*</sup></b></label>
                            <select class="form-select" aria-label="cenadUsuarioAdministrador"
                                v-model="cenadUsuarioAdministrador">
                                <option disabled value="">Selecciona el CENAD/CMT</option>
                                <option v-for="cenad in cenadsUsuarioAdministrador" :key="cenad.idString"
                                    :value="cenad">
                                    {{ cenad.nombre }}
                                </option>
                            </select>
                        </div>
                        <div class="row mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
                            <label for="username" class="form-label"><b>{{ $t('administracion.username')
                            }}</b></label>
                            <input type="text" class="form-control" id="usernameUsuarioAdministrador"
                                aria-describedby="usernameUsuarioAdministrador"
                                v-model="usernameUsuarioAdministrador" />
                        </div>
                        <div class="row mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
                            <label for="password" class="form-label"><b>{{ $t('administracion.password')
                            }}</b></label>
                            <input type="password" class="form-control" id="passwordUsuarioAdministrador"
                                v-model="passwordUsuarioAdministrador" />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t('comun.cerrar') }}
                    </button>
                    <button type="button" @click="crearUsuarioAdministrador" data-bs-dismiss="modal"
                        class="btn btn-primary">
                        Crear Usuario Administrador
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import UsuarioService from '@/services/UsuarioService'
import UsuarioAdministradorComponent from '@/components/UsuarioAdministradorComponent.vue'
import { toTitleCase } from '@/utils'
import CenadService from '@/services/CenadService'

const cenadService = new CenadService()
const service = new UsuarioService()
let usuariosAdministrador = service.getUsuariosAdministrador()
let cenadsUsuarioAdministrador = cenadService.getCenads()

let tfnoUsuarioAdministrador = ref('')
let emailUsuarioAdministrador = ref('')
let emailAdmitidoUsuarioAdministrador = ref(false)
let descripcionUsuarioAdministrador = ref('')
let usernameUsuarioAdministrador = ref('')
let passwordUsuarioAdministrador = ref('')
let cenad = ref('')

onMounted(async () => {
    await getUsuariosAdministrador()
})
const crearUsuarioAdministrador = async () => {
    await service.crearUsuarioAdministrador(usernameUsuarioAdministrador.value, tfnoUsuarioAdministrador.value, emailUsuarioAdministrador.value, emailAdmitidoUsuarioAdministrador.value, descripcionUsuarioAdministrador.value, cenad.value)
    usernameUsuarioAdministrador.value = ''
    tfnoUsuarioAdministrador.value = ''
    emailUsuarioAdministrador.value = ''
    emailAdmitidoUsuarioAdministrador.value = false
    descripcionUsuarioAdministrador.value = ''
    cenad.value = ''
    await getUsuariosAdministrador()
}
const getUsuariosAdministrador = async () => {
    await service.fetchUsuariosAdministrador()
}
async function actualizarUsuarioAdministradorEnView() {
    await getUsuariosAdministrador()
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
