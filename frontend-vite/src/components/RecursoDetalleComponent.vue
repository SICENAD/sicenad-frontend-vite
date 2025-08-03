<template>
    <!-- muestra el contenido del recurso, con diferente vista segun este logueado como gestor del recurso o no -->
    <div class="container-fluid">
        <div class="position-relative d-flex align-items-center mb-3" style="height: 50px;">
            <!-- Flecha alineada a la izquierda -->
            <RouterLink class="nav-link volver position-absolute start-0 d-flex align-items-center"
                :to="{ name: 'cenad-home', params: { id: idCenad } }">
                <v-icon name="fa-arrow-alt-circle-left" scale="2" class="me-2" />
                <strong>Volver</strong>
            </RouterLink>
            <!-- Título centrado -->
            <h3 class="titulo1 position-absolute start-50 translate-middle-x text-center"><b>{{ nombre }}</b></h3>
        </div>
        <hr class="w-100 mt-0 mb-1" />
        <!-- este boton se deberá mostrar solo si eres el gestor del recurso -->
        <div class="row  align-items-start mt-0 pt-0 ">
            <div class="col-3" v-if='isGestorEsteRecurso'>
                <button class="btn text-white" @click='cambiaRol'>Cambiar a Vista {{ rol }}</button>
            </div>
        </div>
        <!--esta sera la vista del gestor-->
        <div v-if="rol != 'Gestor'">
            <form>
                <div class="row py-2">
                    <div class="col-lg-3 col-md-12">
                        <label class="titulo"><b>NOMBRE<sup class="text-danger">*</sup></b></label>
                        <input type="text" class="form-control letra" v-model="nombre" placeholder="Nombre del recurso"
                            name="nombre" required />
                    </div>
                    <div class="col-lg-3 col-md-12 d-flex">
                        <label class="titulo me-2"><b>CATEGORÍA<sup class="text-danger">*</sup></b></label>
                        <label class="titulo1"> {{ categoria }} </label>
                    </div>
                    <div class="col-lg-12 col-md-12 pt-3">
                        <label class="titulo"><b>DESCRIPCIÓN<sup class="text-danger">*</sup></b></label>
                        <textarea class="form-control letra" v-model="descripcion" placeholder="Descripción del recurso"
                            name="descripcion" required rows="5" cols="50">
                        </textarea>
                    </div>
                    <div class="col-lg-12 col-md-12 pt-3">
                        <label class="titulo"><b>OTROS<sup class="text-danger">*</sup></b></label>
                        <textarea class="form-control letra" v-model="otros" placeholder="Otros datos del recurso"
                            name="otros" required rows="5" cols="50">
                        </textarea>
                    </div>
                    <div class="col-lg-12 col-md-12 pt-3">
                        <label class="titulo me-2"><b>¿TIENE DATOS ESPECÍFICOS PARA SU SOLICITUD?<sup
                                    class="text-danger">*</sup></b></label>
                        <input type="checkbox" v-model="conDatosEspecificosSolicitud" required />
                    </div>
                    <div class="col-lg-12 col-md-12 pt-3" v-if="conDatosEspecificosSolicitud">
                        <label class="titulo"><b>DATOS ESPECÍFICOS DE LA SOLICITUD<sup
                                    class="text-danger">*</sup></b></label>
                        <textarea class="form-control letra" v-model="datosEspecificosSolicitud"
                            placeholder="Datos específicos para la solicitud" datosEspecificosSolicitud="otros" rows="5"
                            cols="50">
                        </textarea>
                    </div>
                </div>
                <!--aqui insertare la vista de ficheros del gestor, un listado donde crearlos y editarlos...-->
            <FicherosComponent :rol="rol"/>
                <div class="form-row justify-content-between pt-3">
                    <div class="col-lg-5 col-md-12 mb-4">
                        <button type="button" @click="actualizar" data-bs-dismiss="modal" class="btn text-white">
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <!--esta sera la vista del usuario normal-->
        <div class="container-fluid" v-else>
            <div class="titulo">
                <h4 class="text-center"><b>DESCRIPCIÓN</b></h4>
                <hr>
                <p class="texto ms-3">{{ descripcion }}</p>
            </div>
            <!--ahora tendria que recorrer los ficheros clasificados por categoria de fichero...con enlaces de descarga o modales si son imagenes-->
            <FicherosComponent :rol="rol"/>
            <div class="titulo">
                <h4 class="text-center"><b>CALENDARIO</b></h4>
                <hr>
                <a href="/manual.pdf" target="_blank" rel="noopener">
                    <p class="texto href ms-3">Calendario del recurso {{ nombre }}</p>
                </a>
            </div>
            <div class="titulo">
                <h4 class="text-center"><b>OTROS</b></h4>
                <hr>
                <p class="texto ms-3">{{ otros }}</p>
            </div>
            <div class="titulo" v-if='conDatosEspecificosSolicitud'>
                <h4 class="text-center"><b>DATOS ESPECÍFICOS DE LA SOLICITUD</b></h4>
                <hr>
                <textarea class="texto" rows="6" cols="60" readonly v-model="datosEspecificosSolicitud"></textarea>
            </div>

        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import useAuthStore from '@/stores/auth'
