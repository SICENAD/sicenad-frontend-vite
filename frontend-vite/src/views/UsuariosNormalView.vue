<template>
    <div>
        <h5 class="text-center titulo"><b>USUARIOS NORMALES</b></h5>
        <hr class="w-100" />
        <div class="d-flex justify-content-end mb-2">
            <button class="btn text-white mt-2" data-bs-toggle="modal" data-bs-target="#modal-nuevo-usuarioNormal">
                Nuevo <b>Usuario Normal</b>
            </button>
        </div>
        <hr class="w-100" />
        <div class="row titulos">
            <div class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 titulo">
                <b>USUARIO</b>
            </div>
            <div class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 titulo">
                <b>UNIDAD</b>
            </div>
        </div>
        <UsuarioNormalComponent v-for="(item, index) in usuariosNormal" :key="index" :content="item"
            @emiteElemento="actualizarUsuarioNormalEnView" />
    </div>
    <!-- Modal usuarioNormal-->
    <div class="modal fade" id="modal-nuevo-usuarioNormal" tabindex="-1"
        aria-labelledby="modal-nuevo-usuarioNormal-Label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-nuevo-usuarioNormal-Label">
                        Nuevo Usuario Normal
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row mb-3">
                            <label for="username" class="form-label"><b>{{ $t('administracion.username') }}</b></label>
                            <input type="text" class="form-control" id="usernameUsuarioNormal"
                                aria-describedby="usernameUsuarioNormal" v-model="usernameUsuarioNormal" />
                        </div>
                        <div class="row mb-3">
                            <label for="password" class="form-label"><b>{{ $t('administracion.password') }}</b></label>
                            <input type="password" class="form-control" id="passwordUsuarioNormal"
                                v-model="passwordUsuarioNormal" />
                        </div>
                        <div class="mb-3">
                            <label for="tfno" class="form-label"><b>{{ toTitleCase($t('administracion.tfno'))
                                    }}</b></label>
                            <input type="text" class="form-control" id="tfnoUsuarioNormal"
                                v-model="tfnoUsuarioNormal" />
                        </div>
                        <div class="mb-3">
                            <label for="InputEmail1" class="form-label"><b>{{ toTitleCase($t('administracion.correo'))
                                    }}</b></label>
                            <input type="email" class="form-control" id="emailUsuarioNormal"
                                aria-describedby="emailHelp" v-model="emailUsuarioNormal" />
                            <div id="emailHelp" class="form-text">{{ $t('administracion.helpMail') }}</div>
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>¿QUIERE RECIBIR NOTIFICACIONES?<sup
                                        class="text-danger">*</sup></b></label>
                            <input type="checkbox" class="letra" id="emailAdmitidoUsuarioNormal"
                                v-model="emailAdmitidoUsuarioNormal" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
                            <input type="textarea" class="form-control letra" id="descripcionUsuarioNormal"
                                v-model="descripcionUsuarioNormal" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo me-2"><b>UNIDAD<sup class="text-danger">*</sup></b></label>
                            <select class="form-select" aria-label="unidad" v-model="unidad">
                                <option disabled value="">Selecciona la unidad</option>
                                <option v-for="unidad in unidades" :key="unidad.idString" :value="unidad">
                                    {{ unidad.nombre }}
                                </option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t('comun.cerrar') }}
                    </button>
                    <button type="button" @click="crearUsuarioNormal" data-bs-dismiss="modal" class="btn btn-primary">
                        Crear Usuario Normal
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import UsuarioService from '@/services/UsuarioService'
import UsuarioNormalComponent from '@/components/UsuarioNormalComponent.vue'
import { toTitleCase } from '@/utils'
import UnidadService from '@/services/UnidadService'

const unidadService = new UnidadService()
const service = new UsuarioService()
let usuariosNormal = service.getUsuariosNormal()
let unidades = unidadService.getUnidades()
let tfnoUsuarioNormal = ref('')
let emailUsuarioNormal = ref('')
let emailAdmitidoUsuarioNormal = ref(false)
let descripcionUsuarioNormal = ref('')
let usernameUsuarioNormal = ref('')
let passwordUsuarioNormal = ref('')
let unidad = ref({})

onMounted(async () => {
    await getUsuariosNormal()
})
const crearUsuarioNormal = async () => {
    await service.crearUsuarioNormal(usernameUsuarioNormal.value, tfnoUsuarioNormal.value, emailUsuarioNormal.value, emailAdmitidoUsuarioNormal.value, descripcionUsuarioNormal.value, unidad.value)
    usernameUsuarioNormal.value = ''
    tfnoUsuarioNormal.value = ''
    emailUsuarioNormal.value = ''
    emailAdmitidoUsuarioNormal.value = false
    descripcionUsuarioNormal.value = ''
    unidad.value = {}
    await getUsuariosNormal()
}
const getUsuariosNormal = async () => {
    await service.fetchUsuariosNormal()
}
async function actualizarUsuarioNormalEnView() {
    await getUsuariosNormal()
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
