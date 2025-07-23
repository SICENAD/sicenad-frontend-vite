import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { borrarArchivo, subirArchivo, toastExito } from '@/utils'

class NormativaService {
  normativas
  normativa
  auth
  utils

  constructor() {
    this.normativas = ref([])
    this.normativa = ref()
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
  }
  getNormativas() {
    return this.normativas
  }
  getNormativa() {
    return this.normativa
  }
  async fetchAll(idCenad) {
    try {
      const urlNormativas = `${this.utils.urlApi}/cenads/${idCenad}/normativas?size=1000`
      const response = await this.utils.fetchConToken(urlNormativas, 'GET', null)
      const json = await response.json()
      this.normativas.value = await json._embedded.ficheros
      return response.status == 200 ? this.normativas.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async fetchNormativa(idNormativa) {
    try {
      const urlNormativa = `${this.utils.urlApi}/ficheros/${idNormativa}`
      const response = await this.utils.fetchConToken(urlNormativa, 'GET', null)
      const json = await response.json()
      this.normativa.value = await json
      return response.status == 200 ? this.normativa.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async crearNormativa(nombre, descripcion, archivo, idCenad) {
    try {
      let nombreArchivo = null
      if (archivo) {
        const urlUpload = `${this.utils.urlApi}/files/${idCenad}/subirNormativa`
        nombreArchivo = await subirArchivo(archivo, urlUpload)
        console.log('el nombre del archivo es ' + nombreArchivo)
        if (nombreArchivo == false) return false
      }
      const urlNormativas = `${this.utils.urlApi}/ficheros`
      const body = {
        nombre: nombre.toUpperCase(),
        descripcion: descripcion,
        cenad: `${this.utils.urlApi}/cenads/${idCenad}`,
        categoriaFichero: `${this.utils.urlApi}/categorias_fichero/${this.utils.categoriaFicheroCartografia}`,
        nombreArchivo: nombreArchivo,
      }
      const response = await this.utils.fetchConToken(urlNormativas, 'POST', body)
      if (response.status == 201) {
        i18n.global.t('comun.enviando')
        toastExito(
          i18n.global.t('normativas.creada', {
            normativa: nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  async editarNormativa(nombre, descripcion, archivo, nombreArchivoActual, idCenad, idNormativa) {
    let nombreArchivo = nombreArchivoActual // por defecto mantenemos el actual
    if (archivo) {
      const urlUpload = `${this.utils.urlApi}/files/${idCenad}/subirNormativa`
      const nuevaNormativa = await subirArchivo(archivo, urlUpload)
      if (nuevaNormativa == false) return null
      const urlBorrarArchivo = `${this.utils.urlApi}/files/${idCenad}/borrarNormativa/${nombreArchivo}`
      const responseDeleteArchivo = await borrarArchivo(urlBorrarArchivo)
      console.log(responseDeleteArchivo)
      nombreArchivo = nuevaNormativa
      try {
        const urlNormativa = `${this.utils.urlApi}/ficheros/${idNormativa}`
        const body = {
          nombre: nombre.toUpperCase(),
          descripcion: descripcion,
        }
        if (nombreArchivo) {
          body.nombreArchivo = nombreArchivo
        }
        const response = await this.utils.fetchConToken(urlNormativa, 'PATCH', body)
        if (response.status == 200) {
          toastExito(
            i18n.global.t('normativas.editada', {
              normativa: nombre,
            }),
          )
          return nombreArchivo
        } else {
          return null
        }
      } catch (error) {
        console.error(error)
        return null
      }
    }
  }
  async deleteNormativa(nombreArchivo, idNormativa, idCenad) {
    try {
      const urlBorrarArchivo = `${this.utils.urlApi}/files/${idCenad}/borrarNormativa/${nombreArchivo}`
      await borrarArchivo(urlBorrarArchivo)
      const urlNormativa = `${this.utils.urlApi}/ficheros/${idNormativa}`
      const response = await this.utils.fetchConToken(urlNormativa, 'DELETE', null)
      const json = await response.json()
      this.normativa.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('normativas.normativaBorrada', {
            normativa: this.normativa.value.nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async fetchArchivoNormativa(filename, idCenad) {
    const response = await fetch(`${this.utils.urlApi}/files/${idCenad}/normativas/${filename}`, {
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
      },
    })
    if (!response.ok) throw new Error('No se pudo descargar el archivo')

    const blob = await response.blob()
    const archivoUrl = URL.createObjectURL(blob)
    return archivoUrl
  }
}
export default NormativaService