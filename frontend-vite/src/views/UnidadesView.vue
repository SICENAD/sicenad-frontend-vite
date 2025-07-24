<template>
    <!-- muestra la vista de unidades -->
 <div class="d-flex align-items-center position-relative p-2 bg-light">
        <RouterLink class="nav-link volver me-auto" :to="{ name: name, params: params }">
            <v-icon name="fa-arrow-alt-circle-left" scale="2" class="me-2" />
            <strong>Volver</strong>
        </RouterLink>
        <h3 class="position-absolute start-50 translate-middle-x m-0 titulo">
            <u>GESTIÓN DE UNIDADES</u>
        </h3>
        <button class="btn text-white ms-auto" data-bs-toggle="modal" data-bs-target="#modal-nueva-unidad">
            Nueva <b>Unidad</b>
        </button>
    </div>
        <hr class='w-100'>
        <div class="row ms-5 p-0">
            <div class="col col-md-12">
                <div class="row mt-2 titulos">
                    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3 titulo">
                        <b>NOMBRE</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3 titulo">
                        <b>CORREO ELECTRÓNICO</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3 titulo">
                        <b>TELÉFONO</b>
                    </div>
                    <div class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3 titulo">
                        <b>POC</b>
                    </div>
                </div>
                <UnidadComponent v-for="(item, index) in unidades" :key="index" :content="item"
                    @emiteElemento="actualizarUnidadEnView" />
            </div>
        </div>
    <!-- Modal -->
    <div class="modal fade" id="modal-nueva-unidad" tabindex="-1" aria-labelledby="modal-nueva-unidad-Label"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-nueva-unidad-Label">
                        Nueva Unidad
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="titulo"><b>NOMBRE DE LA UNIDAD<sup class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>DIRECCIÓN<sup class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="direccion" v-model="direccion" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>TELÉFONO<sup class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="tfno" v-model="tfno" />
                            <span v-if="phoneError" class="text-danger">{{ phoneError }}</span>
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>EMAIL<sup class="text-danger">*</sup></b></label>
                            <input type="email" class="form-control letra" id="email" v-model="email" />
                            <span v-if="emailError" class="text-danger">{{ emailError }}</span>
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
                            <input type="textarea" class="form-control letra" id="descripcion" v-model="descripcion" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>POC<sup class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="poc" v-model="poc" />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t('comun.cerrar') }}
                    </button>
                    <button type="button" @click="crearUnidad" data-bs-dismiss="modal" class="btn btn-primary" :disabled="!formularioValidado">
                        Crear Unidad
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import UnidadComponent from '@/components/UnidadComponent.vue'
import UnidadService from '@/services/UnidadService'
import useAuthStore from '@/stores/auth'
const auth = useAuthStore()
let nombre = ref('')
let descripcion = ref('')
let email = ref('')
let tfno = ref('')
let direccion = ref('')
let poc = ref('')

const service = new UnidadService()
let unidades = service.getUnidades()

let rol = ref(auth.rol)
let idCenad = ''
auth.cenad && (idCenad = auth.cenad.idString)
let name = ref('superadministrador')
let params = ref({})

onMounted(async () => {
    await getUnidades()
    definirBtnVolver()
})
function definirBtnVolver() {
    name.value = rol.value === 'Superadministrador' ? 'cenads' : 'cenad-home'
    params.value = rol.value === 'Superadministrador' ? {} : { id: idCenad }
}
const crearUnidad = async () => {
    await service.crearUnidad(nombre.value, descripcion.value, email.value, tfno.value, direccion.value, poc.value)
    nombre.value = ''
    descripcion.value = ''
    email.value = ''
    tfno.value = ''
    direccion.value = ''
    poc.value = ''
    await getUnidades()
}
const getUnidades = async () => {
    await service.fetchAll()
}
async function actualizarUnidadEnView() {
    await getUnidades()
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
    poc.value.trim() != '' &&
    tfno.value.trim() != '' &&
    isValidPhone(tfno.value) &&        // Teléfono válido
    email.value.trim() != '' &&
    isValidEmail(email.value) &&       // <-- validación email
    descripcion.value.trim() != '' &&
    direccion.value.trim() != ''
  )
})
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
</style>