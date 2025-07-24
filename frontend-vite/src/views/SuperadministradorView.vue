<template>
    <!-- muestra la vista principal del superadministrador -->
    <div class="container-fluid">
        <div class="row">
            <div class="col col-md-2 p-3">
                <img class="madoc" width="80" height="110" alt="MADOC" src="/img/madoc.png" />
            </div>
            <div class="col col-md-7 align-self-center mt-4">
                <h3 class="bienvenido text-center titulo1"><u>SUPERADMINISTRADOR</u></h3>
            </div>
            <div class="col col-md-1 mt-4 ml-5">
                <h2 class="text-center">SICENAD</h2>
            </div>
        </div>
        <div class="row ">
            <div class="col-4 ps-0">
                <RouterLink class="nav-link ml-4 home" :to="{ name: 'home' }">
                    <v-icon name="fa-home" scale="2" /><strong>Home</strong>
                </RouterLink>
            </div>
            <div class="col-8 d-flex justify-content-end">
                 <button class="btn usuario me-2">
                    <RouterLink :to="{ name: 'cenads' }" class="link"><b>CENAD,s/CMT,s</b></RouterLink>
                </button>
                <button class="btn usuario me-2">
                    <RouterLink :to="{ name: 'usuarios-super' }" class="link"><b>Usuarios</b></RouterLink>
                </button>
                <button class="btn unidad text-white me-2">
                    <RouterLink :to="{ name: 'unidades-super' }" class="link"><b>Unidades</b></RouterLink>
                </button>
                <button class="btn tipoFormulario text-white me-2">
                    <RouterLink :to="{ name: 'tiposFormulario' }" class="link"><b>Tipos de Formulario</b></RouterLink>
                </button>
                <button class="btn categoriaFichero text-white me-2">
                    <RouterLink :to="{ name: 'categoriasFichero' }" class="link"><b>Categorías de Ficheros</b>
                    </RouterLink>
                </button>
                <button class="btn arma text-white me-2">
                    <RouterLink :to="{ name: 'armas' }" class="link"><b>Armas</b></RouterLink>
                </button>
            </div>
            <hr class="w-100 mt-3" />
        </div>
        <RouterView />
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import CenadService from '@/services/CenadService'
import useUtilsStore from '@/stores/utils'

const utils = useUtilsStore()
let nombre = ref('')
let provincia = ref('')
let direccion = ref('')
let tfno = ref('')
let descripcion = ref('')
let email = ref('')
let escudoFile = ref(null)
const previewEscudo = ref(null) // <-- URL para vista previa

const service = new CenadService()
const cenads = service.getCenads()

function onFileChange(e) {
    const file = e.target.files[0]
    escudoFile.value = file

    if (file) {
        previewEscudo.value = URL.createObjectURL(file)
    } else {
        previewEscudo.value = null
    }
}
onMounted(async () => {
    await getCenads()
})
const crearCenad = async () => {
    await service.crearCenad(nombre.value, provincia.value, direccion.value, tfno.value, email.value, descripcion.value, escudoFile.value)
    nombre.value = ''
    provincia.value = ''
    direccion.value = ''
    tfno.value = ''
    email.value = ''
    descripcion.value = ''
    escudoFile.value = ''
    await getCenads()
    this.previewEscudo.value = null
}
const getCenads = async () => {
    await service.fetchAll()
}
function actualizarCenadEnView() {
    getCenads()
}
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
        nombre.value.trim() != '' &&
        provincia.value.trim() != '' &&
        tfno.value.trim() != '' &&
        isValidPhone(tfno.value) &&        // Teléfono válido
        email.value.trim() != '' &&
        isValidEmail(email.value) &&       // <-- validación email
        descripcion.value.trim() != '' &&
        direccion.value.trim() != '' &&
        escudoFile.value.trim() != ''
    )
})
</script>
<style scoped lang="scss">
h2 {
    color: #354f52;
}

.bienvenido {
    color: #52796f;
}

img.madoc {
    max-width: 200;
    max-height: 276;
}

div.filtro {
    border: 6px solid #588157;
    border-top: 0px;
    border-bottom: 0px;
    border-right: 0px;
}

.btn {
    background: #A3B18A;
    padding: 0.5;
    font-size: 14px;
    color: white;
}

.btn:hover,
.tipoFormulario,
.categoriaFichero,
.unidad,
.usuario,
.arma,
.link {
    background-color: #588157;
    color: white;
    text-decoration: none;
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

.tipoFormulario:hover,
.categoriaFichero:hover,
.unidad:hover,
.usuario:hover,
.arma:hover {
    background-color: #A3B18A;
}

a.home {
    color: #3A5A40;
    font-size: 18px;
}

a.home:hover {
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
