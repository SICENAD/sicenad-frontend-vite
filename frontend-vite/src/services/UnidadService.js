import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { toastExito, toTitleCase } from '@/utils'

class UnidadService {
  unidades
  unidad
  auth
  utils

  constructor() {
    this.unidades = ref([])
    this.unidad = ref()
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
  }
  getUnidades() {
    return this.unidades
  }
  getUnidad() {
    return this.unidad
  }
  async fetchAll() {
    try {
      const urlUnidades = `${this.utils.urlApi}/unidades?size=1000`
      const response = await this.utils.fetchConToken(urlUnidades, 'GET', null)
      const json = await response.json()
      this.unidades.value = await json._embedded.unidades
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async crearUnidad(nombre, descripcion, email, tfno, direccion, poc) {
    try {
      const urlUnidades = `${this.utils.urlApi}/unidades`
      const response = await this.utils.fetchConToken(urlUnidades, 'POST', {
        nombre: nombre.toUpperCase(),
        descripcion: descripcion,
        email: email.toLowerCase(),
        tfno: tfno,
        direccion: direccion,
        poc: poc.toUpperCase()
      })
      if (response.status == 201) {
        i18n.global.t('comun.enviando')
        toastExito(
          i18n.global.t('unidades.creado', {
            unidad: nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  async editarUnidad(nombre, descripcion, email, tfno, direccion, poc, idUnidad) {

    try {
      const urlUnidad = `${this.utils.urlApi}/unidades/${idUnidad}`
      const body = {
        nombre: nombre.toUpperCase(),
        descripcion: descripcion,
        email: email.toLowerCase(),
        tfno: tfno,
        direccion: direccion,
        poc: poc.toUpperCase()
      }
      const response = await this.utils.fetchConToken(urlUnidad, 'PATCH', body)
      if (response.status == 200) {
        toastExito(
          i18n.global.t('unidades.editado', {
            unidad: nombre,
          }),
        )
        return nombre
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }
  async fetchArma(idUnidad) {
    try {
      const urlUnidad = `${this.utils.urlApi}/unidades/${idUnidad}`
      const response = await this.utils.fetchConToken(urlUnidad, 'GET', null)
      const json = await response.json()
      this.unidad.value = await json
      return response.status == 200 ? this.unidad.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async deleteUnidad(idUnidad) {
    try {
      const urlUnidad = `${this.utils.urlApi}/armas/${idUnidad}`
      const response = await this.utils.fetchConToken(urlUnidad, 'DELETE', null)
      const json = await response.json()
      this.unidad.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('armas.armaBorrada', {
            unidad: this.unidad.value.nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
}

export default UnidadService
