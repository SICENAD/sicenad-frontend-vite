<template>
    <!-- vista de administrador->ve gestores de su cenad -->
    <div>
        <h5 class="text-center titulo"><b>GESTORES</b></h5>
        <hr class="w-100" />
        <div class="d-flex justify-content-end mb-2">
            <button class="btn text-white mt-2" data-bs-toggle="modal" data-bs-target="#modal-nuevo-usuarioGestor">
                Nuevo <b>Usuario Gestor</b>
            </button>
        </div>
        <hr class="w-100" />
        <div class="row titulos">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 titulo">
                <b>GESTOR</b>
            </div>
        </div>
        <UsuarioGestorComponent v-for="(item, index) in usuariosGestor" :key="index" :content="item" />
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
                        <div class="row mb-3">
                            <label for="username" class="form-label"><b>{{ $t('administracion.username') }}</b></label>
                            <input type="text" class="form-control" id="usernameUsuarioGestor"
                                aria-describedby="usernameUsuarioGestor" v-model="usernameUsuarioGestor" />
                        </div>
                        <div class="row mb-3">
                            <label for="password" class="form-label"><b>{{ $t('administracion.password') }}</b></label>
                            <input type="password" class="form-control" id="passwordUsuarioGestor"
                                v-model="passwordUsuarioGestor" />
                        </div>
                        <div class="mb-3">
                            <label for="tfno" class="form-label"><b>{{ toTitleCase($t('administracion.tfno'))
                                    }}</b></label>
                            <input type="text" class="form-control" id="tfnoUsuarioGestor"
                                v-model="tfnoUsuarioGestor" />
                            <span v-if="phoneError" class="text-danger">{{ phoneError }}</span>
                        </div>
                        <div class="mb-3">
                            <label for="InputEmail1" class="form-label"><b>{{ toTitleCase($t('administracion.correo'))
                                    }}</b></label>
                            <input type="email" class="form-control" id="emailUsuarioGestor"
                                aria-describedby="emailHelp" v-model="emailUsuarioGestor" />
                            <div id="emailHelp" class="form-text">{{ $t('administracion.helpMail') }}</div>
                            <span v-if="emailError" class="text-danger">{{ emailError }}</span>
                        </div>
                        <div class="mb-3">
                            <label class="titulo me-2"><b>¿QUIERE RECIBIR NOTIFICACIONES?<sup
                                        class="text-danger">*</sup></b></label>
                            <input type="checkbox" class="letra" id="emailAdmitidoUsuarioGestor"
                                v-model="emailAdmitidoUsuarioGestor" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
                            <input type="textarea" class="form-control letra" id="descripcionUsuarioGestor"
                                v-model="descripcionUsuarioGestor" />
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t('comun.cerrar') }}
                    </button>
                    <button type="button" @click="crearUsuarioGestor" data-bs-dismiss="modal" class="btn btn-primary"
                        :disabled="!formularioValidado">
                        Crear Usuario Gestor
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import UsuarioService from '@/services/UsuarioService'
import UsuarioGestorComponent from '@/components/UsuarioGestorComponent.vue'
import { toTitleCase } from '@/utils'
import useAuthStore from '@/stores/auth'

const auth = useAuthStore()
const idCenad = auth.cenad.idString

const service = new UsuarioService()
let usuariosGestor = computed(() => auth.usuariosGestor)

let tfnoUsuarioGestor = ref('')
let emailUsuarioGestor = ref('')
let emailAdmitidoUsuarioGestor = ref(false)
let descripcionUsuarioGestor = ref('')
let usernameUsuarioGestor = ref('')
let passwordUsuarioGestor = ref('')

const crearUsuarioGestor = async () => {
    await service.crearUsuarioGestor(usernameUsuarioGestor.value, passwordUsuarioGestor.value, tfnoUsuarioGestor.value, emailUsuarioGestor.value, emailAdmitidoUsuarioGestor.value, descripcionUsuarioGestor.value, idCenad)
    usernameUsuarioGestor.value = ''
    passwordUsuarioGestor.value = ''
    tfnoUsuarioGestor.value = ''
    emailUsuarioGestor.value = ''
    emailAdmitidoUsuarioGestor.value = false
    descripcionUsuarioGestor.value = ''
}
// Validación Email
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// Validación Teléfono (exactamente 9 dígitos)
const isValidPhone = (phone) => /^[0-9]{9}$/.test(phone)

// Errores individuales
const emailError = computed(() => {
    if (emailUsuarioGestor.value.trim() == '') return null
    return isValidEmail(emailUsuarioGestor.value) ? null : 'El correo no es válido'
})
const phoneError = computed(() => {
    if (tfnoUsuarioGestor.value.trim() == '') return null
    return isValidPhone(tfnoUsuarioGestor.value) ? null : 'El teléfono debe tener 9 dígitos'
})
const formularioValidado = computed(() => {
    return (
        usernameUsuarioGestor.value.trim() != '' &&
        passwordUsuarioGestor.value.trim() != '' &&
        tfnoUsuarioGestor.value.trim() != '' &&
        isValidPhone(tfnoUsuarioGestor.value) &&        // Teléfono válido
        emailUsuarioGestor.value.trim() != '' &&
        isValidEmail(emailUsuarioGestor.value) &&       // <-- validación email
        descripcionUsuarioGestor.value.trim() != '' 
    );
});
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
