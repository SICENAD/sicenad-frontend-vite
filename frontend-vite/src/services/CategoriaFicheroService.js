import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { toastExito } from '@/utils'

class CategoriaFicheroService {
  categoriasFichero
  categoriaFichero
  auth
  utils

  constructor() {
    this.categoriasFichero = ref([])
    this.categoriaFichero = ref()
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
  }
  getCategoriasFichero() {
    return this.categoriasFichero
  }
  getCategoriaFichero() {
    return this.categoriaFichero
  }
  async fetchAll() {
    try {
      const urlCategoriasFichero = `${this.utils.urlApi}/categorias_fichero?size=1000`
      const response = await this.utils.fetchConToken(urlCategoriasFichero, 'GET', null)
      const json = await response.json()
      this.categoriasFichero.value = await json._embedded.categorias_fichero
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async crearCategoriaFichero(nombre, tipo, descripcion) {
    try {
      const urlCategoriasFichero = `${this.utils.urlApi}/categorias_fichero`
      const response = await this.utils.fetchConToken(urlCategoriasFichero, 'POST', {
        nombre: nombre.toUpperCase(),
        tipo: tipo,
        descripcion: descripcion
      })
      if (response.status == 201) {
        i18n.global.t('comun.enviando')
        toastExito(
          i18n.global.t('categoriasFichero.creado', {
            categoriaFichero: nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  async editarCategoriaFichero(
    nombre,
    tipo,
    descripcion,
    idCategoriaFichero
  ) {

    try {
      const urlCategoriaFichero = `${this.utils.urlApi}/categorias_fichero/${idCategoriaFichero}`
      const body = {
        nombre: nombre.toUpperCase(),
        tipo: tipo,
        descripcion: descripcion
      }
      const response = await this.utils.fetchConToken(urlCategoriaFichero, 'PATCH', body)
      if (response.status == 200) {
        toastExito(
          i18n.global.t('categoriasFichero.editado', {
            categoriaFichero: nombre,
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
  async fetchCategoriaFichero(idCategoriaFichero) {
    try {
      const urlCategoriaFichero = `${this.utils.urlApi}/categorias_fichero/${idCategoriaFichero}`
      const response = await this.utils.fetchConToken(urlCategoriaFichero, 'GET', null)
      const json = await response.json()
      this.categoriaFichero.value = await json
      return response.status == 200 ? this.categoriaFichero.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async deleteCategoriaFichero(idCategoriaFichero) {
    try {
      const urlCategoriaFichero = `${this.utils.urlApi}/categorias_fichero/${idCategoriaFichero}`
      const response = await this.utils.fetchConToken(urlCategoriaFichero, 'DELETE', null)
      const json = await response.json()
      this.categoriaFichero.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('categoriasFichero.categoriaFicheroBorrada', {
            categoriaFichero: this.categoriaFichero.value.nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
}

export default CategoriaFicheroService
