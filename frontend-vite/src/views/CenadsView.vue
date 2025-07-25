<template>
    <!-- muestra la vista principal del superadministrador -->
    <div class="d-flex align-items-center position-relative p-2 bg-light">
        <h3 class="position-absolute start-50 translate-middle-x m-0 titulo">
            <u>GESTIÓN DE CENAD,s/CMT,s</u>
        </h3>
        <button class="btn text-white ms-auto" data-bs-toggle="modal" data-bs-target="#modal-nuevo-cenad">
            Nuevo <b>CENAD/CMT</b>
        </button>
    </div>
    <hr class='w-100'>
    <div class="row ms-5 p-0">
        <div class="col col-md-12">
            <div class="row mt-2 titulos">
                <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 titulo">
                    <b>CENAD/CMT</b>
                </div>
                <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 titulo">
                    <b>PROVINCIA</b>
                </div>
                <div class="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 titulo">
                    <b>ADMINISTRADOR</b>
                </div>
            </div>
            <CenadComponent v-for="(item, index) in cenads" :key="index" :content="item" />
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modal-nuevo-cenad" tabindex="-1" aria-labelledby="modal-nuevo-cenad-Label"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-nuevo-cenad-Label">
                        Nuevo CENAD/CMT
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="titulo"><b>CENAD/CMT<sup class="text-danger">*</sup></b></label>
                            <input type="text" class="form-control letra" id="nombre" v-model="nombre" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo me-2"><b>PROVINCIA<sup class="text-danger">*</sup></b></label>
                            <select class="form-select" aria-label="provincia" v-model="provincia">
                                <option disabled value="">Selecciona la provincia</option>
                                <option v-for="provincia in provincias" :key="provincia.idProvincia"
                                    :value="provincia.idProvincia">
                                    {{ provincia.nombre }}
                                </option>
                            </select>
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
                            <label class="titulo"><b>EMAIL</b></label>
                            <input type="email" class="form-control letra" id="email" v-model="email" />
                            <span v-if="emailError" class="text-danger">{{ emailError }}</span>
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
                            <input type="textarea" class="form-control letra" id="descripcion" v-model="descripcion" />
                        </div>
                        <div class="mb-3">
                            <label class="titulo"><b>ESCUDO<sup class="text-danger mr-2">*</sup></b> (Tamaño máximo
                                permitido: {{ sizeMaxEscudo }} MB)</label>
                            <input type="file" accept="image/*" @change="onFileChange" />{{ escudo }}
                        </div>
                        <!-- Vista previa de la imagen -->
                        <div v-if="previewEscudo" style="margin-top: 10px;">
                            <label><b>Vista previa del escudo:</b></label><br />
                            <img :src="previewEscudo" alt="Vista previa" style="max-height: 100px;"
                                class="img-thumbnail" />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t('comun.cerrar') }}
                    </button>
                    <button type="button" @click="crearCenad" data-bs-dismiss="modal" class="btn btn-primary"
                        :disabled="!formularioValidado">
                        Crear CENAD/CMT
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import CenadComponent from '@/components/CenadComponent.vue'
import CenadService from '@/services/CenadService'
import useUtilsStore from '@/stores/utils'
import useAuthStore from '@/stores/auth'
const auth = useAuthStore()
const utils = useUtilsStore()
let provincias = utils.provincias
let sizeMaxEscudo = ref(utils.sizeMaxEscudo)
let nombre = ref('')
let provincia = ref('')
let direccion = ref('')
let tfno = ref('')
let descripcion = ref('')
let email = ref('')
let escudoFile = ref(null)
const previewEscudo = ref(null) // <-- URL para vista previa

const service = new CenadService()
const cenads = computed(() => auth.cenads)

function onFileChange(e) {
    const file = e.target.files[0]
    escudoFile.value = file

    if (file) {
        previewEscudo.value = URL.createObjectURL(file)
    } else {
        previewEscudo.value = null
    }
}
const crearCenad = async () => {
    await service.crearCenad(nombre.value, provincia.value, direccion.value, tfno.value, email.value, descripcion.value, escudoFile.value)
    nombre.value = ''
    provincia.value = ''
    direccion.value = ''
    tfno.value = ''
    email.value = ''
    descripcion.value = ''
    escudoFile.value = ''
    this.previewEscudo.value = null
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