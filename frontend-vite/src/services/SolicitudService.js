import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { formatearFecha, formatearFechaHora, toastExito, toTitleCase } from '@/utils'

class SolicitudService {
  solicitudes
  solicitud
  auth
  utils

  constructor() {
    this.solicitudes = ref([])
    this.solicitud = ref()
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
  }
  getSolicitudes() {
    return this.solicitudes
  }
  getSolicitud() {
    return this.solicitud
  }
  async fetchAll(idCenad) {
    try {
      const urlSolicitudes = `${this.utils.urlApi}/cenads/${idCenad}/solicitudes?size=1000`
      const response = await this.utils.fetchConToken(urlSolicitudes, 'GET', null)
      const json = await response.json()
      this.solicitudes.value = await json._embedded.solicitudes
      return response.status == 200 ? this.solicitudes.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async fetchSolicitudesDeCenadPorEstado(idCenad, estado) {
    try {
      const urlSolicitudes = `${this.utils.urlApi}/cenads/${idCenad}/solicitudesEstado/${estado}?size=1000`
      const response = await this.utils.fetchConToken(urlSolicitudes, 'GET', null)
      const json = await response.json()
      console.log(json)
      json && (this.solicitudes.value = await json._embedded.solicitudes)
      return response.status == 200 ? this.solicitudes.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async fetchSolicitud(idSolicitud) {
    try {
      const urlSolicitud = `${this.utils.urlApi}/solicitudes/${idSolicitud}`
      const response = await this.utils.fetchConToken(urlSolicitud, 'GET', null)
      const json = await response.json()
      this.solicitud.value = await json
      return response.status == 200 ? this.solicitud.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async crearSolicitud(
    observaciones,
    unidadUsuaria,
    jefeUnidadUsuaria,
    pocEjercicio,
    tlfnRedactor,
    fechaSolicitud,
    fechaHoraInicioRecurso,
    fechaHoraFinRecurso,
    estado,
    idCenad,
    idRecurso,
    idUsuarioNormal,
  ) {
    try {
      const urlSolicitudes = `${this.utils.urlApi}/solicitudes`
      const body = {
        observaciones: observaciones,
        unidadUsuaria: unidadUsuaria.toUpperCase(),
        jefeUnidadUsuaria: toTitleCase(jefeUnidadUsuaria),
        pocEjercicio: pocEjercicio,
        tlfnRedactor: tlfnRedactor,
        fechaSolicitud: formatearFechaHora(fechaSolicitud),
        fechaUltModSolicitud: formatearFechaHora(fechaSolicitud),
        fechaHoraInicioRecurso: formatearFechaHora(fechaHoraInicioRecurso),
        fechaHoraFinRecurso: formatearFechaHora(fechaHoraFinRecurso),
        recurso: `${this.utils.urlApi}/recursos/${idRecurso}`,
        usuarioNormal: `${this.utils.urlApi}/usuarios_normal/${idUsuarioNormal}`,
        estado: estado,
      }
      const response = await this.utils.fetchConToken(urlSolicitudes, 'POST', body)
      if (response.status == 201) {
        i18n.global.t('comun.enviando')
        toastExito(
          i18n.global.t('solicitudes.creada', {
            solicitud: fechaSolicitud,
          }),
        )
        await this.auth.getDatosInicialesDeCenad(idCenad)
        return true
      } else return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  async editarSolicitud(
    observaciones,
    unidadUsuaria,
    jefeUnidadUsuaria,
    pocEjercicio,
    tlfnRedactor,
    fechaHoraInicioRecurso,
    fechaHoraFinRecurso,
    estado,
    idCenad,
    idSolicitud,
    observacionesCenad,
    fechaFinDocumentacion,

  ) {
    try {
      const urlSolicitud = `${this.utils.urlApi}/solicitudes/${idSolicitud}`
      const body = {
        observaciones: observaciones,
        observacionesCenad: observacionesCenad,
        unidadUsuaria: unidadUsuaria.toUpperCase(),
        jefeUnidadUsuaria: toTitleCase(jefeUnidadUsuaria),
        pocEjercicio: pocEjercicio,
        tlfnRedactor: tlfnRedactor,
        fechaFinDocumentacion: formatearFechaHora(fechaFinDocumentacion),
        fechaUltModSolicitud: formatearFechaHora(new Date()),
        fechaHoraInicioRecurso: formatearFechaHora(fechaHoraInicioRecurso),
        fechaHoraFinRecurso: formatearFechaHora(fechaHoraFinRecurso),
        estado: estado,
      }
      const response = await this.utils.fetchConToken(urlSolicitud, 'PATCH', body)
      if (response.status == 200) {
        toastExito(
          i18n.global.t('solicitudes.editado', {
            solicitud: fechaSolicitud,
          }),
        )
        await this.auth.getDatosInicialesDeCenad(idCenad)
        return this.solicitud
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }
  async editarRecursoDetalle(
    nombre,
    descripcion,
    otros,
    conDatosEspecificosSolicitud,
    datosEspecificosSolicitud,
    idCenad,
    idRecurso,
  ) {
    try {
      const urlRecurso = `${this.utils.urlApi}/recursos/${idRecurso}`
      const body = {
        nombre: nombre.toUpperCase(),
        descripcion: descripcion,
        otros: otros,
        conDatosEspecificosSolicitud: conDatosEspecificosSolicitud,
        datosEspecificosSolicitud: datosEspecificosSolicitud,
      }
      const response = await this.utils.fetchConToken(urlRecurso, 'PATCH', body)
      if (response.status == 200) {
        toastExito(
          i18n.global.t('recursos.editado', {
            recurso: nombre,
          }),
        )
        await this.auth.getDatosInicialesDeCenad(idCenad)
        return this.recurso
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }
  async deleteSolicitud(idCenad, idSolicitud) {
    try {
      const urlSolicitud = `${this.utils.urlApi}/solicitudes/${idSolicitud}`
      const response = await this.utils.fetchConToken(urlSolicitud, 'DELETE', null)
      const json = await response.json()
      this.solicitud.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('solicitudes.solicitudBorrada', {
            solicitud: this.solicitud.value.fechaSolicitud,
          }),
        )
        await this.auth.getDatosInicialesDeCenad(idCenad)
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
}
export default SolicitudService
