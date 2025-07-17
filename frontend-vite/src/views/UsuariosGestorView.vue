<template>
    <!-- vista de administrador->ve gestores de su cenad -->
    <div>
        <h5 class="text-center titulo"><b>USUARIOS GESTORES</b></h5>
        <hr class="w-100" />
        <div class="d-flex justify-content-end mb-2">
            <button class="btn text-white " data-bs-toggle="modal" data-bs-target="#modal-nuevo-usuarioGestor">
                Nuevo <b>Usuario Gestor</b>
            </button>
        </div>
        <hr class="w-100" />
        <div class="row titulos">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 titulo">
                <b>GESTOR</b>
            </div>
        </div>
        <UsuarioGestorComponent v-for="(item, index) in usuariosGestor" :key="index" :content="item"
            @emiteElemento="actualizarUsuarioGestorEnView" />
    </div>
    <!-- Modal usuarioGestor-->
    <div class="modal fade" id="modal-nuevo-usuarioGestor" tabindex="-1"
        aria-labelledby="modal-nuevo-usuarioGestor-Label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-nuevo-usuarioGestor-Label">
                        Nuevo Usuario Gestor
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="tfno" class="form-label"><b>{{ toTitleCase($t('administracion.tfno'))
                                    }}</b></label>
                            <input type="text" class="form-control" id="tfnoUsuarioGestor"
                                v-model="tfnoUsuarioGestor" />
                        </div>
                        <div class="mb-3">
                            <label for="InputEmail1" class="form-label"><b>{{ toTitleCase($t('administracion.correo'))
                                    }}</b></label>
                            <input type="email" class="form-control" id="emailUsuarioGestor"
                                aria-describedby="emailHelp" v-model="emailUsuarioGestor" />
                            <div id="emailHelp" class="form-text">{{ $t('administracion.helpMail') }}</div>
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>¿QUIERE RECIBIR NOTIFICACIONES?<sup
                                        class="text-danger">*</sup></b></label>
                            <input type="checkbox" class="form-control letra" id="emailAdmitidoUsuarioGestor"
                                v-model="emailAdmitidoUsuarioGestor" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
                            <input type="textarea" class="form-control letra" id="descripcionUsuarioGestor"
                                v-model="descripcionUsuarioGestor" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo me-2"><b>CENAD<sup class="text-danger">*</sup></b></label>
                            <select class="form-select" aria-label="cenadUsuarioGestor" v-model="cenadUsuarioGestor">
                                <option disabled value="">Selecciona el CENAD/CMT</option>
                                <option v-for="cenad in cenadsUsuarioGestor" :key="cenad.idString" :value="cenad">
                                    {{ cenad.nombre }}
                                </option>
                            </select>
                        </div>
                        <div class="row mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
                            <label for="username" class="form-label"><b>{{ $t('administracion.username') }}</b></label>
                            <input type="text" class="form-control" id="usernameUsuarioGestor"
                                aria-describedby="usernameUsuarioGestor" v-model="usernameUsuarioGestor" />
                        </div>
                        <div class="row mb-3 col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
                            <label for="password" class="form-label"><b>{{ $t('administracion.password') }}</b></label>
                            <input type="password" class="form-control" id="passwordUsuarioGestor"
                                v-model="passwordUsuarioGestor" />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t('comun.cerrar') }}
                    </button>
                    <button type="button" @click="crearUsuarioGestor" data-bs-dismiss="modal" class="btn btn-primary">
                        Crear Usuario Gestor
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import UsuarioService from '@/services/UsuarioService'
import UsuarioGestorComponent from '@/components/UsuarioGestorComponent.vue'
import { toTitleCase } from '@/utils'
import CenadService from '@/services/CenadService'

const cenadService = new CenadService()
const service = new UsuarioService()
let usuariosGestor = service.getUsuariosGestor()
let cenadsUsuarioGestor = cenadService.getCenads()

let tfnoUsuarioGestor = ref('')
let emailUsuarioGestor = ref('')
let emailAdmitidoUsuarioGestor = ref(false)
let descripcionUsuarioGestor = ref('')
let usernameUsuarioGestor = ref('')
let passwordUsuarioGestor = ref('')
let cenad = ref({})

onMounted(async () => {
    await getUsuariosGestor()
})
const crearUsuarioGestor = async () => {
    await service.crearUsuarioGestor(usernameUsuarioGestor.value, tfnoUsuarioGestor.value, emailUsuarioGestor.value, emailAdmitidoUsuarioGestor.value, descripcionUsuarioGestor.value, cenad.value)
    usernameUsuarioGestor.value = ''
    tfnoUsuarioGestor.value = ''
    emailUsuarioGestor.value = ''
    emailAdmitidoUsuarioGestor.value = false
    descripcionUsuarioGestor.value = ''
    cenad.value = {}
    await getUsuariosAdministrador()
}
const getUsuariosGestor = async () => {
    await service.fetchUsuariosGestor()
}
async function actualizarUsuarioGestorEnView() {
    await getUsuariosGestor()
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
