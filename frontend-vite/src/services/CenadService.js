import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { toastExito, toTitleCase } from '@/utils'

class CenadService {
  cenads
  cenad
  auth
  utils

  constructor() {
    this.cenads = ref([])
    this.cenad = ref()
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
  }
  getCenads() {
    return this.cenads
  }
  getCenad() {
    return this.cenad
  }
  async fetchAll() {
    try {
      const urlCenads = `${this.utils.urlApi}/cenads?size=1000`
      const response = await this.utils.fetchConToken(urlCenads, 'GET', null)
      const json = await response.json()
      this.cenads.value = await json._embedded.cenads
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async crearCenad(nombre, provincia, direccion, tfno, email, descripcion, escudo) {
    try {
      const urlCenads = `${this.utils.urlApi}/cenads`
      const response = await this.utils.fetchConToken(urlCenads, 'POST', {
        nombre: nombre.toUpperCase(),
        provincia: provincia,
        direccion: toTitleCase(direccion),
        tfno: tfno,
        email: email,
        descripcion: descripcion,
        escudo: escudo,
      })
      if (response.status == 201) {
        i18n.global.t('comun.enviando')
        toastExito(
          i18n.global.t('cenads.creado', {
            cenad: nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async editarCenad(nombre, provincia, direccion, tfno, email, descripcion, escudo, idCenad) {
    try {
      const urlCenad = `${this.utils.urlApi}/cenads/${idCenad}`
      const response = await this.utils.fetchConToken(urlCenad, 'PATCH', {
        nombre: nombre.toUpperCase(),
        provincia: provincia,
        direccion: toTitleCase(direccion),
        tfno: tfno,
        email: email,
        descripcion: descripcion,
        escudo: escudo,
      })
      if (response.status == 200) {
        toastExito(
          i18n.global.t('cenads.editado', {
            cenad: nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  
  async fetchCenad(idCenad) {
    try {
      const urlCenad = `${this.utils.urlApi}/cenads/${idCenad}`
      const response = await this.utils.fetchConToken(urlCenad, 'GET', null)
      const json = await response.json()
      this.cenad.value = await json
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async deleteCenad(idCenad) {
    try {
      const urlCenad = `${this.utils.urlApi}/cenads/${idCenad}`
      const response = await this.utils.fetchConToken(urlCenad, 'DELETE', null)
      const json = await response.json()
      this.cenad.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('cenads.cenadBorrado', {
            cenad: this.cenad.value.nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
}

export default CenadService
