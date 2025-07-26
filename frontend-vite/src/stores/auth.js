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
      usuario: null,
      isReady: false
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
      } catch (error) {}
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
        const [
          cenadsRes,
          categoriasFicheroRes,
          tiposFormularioRes,
          unidadesRes,
          armasRes,
          usuariosSuperadministradorRes,
          usuariosAdministradorRes,
          usuariosNormalRes,
        ] = await Promise.all([
          utils.fetchConToken(`${utils.urlApi}/cenads`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/categorias_fichero`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/tipos_formulario`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/unidades`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/armas`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/usuarios_superadministrador`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/usuarios_administrador`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/usuarios_normal`, 'GET', null),
        ])
        this.cenads = cenadsRes.ok ? (await cenadsRes.json())?._embedded?.cenads || [] : []
        this.categoriasFichero = categoriasFicheroRes.ok
          ? (await categoriasFicheroRes.json())?._embedded?.categorias_fichero || []
          : []
        this.tiposFormulario = tiposFormularioRes.ok
          ? (await tiposFormularioRes.json())?._embedded?.tipos_formulario || []
          : []
        this.unidades = unidadesRes.ok ? (await unidadesRes.json())?._embedded?.unidades || [] : []
        this.armas = armasRes.ok ? (await armasRes.json())?._embedded?.armas || [] : []
        this.usuariosSuperadministrador = usuariosSuperadministradorRes.ok
          ? (await usuariosSuperadministradorRes.json())?._embedded?.usuarios_superadministrador ||
            []
          : []
        this.usuariosAdministrador = usuariosAdministradorRes.ok
          ? (await usuariosAdministradorRes.json())?._embedded?.usuarios_administrador || []
          : []
        this.usuariosNormal = usuariosNormalRes.ok
          ? (await usuariosNormalRes.json())?._embedded?.usuarios_normal || []
          : []
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
          this.usuario = await respUsuario.json()
          const respCenad = await utils.fetchConToken(
            `${utils.urlApi}/usuarios_administrador/${this.usuario.idString}/cenad`,
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
          this.usuario = await respUsuario.json()
          const respCenad = await utils.fetchConToken(
            `${utils.urlApi}/usuarios_gestor/${this.usuario.idString}/cenad`,
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
          this.usuario = await respUsuario.json()
          const respUnidad = await utils.fetchConToken(
            `${utils.urlApi}/usuarios_normal/${this.usuario.idString}/cenad`,
            'GET',
            null,
          )
          this.unidad = await respUnidad.json()
        }
        this.isReady = true
      } catch (err) {
        console.error('Error cargando datos estáticos del usuario:', err)
      }
    },
    async getDatosInicialesDeCenad(idCenad) {
      const utils = useUtilsStore()
      try {
        const [
          usuarioAdministradorRes,
          cenadRes,
          categoriasRes,
          categoriasPadreRes,
          recursosRes,
          cartografiasRes,
          normativasRes,
          usuariosGestoresRes,
        ] = await Promise.all([
          utils.fetchConToken(
            `${utils.urlApi}/cenads/${idCenad}/usuarioAdministrador`,
            'GET',
            null,
          ),
          utils.fetchConToken(`${utils.urlApi}/cenads/${idCenad}`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/cenads/${idCenad}/categorias`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/cenads/${idCenad}/categoriasPadre`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/cenads/${idCenad}/recursos`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/cenads/${idCenad}/cartografias`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/cenads/${idCenad}/normativas`, 'GET', null),
          utils.fetchConToken(`${utils.urlApi}/cenads/${idCenad}/usuariosGestores`, 'GET', null),
        ])
        this.categorias = categoriasRes.ok
          ? (await categoriasRes.json())?._embedded?.categorias || []
          : []
        this.categoriasPadre = categoriasPadreRes.ok
          ? (await categoriasPadreRes.json())?._embedded?.categorias || []
          : []
        this.recursos = recursosRes.ok ? (await recursosRes.json())?._embedded?.recursos || [] : []
        this.cartografias = cartografiasRes.ok
          ? (await cartografiasRes.json())?._embedded?.cartografias || []
          : []
        this.normativas = normativasRes.ok
          ? (await normativasRes.json())?._embedded?.ficheros || []
          : []
        this.usuariosGestor = usuariosGestoresRes.ok
          ? (await usuariosGestoresRes.json())?._embedded?.usuarios_gestor || []
          : []
        this.usuarioAdministrador = usuarioAdministradorRes.ok
          ? await usuarioAdministradorRes.json()
          : null
        this.cenadVisitado = cenadRes.ok ? await cenadRes.json() : null
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
      this.armas = []
      this.usuariosSuperadministrador = []
      this.usuariosAdministrador = []
      this.usuariosNormal = []
    },
    borrarDatosDeUsuario() {
      this.cenad = null
      this.unidad = null
      this.usuario = null
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
