import { defineStore } from 'pinia'
import useUtilsStore from '@/stores/utils'
import router from '@/router'

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
      usuariosSuperadministrador: [],
      usuariosAdministrador: [],
      usuariosNormal: [],
      categorias: [],
      categoriasPadre: [],
      recursos: [],
      cartografias: [],
      normativas: [],
      usuariosGestor: [],
      usuarioAdministrador: null,
      cenadVisitado: null,
      cenad: null,
      unidad: null,
    }
  },
  getters: {},
  actions: {
    async register(username, password, tfno, email, emailAdmitido, descripcion, rol) {
      try {
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
        return rawResponse.ok
      } catch (error) {
      }
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
      if (rawResponse.ok) {
        const response = await rawResponse.json()
        this.token = response.token
        this.username = response.username
        this.rol = response.rol
        await this.getDatosIniciales()
        await this.getDatosDeUsuario()
        return true
      } else return false
    },
    async logout() {
      this.borrarDatosSeguridad()
      this.borrarDatosIniciales()
      this.borrarDatosDeUsuario()
      this.borrarDatosCenad()
      await router.push({ name: 'home' })
    },
    async getDatosIniciales() {
      const utils = useUtilsStore()
      try {
        let jsonTemporal
        const [cenadsRes, categoriasFicheroRes, tiposFormularioRes, unidadesRes, armasRes, usuariosSuperadministradorRes, usuariosAdministradorRes, usuariosNormalRes] =
          await Promise.all([
            utils.fetchConToken(`${utils.urlApi}/cenads`, 'GET', null),
            utils.fetchConToken(`${utils.urlApi}/categorias_fichero`, 'GET', null),
            utils.fetchConToken(`${utils.urlApi}/tipos_formulario`, 'GET', null),
            utils.fetchConToken(`${utils.urlApi}/unidades`, 'GET', null),
            utils.fetchConToken(`${utils.urlApi}/armas`, 'GET', null),
            utils.fetchConToken(`${utils.urlApi}/usuarios_superadministrador`, 'GET', null),
            utils.fetchConToken(`${utils.urlApi}/usuarios_administrador`, 'GET', null),
            utils.fetchConToken(`${utils.urlApi}/usuarios_normal`, 'GET', null),
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
        if (usuariosSuperadministradorRes.ok) {
          jsonTemporal = await usuariosSuperadministradorRes.json()
          this.usuariosSuperadministrador = jsonTemporal._embedded.usuarios_superadministrador
        }
        if (usuariosAdministradorRes.ok) {
          jsonTemporal = await usuariosAdministradorRes.json()
          this.usuariosAdministrador = jsonTemporal._embedded.usuarios_administrador
        }
        if (usuariosNormalRes.ok) {
          jsonTemporal = await usuariosNormalRes.json()
          this.usuariosNormal = jsonTemporal._embedded.usuarios_normal
        }
      } catch (err) {
        console.error('Error cargando datos estáticos iniciales:', err)
      }
    },
    async getDatosDeUsuario() {
      const utils = useUtilsStore()
      try {
        if (this.rol == 'Administrador') {
          const respUsuario = await utils.fetchConToken(
            `${utils.urlApi}/usuarios_administrador/search/findByUsername?username=${this.username}`,
            'GET',
            null,
          )
          const respJson = await respUsuario.json()
          const idUsusario = respJson.idString
          const respCenad = await utils.fetchConToken(
            `${utils.urlApi}/usuarios_administrador/${idUsusario}/cenad`,
            'GET',
            null,
          )
          this.cenad = await respCenad.json()
        }
        if (this.rol == 'Gestor') {
          const respUsuario = await utils.fetchConToken(
            `${utils.urlApi}/usuarios_gestor/search/findByUsername?username=${this.username}`,
            'GET',
            null,
          )
          const respJson = await respUsuario.json()
          const idUsusario = respJson.idString
          const respCenad = await utils.fetchConToken(
            `${utils.urlApi}/usuarios_gestor/${idUsusario}/cenad`,
            'GET',
            null,
          )
          this.cenad = await respCenad.json()
        }
        if (this.rol == 'Normal') {
          const respUsuario = await utils.fetchConToken(
            `${utils.urlApi}/usuarios_normal/search/findByUsername?username=${this.username}`,
            'GET',
            null,
          )
          const respJson = await respUsuario.json()
          const idUsusario = respJson.idString
          const respUnidad = await utils.fetchConToken(
            `${utils.urlApi}/usuarios_normal/${idUsusario}/cenad`,
            'GET',
            null,
          )
          this.unidad = await respUnidad.json()
        }
      } catch (err) {
        console.error('Error cargando datos estáticos del usuario:', err)
      }
    },
    async getDatosInicialesDeCenad(idCenad) {
      const utils = useUtilsStore()
      try {
        let jsonTemporal
        const [
          categoriasRes,
          categoriasPadreRes,
          recursosRes,
          cartografiasRes,
          normativasRes,
          usuariosGestoresRes,
          usuarioAdministradorRes,
          cenadRes,
        ] = await Promise.all([
          utils.fetchConToken(`${utils.urlApi}/cenads/${idCenad}/categorias`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/cenads/${idCenad}/categoriasPadre`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/cenads/${idCenad}/recursos`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/cenads/${idCenad}/cartografias`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/cenads/${idCenad}/normativas`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/cenads/${idCenad}/usuariosGestores`, 'GET', null),
          utils.fetchConToken(
            `${utils.urlApi}/cenads/${idCenad}/usuarioAdministrador`,
            'GET',
            null,
          ),
          utils.fetchConToken(`${utils.urlApi}/cenads/${idCenad}`, 'GET', null),
        ])
        if (categoriasRes.ok) {
          jsonTemporal = await categoriasRes.json()
          this.categorias = jsonTemporal._embedded.categorias
        }
        if (categoriasPadreRes.ok) {
          jsonTemporal = await categoriasPadreRes.json()
          this.categoriasPadre = jsonTemporal._embedded.categorias
        }
        if (recursosRes.ok) {
          jsonTemporal = await recursosRes.json()
          this.recursos = jsonTemporal._embedded.recursos
        }
        if (cartografiasRes.ok) {
          jsonTemporal = await cartografiasRes.json()
          this.cartografias = jsonTemporal._embedded.cartografias
        }
        if (normativasRes.ok) {
          jsonTemporal = await normativasRes.json()
          this.normativas = jsonTemporal._embedded.normativas
        }
        if (usuariosGestoresRes.ok) {
          jsonTemporal = await usuariosGestoresRes.json()
          this.usuariosGestor = jsonTemporal._embedded.usuarios_gestor
        }
        if (usuarioAdministradorRes.ok) {
          jsonTemporal = await usuarioAdministradorRes.json()
          this.usuarioAdministrador = jsonTemporal
        }
        if (cenadRes.ok) {
          jsonTemporal = await cenadRes.json()
          this.cenadVisitado = jsonTemporal
        }
      } catch (err) {
        console.error('Error cargando datos estáticos:', err)
      }
    },
    borrarDatosSeguridad() {
      this.token = null
      this.username = null
      this.rol = null
    },
    borrarDatosIniciales() {
      this.cenads = []
      this.categoriasFichero = []
      this.tiposFormulario = []
      this.unidades = []
      this.armas = [],
        this.usuariosSuperadministrador = [],
        this.usuariosAdministrador = [],
        this.usuariosNormal = []
    },
    borrarDatosDeUsuario() {
      this.cenad = null
      this.unidad = null
    },
    borrarDatosCenad() {
      this.categorias = []
      this.categoriasPadre = []
      this.recursos = []
      this.cartografias = []
      this.normativas = []
      this.usuariosGestor = []
      this.usuarioAdministrador = null
      this.cenadVisitado = null
    },
    async init() {
      const utils = useUtilsStore()
      if (this.token) {
        try {
          const res = await utils.fetchConToken(`${utils.urlApi}/cenads`, 'GET', null)
          if (res.ok) {
            await this.getDatosIniciales()
            await this.getDatosDeUsuario()
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
