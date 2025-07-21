import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { borrarArchivo, borrarCarpeta, subirArchivo, toastExito, toTitleCase } from '@/utils'

class CenadService {
  cenads
  cenad
  administrador
  auth
  utils

  constructor() {
    this.cenads = ref([])
    this.cenad = ref()
    this.administrador = ref()
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
  async crearCenad(nombre, provincia, direccion, tfno, email, descripcion, archivoEscudo) {
    try {
      const urlCenads = `${this.utils.urlApi}/cenads`
      const responseCrearCenadSinEscudo = await this.utils.fetchConToken(urlCenads, 'POST', {
        nombre: nombre.toUpperCase(),
        provincia: provincia,
        direccion: toTitleCase(direccion),
        tfno: tfno,
        email: email,
        descripcion: descripcion,
      })
      let responseSinEscudoJson = await responseCrearCenadSinEscudo.json()
      let idCenad = responseSinEscudoJson.idString
      let escudo = null
      if (archivoEscudo) {
        const urlUpload = `${this.utils.urlApi}/files/${idCenad}/subirEscudo`
        escudo = await subirArchivo(archivoEscudo, urlUpload)
        if (escudo == false) return false
      }
      const response = await this.utils.fetchConToken(urlCenads, 'PATCH', {
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
      return false
    }
  }
  async editarCenad(
    nombre,
    provincia,
    direccion,
    tfno,
    email,
    descripcion,
    archivoEscudo,
    escudoActual,
    idCenad,
  ) {
    let escudo = escudoActual // por defecto mantenemos el actual
    if (archivoEscudo) {
      const urlUpload = `${this.utils.urlApi}/files/${idCenad}/subirEscudo`
      const nuevoEscudo = await subirArchivo(archivoEscudo, urlUpload)
      if (nuevoEscudo == false) return null
      const urlBorrarArchivo = `${this.utils.urlApi}/files/${idCenad}/borrarEscudo/${escudo}`
      const responseDeleteEscudo = await borrarArchivo(urlBorrarArchivo)
      console.log(responseDeleteEscudo)
      escudo = nuevoEscudo
    }
    try {
      const urlCenad = `${this.utils.urlApi}/cenads/${idCenad}`
      const body = {
        nombre: nombre.toUpperCase(),
        provincia: provincia,
        direccion: toTitleCase(direccion),
        tfno: tfno,
        email: email,
        descripcion: descripcion,
      }
      if (escudo) {
        body.escudo = escudo
      }
      const response = await this.utils.fetchConToken(urlCenad, 'PATCH', body)
      if (response.status == 200) {
        toastExito(
          i18n.global.t('cenads.editado', {
            cenad: nombre,
          }),
        )
        return escudo
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }
  async editarInfoCenad(
    direccion,
    tfno,
    email,
    descripcion,
    archivoInfoCenad,
    infoCenadActual,
    idCenad,
  ) {
    let infocenad = infoCenadActual // por defecto mantenemos el actual
    if (archivoInfoCenad) {
      const urlUpload = `${this.utils.urlApi}/files/${idCenad}/subirInfoCenad`
      const nuevaInfoCenad = await subirArchivo(archivoInfoCenad, urlUpload)
      if (nuevaInfoCenad == false) return null
      const urlBorrarArchivo = `${this.utils.urlApi}/files/${idCenad}/borrarInfoCenad/${infocenad}`
      infocenad != null && infocenad != '' && (await borrarArchivo(urlBorrarArchivo))
      infocenad = nuevaInfoCenad
      console.log(nuevaInfoCenad)
    }
    try {
      const urlCenad = `${this.utils.urlApi}/cenads/${idCenad}`
      const body = {
        direccion: toTitleCase(direccion),
        tfno: tfno,
        email: email,
        descripcion: descripcion,
      }
      if (infocenad != null && infocenad != '') {
        body.infoCenad = infocenad
        console.log(body)
      }
      console.log('pre editar')
      const response = await this.utils.fetchConToken(urlCenad, 'PATCH', body)
      console.log(response.json())
      if (response.status == 200) {
        toastExito(
          i18n.global.t('cenads.editado', {
            cenad: idCenad,
          }),
        )
        return infocenad
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }
  async fetchCenad(idCenad) {
    try {
      const urlCenad = `${this.utils.urlApi}/cenads/${idCenad}`
      const response = await this.utils.fetchConToken(urlCenad, 'GET', null)
      const json = await response.json()
      this.cenad.value = await json
      return response.status == 200 ? this.cenad.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async deleteCenad(idCenad) {
    try {
      const urlCenad = `${this.utils.urlApi}/cenads/${idCenad}`
      const urlCarpetaCenad = `${this.utils.urlApi}/files/${idCenad}/borrarCarpetaCenad`
      const responseDeleteCarpeta = await borrarCarpeta(urlCarpetaCenad)
      console.log(responseDeleteCarpeta)
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

  async fetchEscudo(filename, idCenad) {
    const response = await fetch(`${this.utils.urlApi}/files/${idCenad}/escudo/${filename}`, {
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
      },
    })

    if (!response.ok) throw new Error('No se pudo cargar la imagen')

    const blob = await response.blob()
    const imageUrl = URL.createObjectURL(blob)
    return imageUrl // Lo usas como src en una <img>
  }
  async fetchInfoCenad(filename, idCenad) {
    const response = await fetch(`${this.utils.urlApi}/files/${idCenad}/infoCenads/${filename}`, {
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
      },
    })

    if (!response.ok) throw new Error('No se pudo cargar la imagen')

    const blob = await response.blob()
    const imageUrl = URL.createObjectURL(blob)
    return imageUrl // Lo usas como src en una <img>
  }
  async getCenadsSinAdmin() {
    try {
      const urlCenads = `${this.utils.urlApi}/cenads/sinAdmin?size=1000`
      const response = await this.utils.fetchConToken(urlCenads, 'GET', null)
      const json = await response.json()
      this.cenads.value = await json._embedded.cenads
      return response.status == 200 ? this.cenads.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async getUsuarioAdministrador(idCenad) {
    try {
      const urlAdministrador = `${this.utils.urlApi}/cenads/${idCenad}/usuarioAdministrador`
      const response = await this.utils.fetchConToken(urlAdministrador, 'GET', null)
      const json = await response.json()
      this.administrador.value = await json
      return response.status == 200 ? this.administrador.value : null
    } catch (error) {
      console.log(error)
    }
  }
}

export default CenadService
