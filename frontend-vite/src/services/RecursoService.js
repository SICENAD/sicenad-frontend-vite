import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { toastExito } from '@/utils'

class RecursoService {
  recursos
  recurso
  usuarioGestor
  categoria
  tipoFormulario
  auth
  utils

  constructor() {
    this.recursos = ref([])
    this.recurso = ref()
    this.usuarioGestor = ref()
    this.categoria = ref()
    this.tipoFormulario = ref()
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
  }
  getRecursos() {
    return this.recursos
  }
  getRecurso() {
    return this.recurso
  }
  getUsuarioGestor() {
    return this.usuarioGestor
  }
  getCategoria() {
    return this.categoria
  }
  getTipoFormulario() {
    return this.tipoFormulario
  }
  async fetchAll(idCenad) {
    try {
      const urlRecursos = `${this.utils.urlApi}/cenads/${idCenad}/recursos?size=1000`
      const response = await this.utils.fetchConToken(urlRecursos, 'GET', null)
      const json = await response.json()
      this.recursos.value = await json._embedded.recursos
      return response.status == 200 ? this.recursos.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async fetchRecursosDeCategoria(idCategoria) {
    try {
      const urlRecursos = `${this.utils.urlApi}/categorias/${idCategoria}/recursos?size=1000`
      const response = await this.utils.fetchConToken(urlRecursos, 'GET', null)
      const json = await response.json()
      this.recursos.value = await json._embedded.recursos
      return response.status == 200 ? this.recursos.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async fetchRecursosDeSubcategorias(idCategoria) {
    try {
      const urlRecursos = `${this.utils.urlApi}/categorias/${idCategoria}/recursosDeSubcategorias?size=1000`
      const response = await this.utils.fetchConToken(urlRecursos, 'GET', null)
      const json = await response.json()
      this.recursos.value = await json._embedded.recursos
      return response.status == 200 ? this.recursos.value : null
    } catch (error) {
      console.log(error)
    }
  }
    async fetchRecursosDeGestor(idGestor) {
    try {
      const urlRecursos = `${this.utils.urlApi}/usuarios_gestor/${idGestor}/recursos?size=1000`
      const response = await this.utils.fetchConToken(urlRecursos, 'GET', null)
      const json = await response.json()
      this.recursos.value = await json._embedded.recursos
      return response.status == 200 ? this.recursos.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async crearRecurso(nombre, descripcion, otros, idTipoFormulario, idCategoria, idGestor, idCenad) {
    try {
      const urlRecursos = `${this.utils.urlApi}/recursos`
      const body = {
        nombre: nombre.toUpperCase(),
        descripcion: descripcion,
        otros: otros,
        tipoFormulario: `${this.utils.urlApi}/tipos_formulario/${idTipoFormulario}`,
        categoria: `${this.utils.urlApi}/categorias/${idCategoria}`,
        usuarioGestor: `${this.utils.urlApi}/usuarios_gestor/${idGestor}`,
        cenad: `${this.utils.urlApi}/cenads/${idCenad}`,
      }
      const response = await this.utils.fetchConToken(urlRecursos, 'POST', body)
      if (response.status == 201) {
        i18n.global.t('comun.enviando')
        toastExito(
          i18n.global.t('recursos.creado', {
            recurso: nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  async editarRecurso(nombre, descripcion, otros, idTipoFormulario, idCategoria, idGestor, idRecurso) {
    try {
      const urlRecurso = `${this.utils.urlApi}/recursos/${idRecurso}`
      const body = {
        nombre: nombre.toUpperCase(),
        descripcion: descripcion,
        otros: otros,
        tipoFormulario: `${this.utils.urlApi}/tipos_formulario/${idTipoFormulario}`,
        categoria: `${this.utils.urlApi}/categorias/${idCategoria}`,
        usuarioGestor: `${this.utils.urlApi}/usuarios_gestor/${idGestor}`
      }
      const response = await this.utils.fetchConToken(urlRecurso, 'PATCH', body)
      if (response.status == 200) {
        toastExito(
          i18n.global.t('recursos.editado', {
            recurso: nombre,
          }),
        )
        return this.recurso
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async fetchRecurso(idRecurso) {
    try {
      const urlRecurso = `${this.utils.urlApi}/recursos/${idRecurso}`
      const response = await this.utils.fetchConToken(urlRecurso, 'GET', null)
      const json = await response.json()
      this.recurso.value = await json
      return response.status == 200 ? this.recurso.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async deleteRecurso(idRecurso) {
    try {
      const urlRecurso = `${this.utils.urlApi}/recursos/${idRecurso}`
      const response = await this.utils.fetchConToken(urlRecurso, 'DELETE', null)
      const json = await response.json()
      this.recurso.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('recursos.recursoBorrado', {
            recurso: this.recurso.value.nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async getUsuarioGestor(idRecurso) {
    try {
      const urlRecurso = `${this.utils.urlApi}/recursos/${idRecurso}/usuarioGestor`
      const response = await this.utils.fetchConToken(urlRecurso, 'GET', null)
      const json = await response.json()
      this.usuarioGestor.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('recursos.usuarioGestor', {
            usuarioGestor: this.usuarioGestor.value.nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async getCategoria(idRecurso) {
    try {
      const urlCategoria = `${this.utils.urlApi}/recursos/${idRecurso}/categoria`
      const response = await this.utils.fetchConToken(urlCategoria, 'GET', null)
      const json = await response.json()
      this.categoria.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('recursos.categoria', {
            categoria: this.categoria.value.nombre,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
 async getTipoFormulario(idRecurso) {
    try {
      const urlTipoFormulario = `${this.utils.urlApi}/recursos/${idRecurso}/tipoFormulario`
      const response = await this.utils.fetchConToken(urlTipoFormulario, 'GET', null)
      const json = await response.json()
      this.tipoFormulario.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('recursos.tipoFormulario', {
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

export default RecursoService
