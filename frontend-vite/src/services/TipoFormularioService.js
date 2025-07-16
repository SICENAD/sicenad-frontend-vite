import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { toastExito } from '@/utils'

class TipoFormularioService {
  tiposFormulario
  tipoFormulario
  auth
  utils

  constructor() {
    this.tiposFormulario = ref([])
    this.tipoFormulario = ref()
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
  }
  getTiposFormulario() {
    return this.tiposFormulario
  }
  getTipoFormulario() {
    return this.tipoFormulario
  }
  async fetchAll() {
    try {
      const urlTiposFormulario = `${this.utils.urlApi}/tipos_formulario?size=1000`
      const response = await this.utils.fetchConToken(urlTiposFormulario, 'GET', null)
      const json = await response.json()
      this.tiposFormulario.value = await json._embedded.tipos_formulario
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async crearTipoFormulario(nombre, codTipo, descripcion) {
    try {
      const urlTipoFormulario = `${this.utils.urlApi}/tipos_formulario`
      const response = await this.utils.fetchConToken(urlTipoFormulario, 'POST', {
        nombre: nombre.toUpperCase(),
        codTipo: codTipo,
        descripcion: descripcion
      })
      if (response.status == 201) {
        i18n.global.t('comun.enviando')
        toastExito(
          i18n.global.t('tiposFormulario.creado', {
            tiposFormulario: nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  async editarTipoFormulario(nombre, codTipo, descripcion, idTipoFormulario) {

    try {
      const urlTipoFormulario = `${this.utils.urlApi}/tipos_formulario/${idTipoFormulario}`
      const body = {
        nombre: nombre.toUpperCase(),
        codTipo: codTipo,
        descripcion: descripcion
      }
      const response = await this.utils.fetchConToken(urlTipoFormulario, 'PATCH', body)
      if (response.status == 200) {
        toastExito(
          i18n.global.t('tiposFormulario.editado', {
            tipoFormulario: nombre,
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
  async fetchTipoFormulario(idTipoFormulario) {
    try {
      const urlTipoFormulario = `${this.utils.urlApi}/tipos_formulario/${idTipoFormulario}`
      const response = await this.utils.fetchConToken(urlTipoFormulario, 'GET', null)
      const json = await response.json()
      this.tipoFormulario.value = await json
      return response.status == 200 ? this.tipoFormulario.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async deleteTipoFormulario(idTipoFormulario) {
    try {
      const urlTipoFormulario = `${this.utils.urlApi}/tipos_formulario/${idTipoFormulario}`
      const response = await this.utils.fetchConToken(urlTipoFormulario, 'DELETE', null)
      const json = await response.json()
      this.tipoFormulario.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('tiposFormulario.tipoFormularioBorrado', {
            tipoFormulario: this.tipoFormulario.value.nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
}

export default TipoFormularioService
