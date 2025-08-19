import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { borrarArchivo, subirArchivo, toastExito } from '@/utils'

class FicheroService {
  ficheros
  fichero
  documentacionCenad
  documentacionUnidad
  auth
  utils

  constructor() {
    this.ficheros = ref([])
    this.fichero = ref()
    this.documentacionCenad = ref([])
    this.documentacionUnidad = ref([])
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
  }
  getFicheros() {
    return this.ficheros
  }
  getFichero() {
    return this.fichero
  }
  getDocumentacionCenad() {
    return this.documentacionCenad
  }
  getDocumentacionUnidad() {
    return this.documentacionUnidad
  }
  async fetchAll(idRecurso) {
    try {
      const urlFicheros = `${this.utils.urlApi}/recursos/${idRecurso}/ficheros?size=1000`
      const response = await this.utils.fetchConToken(urlFicheros, 'GET', null)
      const json = await response.json()
      this.ficheros.value = await json._embedded.ficheros
      return response.status == 200 ? this.ficheros.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async fetchFichero(idFichero) {
    try {
      const urlFichero = `${this.utils.urlApi}/ficheros/${idFichero}`
      const response = await this.utils.fetchConToken(urlFichero, 'GET', null)
      const json = await response.json()
      this.fichero.value = await json
      return response.status == 200 ? this.fichero.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async crearFichero(nombre, descripcion, archivo, idCategoriaFichero, idCenad, idRecurso) {
    try {
      let nombreArchivo = null
      if (archivo) {
        const urlUpload = `${this.utils.urlApi}/files/${idCenad}/subirDocRecurso/${idRecurso}`
        nombreArchivo = await subirArchivo(archivo, urlUpload)
        console.log('el nombre del archivo es ' + nombreArchivo)
        if (nombreArchivo == false) return false
      }
      const urlFicheros = `${this.utils.urlApi}/ficheros`
      const body = {
        nombre: nombre.toUpperCase(),
        descripcion: descripcion,
        recurso: `${this.utils.urlApi}/recursos/${idRecurso}`,
        categoriaFichero: `${this.utils.urlApi}/categorias_fichero/${idCategoriaFichero}`,
        nombreArchivo: nombreArchivo,
      }
      const response = await this.utils.fetchConToken(urlFicheros, 'POST', body)
      if (response.status == 201) {
        i18n.global.t('comun.enviando')
        toastExito(
          i18n.global.t('ficheros.creado', {
            normativa: nombre,
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
  async editarFichero(
    nombre,
    descripcion,
    archivo,
    nombreArchivoActual,
    idCenad,
    idRecurso,
    idCategoriaFichero,
    idFichero,
  ) {
    let nombreArchivo = nombreArchivoActual // por defecto mantenemos el actual
    if (archivo) {
      const urlUpload = `${this.utils.urlApi}/files/${idCenad}/subirDocRecurso/${idRecurso}`
      const nuevoFichero = await subirArchivo(archivo, urlUpload)
      if (nuevoFichero == false) return null
      const urlBorrarArchivo = `${this.utils.urlApi}/files/${idCenad}/borrarDocRecurso/${idRecurso}/${nombreArchivo}`
      const responseDeleteArchivo = await borrarArchivo(urlBorrarArchivo)
      console.log(responseDeleteArchivo)
      nombreArchivo = nuevoFichero
    }
    try {
      const urlFichero = `${this.utils.urlApi}/ficheros/${idFichero}`
      const body = {
        nombre: nombre.toUpperCase(),
        descripcion: descripcion,
        recurso: `${this.utils.urlApi}/recursos/${idRecurso}`,
        categoriaFichero: `${this.utils.urlApi}/categorias_fichero/${idCategoriaFichero}`,
      }
      if (nombreArchivo) {
        body.nombreArchivo = nombreArchivo
      }
      const response = await this.utils.fetchConToken(urlFichero, 'PATCH', body)
      if (response.status == 200) {
        toastExito(
          i18n.global.t('ficheros.editado', {
            normativa: nombre,
          }),
        )
        await this.auth.getDatosInicialesDeCenad(idCenad)
        return nombreArchivo
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }
  async deleteFichero(nombreArchivo, idFichero, idCenad, idRecurso) {
    try {
      const urlBorrarArchivo = `${this.utils.urlApi}/files/${idCenad}/borrarDocRecurso/${idRecurso}/${nombreArchivo}`
      await borrarArchivo(urlBorrarArchivo)
      const urlFichero = `${this.utils.urlApi}/ficheros/${idFichero}`
      const response = await this.utils.fetchConToken(urlFichero, 'DELETE', null)
      const json = await response.json()
      this.fichero.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('ficheros.ficheroBorrado', {
            fichero: this.fichero.value.nombre,
          }),
        )
        await this.auth.getDatosInicialesDeCenad(idCenad)
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async fetchArchivoFichero(filename, idCenad, idRecurso) {
    const response = await this.utils.fetchArchivoConToken(
      `${this.utils.urlApi}/files/${idCenad}/docRecursos/${idRecurso}/${filename}`,
      'GET',
      null,
    )
    if (!response.ok) throw new Error('No se pudo descargar el archivo')

    const blob = await response.blob()
    const archivoUrl = URL.createObjectURL(blob)
    return archivoUrl
  }
  async fetchDocumentacionSolicitudCenad(idSolicitud) {
    try {
      const urlFicheros = `${this.utils.urlApi}/solicitudes/${idSolicitud}/documentacionCenad?size=1000`
      const response = await this.utils.fetchConToken(urlFicheros, 'GET', null)
      const json = await response.json()
      this.documentacionCenad.value = json._embedded.ficheros || []
      return response.status == 200 ? this.documentacionCenad.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async fetchDocumentacionSolicitudUnidad(idSolicitud) {
    try {
      const urlFicheros = `${this.utils.urlApi}/solicitudes/${idSolicitud}/documentacionUnidad?size=1000`
      const response = await this.utils.fetchConToken(urlFicheros, 'GET', null)
      const json = await response.json()
      this.documentacionUnidad.value = json._embedded.ficheros || []
      return response.status == 200 ? this.documentacionUnidad.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async crearDocumentacionSolicitud(
    nombre,
    descripcion,
    archivo,
    idCategoriaFichero,
    idCenad,
    idSolicitud,
    isCenad,
  ) {
    try {
      let nombreArchivo = null
      let solicitud = `${this.utils.urlApi}/solicitudes/${idSolicitud}`
      if (archivo) {
        const urlUpload = `${this.utils.urlApi}/files/${idCenad}/subirDocSolicitud/${idSolicitud}`
        nombreArchivo = await subirArchivo(archivo, urlUpload)
        console.log('el nombre del archivo es ' + nombreArchivo)
        if (nombreArchivo == false) return false
      }
      const urlFicheros = `${this.utils.urlApi}/ficheros`
      const body = {
        nombre: nombre.toUpperCase(),
        descripcion: descripcion,
        categoriaFichero: `${this.utils.urlApi}/categorias_fichero/${idCategoriaFichero}`,
        nombreArchivo: nombreArchivo,
      }
      isCenad ? (body.solicitudRecursoCenad = solicitud) : (body.solicitudRecursoUnidad = solicitud)
      const response = await this.utils.fetchConToken(urlFicheros, 'POST', body)
      if (response.status == 201) {
        i18n.global.t('comun.enviando')
        toastExito(
          i18n.global.t('ficheros.creado', {
            normativa: nombre,
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
  async editarDocumentacionSolicitud(
    nombre,
    descripcion,
    archivo,
    nombreArchivoActual,
    idCenad,
    idSolicitud,
    idCategoriaFichero,
    idFichero,
    isCenad,
  ) {
    let nombreArchivo = nombreArchivoActual // por defecto mantenemos el actual
    let solicitud = `${this.utils.urlApi}/solicitudes/${idSolicitud}`
    if (archivo) {
      const urlUpload = `${this.utils.urlApi}/files/${idCenad}/subirDocSolicitud/${idSolicitud}`
      const nuevoFichero = await subirArchivo(archivo, urlUpload)
      if (nuevoFichero == false) return null
      const urlBorrarArchivo = `${this.utils.urlApi}/files/${idCenad}/borrarDocSolicitud/${idSolicitud}/${nombreArchivo}`
      const responseDeleteArchivo = await borrarArchivo(urlBorrarArchivo)
      console.log(responseDeleteArchivo)
      nombreArchivo = nuevoFichero
    }
    try {
      const urlFichero = `${this.utils.urlApi}/ficheros/${idFichero}`
      const body = {
        nombre: nombre.toUpperCase(),
        descripcion: descripcion,
        categoriaFichero: `${this.utils.urlApi}/categorias_fichero/${idCategoriaFichero}`,
      }
      isCenad ? (body.solicitudRecursoCenad = solicitud) : (body.solicitudRecursoUnidad = solicitud)
      if (nombreArchivo) {
        body.nombreArchivo = nombreArchivo
      }
      const response = await this.utils.fetchConToken(urlFichero, 'PATCH', body)
      if (response.status == 200) {
        toastExito(
          i18n.global.t('ficheros.editado', {
            normativa: nombre,
          }),
        )
        await this.auth.getDatosInicialesDeCenad(idCenad)
        return nombreArchivo
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }
  async deleteDocumentacionSolicitud(nombreArchivo, idFichero, idCenad, idSolicitud) {
    try {
      const urlBorrarArchivo = `${this.utils.urlApi}/files/${idCenad}/borrarDocSolicitud/${idSolicitud}/${nombreArchivo}`
      await borrarArchivo(urlBorrarArchivo)
      const urlFichero = `${this.utils.urlApi}/ficheros/${idFichero}`
      const response = await this.utils.fetchConToken(urlFichero, 'DELETE', null)
      const json = await response.json()
      this.fichero.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('ficheros.ficheroBorrado', {
            fichero: this.fichero.value.nombre,
          }),
        )
        await this.auth.getDatosInicialesDeCenad(idCenad)
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async fetchArchivoDocumentacionSolicitud(filename, idCenad, idSolicitud) {
    const response = await this.utils.fetchArchivoConToken(
      `${this.utils.urlApi}/files/${idCenad}/docSolicitudes/${idSolicitud}/${filename}`,
      'GET',
      null,
    )
    if (!response.ok) throw new Error('No se pudo descargar el archivo')

    const blob = await response.blob()
    const archivoUrl = URL.createObjectURL(blob)
    return archivoUrl
  }
}
export default FicheroService
