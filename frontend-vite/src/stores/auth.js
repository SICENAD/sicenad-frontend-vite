import { defineStore } from 'pinia'
import useUtilsStore from '@/stores/utils'

const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: null,
      rol: null,
      username: null,
      cenads: [],
      categoriasFichero: [],
      tiposFormulario: [],
      unidades: [],
      armas: [],
    }
  },
  getters: {},
  actions: {
    async register(username, password, tfno, email, emailAdmitido, descripcion, rol) {
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
          tfno: tfno,
          email: email,
          emailAdmitido: emailAdmitido,
          descripcion: descripcion,
          rol: rol,
        }),
      })
      if (rawResponse.status == 200) {
        /*
        const response = await rawResponse.json()
        this.token = response.token
        this.username = response.username
        this.rol = response.rol
        */
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

        await this.getDatosIniciales()
        return true
      } else return false
    },
    logout() {
      this.token = null
      this.username = null
      this.rol = null
      this.cenads = null
      this.categoriasFichero = null
      this.tiposFormulario = null
      this.unidades = null
      this.armas = null
    },
    async getDatosIniciales() {
      const utils = useUtilsStore()

      try {
        let jsonTemporal
        const [cenadsRes, categoriasFicheroRes, tiposFormularioRes, unidadesRes, armasRes] =
          await Promise.all([
            utils.fetchConToken(`${utils.urlApi}/cenads`, 'GET', null),
            utils.fetchConToken(`${utils.urlApi}/categorias_fichero`, 'GET', null),
            utils.fetchConToken(`${utils.urlApi}/tipos_formulario`, 'GET', null),
            utils.fetchConToken(`${utils.urlApi}/unidades`, 'GET', null),
            utils.fetchConToken(`${utils.urlApi}/armas`, 'GET', null),
          ])
        if (cenadsRes.ok) {
          jsonTemporal = await cenadsRes.json()
          this.cenads = jsonTemporal._embedded.cenads
        }
        if (categoriasFicheroRes.ok) {
          jsonTemporal = await categoriasFicheroRes.json()
          this.categoriasFichero = jsonTemporal._embedded.categorias_fichero
        }
        if (tiposFormularioRes.ok) {
          jsonTemporal = await tiposFormularioRes.json()
          this.tiposFormulario = jsonTemporal._embedded.tipos_formulario
        }
        if (unidadesRes.ok) {
          jsonTemporal = await unidadesRes.json()
          this.unidades = jsonTemporal._embedded.unidades
        }
        if (armasRes.ok) {
          jsonTemporal = await armasRes.json()
          this.armas = jsonTemporal._embedded.armas
        }
      } catch (err) {
        console.error('Error cargando datos estáticos:', err)
      }
    },
    async init() {
      const utils = useUtilsStore()
      if (this.token) {
        try {
          const res = await utils.fetchConToken(`${utils.urlApi}/cenads`, 'GET', null)
          if (res.ok) {
            await this.getDatosIniciales()
          } else {
            this.logout()
          }
          return res
        } catch (e) {
          console.log(e)
          this.logout()
          return null
        }
      }
    },
  },
  persist: {
    storage: sessionStorage,
    paths: [
      'token',
      'username',
      'rol',
      'cenads',
      'categoriasFichero',
      'tiposFormulario',
      'unidades',
      'armas',
    ], //si quisiera persistir todo el store simplemente cambio el objeto por true...
  },
})

export default useAuthStore