import RecursoService from '@/services/SolicitudService'
import UsuarioService from '@/services/UsuarioService'
import CategoriaService from '@/services/CategoriaService'
import FicherosComponent from '@/components/FicherosComponent.vue'
const service = new RecursoService()
const usuarioService = new UsuarioService()
const categoriaService = new CategoriaService()
const route = useRoute()
const auth = useAuthStore()
const idCenad = computed(() => route.params.id)
const idRecurso = computed(() => route.params.idRecurso)
const idGestor = ref('')
const categoria = ref('')
let recurso = ref()
let nombre = ref('')
let descripcion = ref('')
let otros = ref('')
let conDatosEspecificosSolicitud = ref(false)
let datosEspecificosSolicitud = ref('')

const isGestorEsteRecurso = ref(false)
const cambioBoton = ref(false)
const rol = ref('Gestor')

onMounted(async () => {
    await cargarRecurso()
    if (idGestor.value == auth.usuario.idString) {
        isGestorEsteRecurso.value = true
    } else {
        isGestorEsteRecurso.value = false
    }
})
async function cargarRecurso() {
    const response = await service.fetchRecurso(idRecurso.value)
    let gestor = await usuarioService.fetchUsuarioGestorDeRecurso(idRecurso.value)
    idGestor.value = gestor.idString
    let categoriaObjeto = await categoriaService.fetchCategoriaDeRecurso(idRecurso.value)
    categoria.value = categoriaObjeto.nombre
    recurso.value = response
    nombre.value = recurso.value.nombre
    otros.value = recurso.value.otros
    conDatosEspecificosSolicitud.value = recurso.value.conDatosEspecificosSolicitud
    descripcion.value = recurso.value.descripcion
    datosEspecificosSolicitud.value = recurso.value.datosEspecificosSolicitud
}
function cambiaRol() {
    if (cambioBoton.value) {
        cambioBoton.value = false
    } else {
        cambioBoton.value = true
    }
    rol.value = cambioBoton.value ? 'Previa' : 'Gestor'
}

const actualizar = async () => {
    const success = await service.editarRecursoDetalle(
        nombre.value,
        descripcion.value,
        otros.value,
        conDatosEspecificosSolicitud.value,
        datosEspecificosSolicitud.value,
        idCenad.value,
        idRecurso.value
    );
    if (success) {
        cambiaRol()
        cargarRecurso()
    }
}
</script>
<style scoped lang="scss">
.btn {
    background: #3A5A40;
}

.btn:hover {
    background-color: #A3B18A;
}

/* h3 {
  color: #354f52; font-weight: bold
} */
.titulo,
.texto {
    color: #3A5A40;
}

.titulo1,
.letra {
    color: #588157;
}

a.volver {
    color: #3A5A40;
    font-size: 18px;
}

a {
    text-decoration: none;      /* Sin subrayado */
    color: #3A5A40;            /* Color por defecto */
}

a:visited {
    color: #3A5A40;            /* Evita color morado */
}

a:hover {
    color: #A3B18A;            /* Color al pasar el mouse */
}

a:active {
    color: #3A5A40;            /* Mantiene color al hacer clic */
}

a.volver:hover,
.href:hover {
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

div.titulos {
    background-color: #DAD7CD;
}

figure {
    display: inline-block;
}

.texto {
    white-space: pre-wrap;
}

h3 {
    color: #3A5A40;
}

img.cenad {
    display: block;
    width: 365px;
    height: 533px;
    align-content: center;
    margin: auto;
    padding-bottom: 2px;
}

div.informacion {
    border: 6px solid #354f52;
    border-top: 0px;
    border-bottom: 0px;
    border-right: 0px;
}
</style>