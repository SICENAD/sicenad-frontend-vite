import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { toastExito, toTitleCase } from '@/utils'
import router from '@/router'

class UsuarioService {
  usuarios
  usuario
  auth
  utils

  constructor() {
    this.usuarios = ref([])
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
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
    username, password, tfno, email, emailAdmitido, descripcion, rol,
    passwordForRegisterFromUser,
    feedback,
  ) {
    const passwordForRegister = this.utils.passwordForRegister
    passwordForRegister == passwordForRegisterFromUser
      ? this.crearUsuarioSuperadministrador(username, password, tfno, email, emailAdmitido, descripcion, rol, null, null, null)
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
  async getUsuariosSuperadministrador() {
    try {
      const urlUsuarios = `${this.utils.urlApi}/usuarios_superadministrador?size=1000`
      const response = await this.utils.fetchConToken(urlUsuarios, 'GET', null)
      const json = await response.json()
      this.usuarios.value = await json._embedded.usuarios_superadministrador
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async getUsuariosSAdministrador() {
    try {
      const urlUsuarios = `${this.utils.urlApi}/usuarios_administrador?size=1000`
      const response = await this.utils.fetchConToken(urlUsuarios, 'GET', null)
      const json = await response.json()
      this.usuarios.value = await json._embedded.usuarios_administrador
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async getUsuariosGestor() {
    try {
      const urlUsuarios = `${this.utils.urlApi}/usuarios_gestor?size=1000`
      const response = await this.utils.fetchConToken(urlUsuarios, 'GET', null)
      const json = await response.json()
      this.usuarios.value = await json._embedded.usuarios_gestor
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async getUsuariosNormal() {
    try {
      const urlUsuarios = `${this.utils.urlApi}/usuarios_normal?size=1000`
      const response = await this.utils.fetchConToken(urlUsuarios, 'GET', null)
      const json = await response.json()
      this.usuarios.value = await json._embedded.usuarios_normal
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async crearUsuarioSuperadministrador(username, tfno, email, emailAdmitido, descripcion) {
    try {
      const rol = "Superadministrador"
      const response = await this.auth.register(username, password, tfno, email, emailAdmitido, descripcion, rol, null, null, null)
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
  async crearUsuarioAdministrador(username, tfno, email, emailAdmitido, descripcion, cenadAdministrado) {
    try {
      const rol = "Administrador"
      const response = await this.auth.register(username, password, tfno, email, emailAdmitido, descripcion, rol, null, cenadAdministrado, null)
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
  async crearUsuarioGestor(username, tfno, email, emailAdmitido, descripcion, cenad) {
    try {
      const rol = "Gestor"
      const response = await this.auth.register(username, password, tfno, email, emailAdmitido, descripcion, rol, cenad, null, null)
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
  async crearUsuarioNormal(username, tfno, email, emailAdmitido, descripcion, unidad) {
    try {
      const rol = "Normal"
      const response = await this.auth.register(username, password, tfno, email, emailAdmitido, descripcion, rol, null, null, unidad)
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
  async editarUsuarioAdministrador(username, tfno, email, emailAdmitido, descripcion, rol, cenadAdministrado, idUsuario) {
    try {
      const urlUsuario = `${this.utils.urlApi}/usuarios/${idUsuario}`
      const response = await this.utils.fetchConToken(urlUsuario, 'PATCH', {
        tfno: tfno,
        username: username,
        email: email,
        emailAdmitido: emailAdmitido,
        descripcion: descripcion,
        rol: rol,
        cenadAdministrado: cenadAdministrado
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
  async editarUsuarioNormal(username, tfno, email, emailAdmitido, descripcion, rol, unidad, idUsuario) {
    try {
      const urlUsuario = `${this.utils.urlApi}/usuarios/${idUsuario}`
      const response = await this.utils.fetchConToken(urlUsuario, 'PATCH', {
        tfno: tfno,
        username: username,
        email: email,
        emailAdmitido: emailAdmitido,
        descripcion: descripcion,
        rol: rol,
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
}

export default UsuarioService