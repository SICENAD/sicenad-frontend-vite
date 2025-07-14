import { defineStore } from 'pinia'
import useUtilsStore from '@/stores/utils'

const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: null,
      rol: null,
      username: null,
    }
  },
  getters: {},
  actions: {
    async register(username, password, tfno, email, emailAdmitido, descripcion, rol, cenad, cenadAdministrado, unidad) {
      const urlRegister = `${useUtilsStore().urlApi}/auth/register`
      const rawResponse = await fetch(urlRegister, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          Accept: 'Application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          tfno: tfno,
          descripcion: descripcion,
          emailAdmitido: emailAdmitido,
          rol: rol,//pondremos solo superadministrador para que solo se pueda registrar estos usuarios. el resto se crearan desde la aplicacion
          cenad: cenad,
          cenadAdministrado: cenadAdministrado,
          unidad: unidad
        }),
      })
      if (rawResponse.status == 200) {
        const response = await rawResponse.json()
        this.token = response.token
        this.username = response.username
        this.rol = response.rol
        return true
      } else return false
    },
    async login(username, password) {
      const urlLogin = `${useUtilsStore().urlApi}/auth/login`
      const rawResponse = await fetch(urlLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          Accept: 'Application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
      if (rawResponse.status == 200) {
        const response = await rawResponse.json()
        this.token = response.token
        this.username = response.username
        this.rol = response.rol
        return true
      } else return false
    },
    logout() {
      this.token = null
      this.username = null
      this.rol = null
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ['token', 'username', 'rol'] //si quisiera persistir todo el store simplemente cambio el objeto por true...
  },
})

export default useAuthStore
