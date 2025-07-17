import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { toastExito, toTitleCase } from '@/utils'
import router from '@/router'

class UsuarioService {
  usuarios_superadministrador
  usuarios_administrador
  usuarios_gestor
  usuarios_normal
  usuario_superadministrador
  usuario_administrador
  usuario_gestor
  usuario_normal
  usuarios
  usuario
  unidad
  cenad
  auth
  utils

  constructor() {
    this.usuarios_superadministrador = ref([])
    this.usuarios_administrador = ref([])
    this.usuarios_gestor = ref([])
    this.usuarios_normal = ref([])
    this.usuario_superadministrador = ref()
    this.usuario_administrador = ref()
    this.usuario_gestor = ref()
    this.usuario_normal = ref()
    this.usuarios = ref([])
    this.unidad = ref()
    this.cenad = ref()
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
  }
  getUsuariosSuperadministrador() {
    return this.usuarios_superadministrador
  }
  getUsuariosAdministrador() {
    return this.usuarios_administrador
  }
  getUsuariosGestor() {
    return this.usuarios_gestor
  }
  getUsuariosNormal() {
    return this.usuarios_normal
  }
  getUsuarioSuperadministrador() {
    return this.usuario_superadministrador
  }
  getUsuarioAdministrador() {
    return this.usuario_administrador
  }
  getUsuarioGestor() {
    return this.usuario_gestor
  }
  getUsuarioNormal() {
    return this.usuario_normal
  }
  getUsuarios() {
    return this.usuarios
  }
  getUsuario() {
    return this.usuario
  }
  async login(username, password, feedback) {
    try {
      feedback = i18n.global.t('comun.enviando')
      const response = await this.auth.login(username, password)
      if (response == true) {
        await router.push({ name: 'home' })
        toastExito(i18n.global.t('comun.logExito'))
      } else {
        feedback = i18n.global.t('comun.logError')
        alert(feedback)
      }
      return response.status == 201 ? true : false
    } catch (feedback) {
      console.log(feedback)
    }
  }
  logout() {
    this.auth.logout()
  }
  solicitudRegistro(
    username, password, tfno, email, emailAdmitido, descripcion, passwordForRegisterFromUser,
    feedback,
  ) {
    const passwordForRegister = this.utils.passwordForRegister
    passwordForRegister == passwordForRegisterFromUser
      ? this.crearUsuarioSuperadministrador(username, password, tfno, email, emailAdmitido, descripcion)
      : alert(i18n.global.t('comun.wrongPassword'))
  }
  async fetchAll() {//no lo voy a usar, pero sino tendria que ver que cada tipo de usuario tiene su []
    try {
      const urlUsuarios = `${this.utils.urlApi}/usuarios?size=1000`
      const response = await this.utils.fetchConToken(urlUsuarios, 'GET', null)
      const json = await response.json()
      this.usuarios.value = await json._embedded.usuarios
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async fetchUsuariosSuperadministrador() {
    try {
      const urlUsuarios = `${this.utils.urlApi}/usuarios_superadministrador?size=1000`
      const response = await this.utils.fetchConToken(urlUsuarios, 'GET', null)
      const json = await response.json()
      this.usuarios_superadministrador.value = await json._embedded.usuarios_superadministrador
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async fetchUsuariosAdministrador() {
    try {
      const urlUsuarios = `${this.utils.urlApi}/usuarios_administrador?size=1000`
      const response = await this.utils.fetchConToken(urlUsuarios, 'GET', null)
      const json = await response.json()
      this.usuarios_administrador.value = await json._embedded.usuarios_administrador
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async fetchUsuariosGestor() {
    try {
      const urlUsuarios = `${this.utils.urlApi}/usuarios_gestor?size=1000`
      const response = await this.utils.fetchConToken(urlUsuarios, 'GET', null)
      const json = await response.json()
      this.usuarios_gestor.value = await json._embedded.usuarios_gestor
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async fetchUsuariosNormal() {
    try {
      const urlUsuarios = `${this.utils.urlApi}/usuarios_normal?size=1000`
      const response = await this.utils.fetchConToken(urlUsuarios, 'GET', null)
      const json = await response.json()
      this.usuarios_normal.value = await json._embedded.usuarios_normal
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async crearUsuarioSuperadministrador(username, password, tfno, email, emailAdmitido, descripcion) {
    try {
      const rol = "Superadministrador"
      const response = await this.auth.register(username, password, tfno, email, emailAdmitido, descripcion, rol, null, null)
      if (response == true) {
        await router.push({ name: 'home' })
        toastExito(i18n.global.t('comun.registroExito'))
      } else {
        feedback = i18n.global.t('comun.registroError')
        alert(feedback)
      }
      return response.status == 201 ? true : false
    } catch (feedback) {
      console.log(feedback)
    }
  }
  async crearUsuarioAdministrador(username, password, tfno, email, emailAdmitido, descripcion, cenad) {
    try {
      const rol = "Administrador"
      const response = await this.auth.register(username, password, tfno, email, emailAdmitido, descripcion, rol, cenad, null)
      if (response == true) {
        await router.push({ name: 'home' })
        toastExito(i18n.global.t('comun.registroExito'))
      } else {
        feedback = i18n.global.t('comun.registroError')
        alert(feedback)
      }
      return response.status == 201 ? true : false
    } catch (feedback) {
      console.log(feedback)
    }
  }
  async crearUsuarioGestor(username, password, tfno, email, emailAdmitido, descripcion, cenad) {
    try {
      const rol = "Gestor"
      const response = await this.auth.register(username, password, tfno, email, emailAdmitido, descripcion, rol, cenad, null)
      if (response == true) {
        await router.push({ name: 'home' })
        toastExito(i18n.global.t('comun.registroExito'))
      } else {
        feedback = i18n.global.t('comun.registroError')
        alert(feedback)
      }
      return response.status == 201 ? true : false
    } catch (feedback) {
      console.log(feedback)
    }
  }
  async crearUsuarioNormal(username, password, tfno, email, emailAdmitido, descripcion, unidad) {
    try {
      const rol = "Normal"
      const response = await this.auth.register(username, password, tfno, email, emailAdmitido, descripcion, rol, null, unidad)
      if (response == true) {
        await router.push({ name: 'home' })
        toastExito(i18n.global.t('comun.registroExito'))
      } else {
        feedback = i18n.global.t('comun.registroError')
        alert(feedback)
      }
      return response.status == 201 ? true : false
    } catch (feedback) {
      console.log(feedback)
    }
  }
  async editarUsuarioSuperadministrador(username, tfno, email, emailAdmitido, descripcion, rol, idUsuario) {
    try {
      const urlUsuario = `${this.utils.urlApi}/usuarios/${idUsuario}`
      const response = await this.utils.fetchConToken(urlUsuario, 'PATCH', {
        tfno: tfno,
        username: username,
        email: email,
        emailAdmitido: emailAdmitido,
        descripcion: descripcion,
        rol: rol,
      })
      if (response.status == 200) {
        toastExito(i18n.global.t('administracion.editado', { username: username }))
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async editarUsuarioAdministrador(username, tfno, email, emailAdmitido, descripcion, rol, cenad, idUsuario) {
    try {
      const urlUsuario = `${this.utils.urlApi}/usuarios/${idUsuario}`
      const response = await this.utils.fetchConToken(urlUsuario, 'PATCH', {
        tfno: tfno,
        username: username,
        email: email,
        emailAdmitido: emailAdmitido,
        descripcion: descripcion,
        rol: rol,
        cenad: cenad
      })
      if (response.status == 200) {
        toastExito(i18n.global.t('administracion.editado', { username: username }))
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async editarUsuarioGestor(username, tfno, email, emailAdmitido, descripcion, rol, cenad, idUsuario) {
    try {
      const urlUsuario = `${this.utils.urlApi}/usuarios/${idUsuario}`
      const response = await this.utils.fetchConToken(urlUsuario, 'PATCH', {
        tfno: tfno,
        username: username,
        email: email,
        emailAdmitido: emailAdmitido,
        descripcion: descripcion,
        rol: rol,
        cenad: cenad
      })
      if (response.status == 200) {
        toastExito(i18n.global.t('administracion.editado', { username: username }))
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async editarUsuarioNormal(username, tfno, email, emailAdmitido, descripcion, unidad, idUsuario) {
    try {
      const urlUsuario = `${this.utils.urlApi}/usuarios/${idUsuario}`
      const response = await this.utils.fetchConToken(urlUsuario, 'PATCH', {
        tfno: tfno,
        username: username,
        email: email,
        emailAdmitido: emailAdmitido,
        descripcion: descripcion,
        unidad: unidad
      })
      if (response.status == 200) {
        toastExito(i18n.global.t('administracion.editado', { username: username }))
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async fetchUsuario(idUsuario) {
    try {
      const urlUsuario = `${this.utils.urlApi}/usuarios/${idUsuario}`
      const response = await this.utils.fetchConToken(urlUsuario, 'GET', null)
      const json = await response.json()
      this.usuario.value = await json
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async deleteUsuario(idUsuario) {
    try {
      const urlUsuario = `${this.utils.urlApi}/usuarios/${idUsuario}`
      const response = await this.utils.fetchConToken(urlUsuario, 'DELETE', null)
      const json = await response.json()
      this.usuario.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('administracion.usuarioBorrado', {
            usuario: `${toTitleCase(this.usuario.value.username)}`,
          }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
 async fetchUnidadDeUsuarioNormal(idUsuario) {
    try {
      const urlUsuario = `${this.utils.urlApi}/usuarios_normal/${idUsuario}/unidad`
      const response = await this.utils.fetchConToken(urlUsuario, 'GET', null)
      const json = await response.json()
      this.unidad.value = await json
      return response.status == 200 ? this.unidad.value : null
    } catch (error) {
      console.log(error)
    }
  }
}

export default UsuarioService