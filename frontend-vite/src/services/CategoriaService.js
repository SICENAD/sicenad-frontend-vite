import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { toastExito } from '@/utils'

class CategoriaService {
  categorias
  categoria
  auth
  utils

  constructor() {
    this.categorias = ref([])
    this.categoria = ref()
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
  }
  getCategorias() {
    return this.categorias
  }
  getCategoria() {
    return this.categoria
  }
  async fetchAll(idCenad) {
    try {
      const urlCategorias = `${this.utils.urlApi}/cenads/${idCenad}/categorias?size=1000`
      const response = await this.utils.fetchConToken(urlCategorias, 'GET', null)
      const json = await response.json()
      this.categorias.value = await json._embedded.categorias
      return response.status == 200 ? this.categorias.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async crearCategoria(nombre, descripcion, idCenad, idCategoriaPadre) {
    try {
      const urlCategorias = `${this.utils.urlApi}/categorias`
      const body = {
        nombre: nombre.toUpperCase(),
        descripcion: descripcion,
        cenad: `${this.utils.urlApi}/cenads/${idCenad}`,
      }
      idCategoriaPadre != null && (body.categoriaPadre = `${this.utils.urlApi}/categorias/${idCategoriaPadre}`)

      const response = await this.utils.fetchConToken(urlCategorias, 'POST', body)
      if (response.status == 201) {
        i18n.global.t('comun.enviando')
        toastExito(
          i18n.global.t('categorias.creada', {
            categoria: nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  async editarCategoria(nombre, descripcion, idCategoriaPadre, idCategoria) {
    try {
      const urlCategoria = `${this.utils.urlApi}/categorias/${idCategoria}`
      const body = {
        nombre: nombre.toUpperCase(),
        descripcion: descripcion,
      }
      idCategoriaPadre != null && (body.categoriaPadre = `${this.utils.urlApi}/categorias/${idCategoriaPadre}`)
      const response = await this.utils.fetchConToken(urlCategoria, 'PATCH', body)
      if (response.status == 200) {
        toastExito(
          i18n.global.t('categorias.editada', {
            categoria: nombre,
          }),
        )
        return this.categoria
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async fetchCategoria(idCategoria) {
    try {
      const urlCategoria = `${this.utils.urlApi}/categorias/${idCategoria}`
      const response = await this.utils.fetchConToken(urlCategoria, 'GET', null)
      const json = await response.json()
      this.categoria.value = await json
      return response.status == 200 ? this.categoria.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async deleteCategoria(idCategoria, idCenad) {
    try {
      const urlCategoria = `${this.utils.urlApi}/categorias/${idCategoria}`
      const response = await this.utils.fetchConToken(urlCategoria, 'DELETE', null)
      const json = await response.json()
      this.categoria.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('categorias.categoriaBorrada', {
            categoria: this.categoria.value.nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
}

export default CategoriaService
