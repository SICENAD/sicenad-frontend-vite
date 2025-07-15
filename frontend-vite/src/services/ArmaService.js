import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { toastExito } from '@/utils'

class ArmaService {
  armas
  arma
  auth
  utils

  constructor() {
    this.armas = ref([])
    this.arma = ref()
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
  }
  getArmas() {
    return this.armas
  }
  getArma() {
    return this.arma
  }
  async fetchAll() {
    try {
      const urlArmas = `${this.utils.urlApi}/armas?size=1000`
      const response = await this.utils.fetchConToken(urlArmas, 'GET', null)
      const json = await response.json()
      this.armas.value = await json._embedded.armas
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async crearArma(nombre, tipoTiro) {
    try {
      const urlArmas = `${this.utils.urlApi}/armas`
      const response = await this.utils.fetchConToken(urlArmas, 'POST', {
        nombre: nombre.toUpperCase(),
        tipoTiro: tipoTiro
      })
      if (response.status == 201) {
        i18n.global.t('comun.enviando')
        toastExito(
          i18n.global.t('armas.creado', {
            cenad: nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  async editarArma(
    nombre,
    tipoTiro,
    idArma,
  ) {

    try {
      const urlArma = `${this.utils.urlApi}/armas/${idArma}`
      const body = {
        nombre: nombre.toUpperCase(),
        tipoTiro: tipoTiro
      }
      const response = await this.utils.fetchConToken(urlArma, 'PATCH', body)
      if (response.status == 200) {
        toastExito(
          i18n.global.t('armas.editado', {
            cenad: nombre,
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
  async fetchArma(idArma) {
    try {
      const urlArma = `${this.utils.urlApi}/armas/${idArma}`
      const response = await this.utils.fetchConToken(urlArma, 'GET', null)
      const json = await response.json()
      this.arma.value = await json
      return response.status == 200 ? this.arma.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async deleteArma(idArma) {
    try {
      const urlArma = `${this.utils.urlApi}/armas/${idArma}`
      const response = await this.utils.fetchConToken(urlArma, 'DELETE', null)
      const json = await response.json()
      this.arma.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('armas.armaBorrada', {
            arma: this.arma.value.nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
}

export default ArmaService
