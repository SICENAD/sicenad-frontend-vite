import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { borrarArchivo, subirArchivo, toastExito } from '@/utils'

class CartografiaService {
  cartografias
  cartografia
  auth
  utils

  constructor() {
    this.cartografias = ref([])
    this.cartografia = ref()
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
  }
  getCartografias() {
    return this.cartografias
  }
  getCartografia() {
    return this.cartografia
  }
  async fetchAll(idCenad) {
    try {
      const urlCartografias = `${this.utils.urlApi}/cenads/${idCenad}/cartografias?size=1000`
      const response = await this.utils.fetchConToken(urlCartografias, 'GET', null)
      const json = await response.json()
      this.cartografias.value = await json._embedded.cartografias
      return response.status == 200 ? this.cartografias.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async fetchCartografia(idCartografia) {
    try {
      const urlCartografia = `${this.utils.urlApi}/cartografias/${idCartografia}`
      const response = await this.utils.fetchConToken(urlCartografia, 'GET', null)
      const json = await response.json()
      this.cartografia.value = await json
      return response.status == 200 ? this.cartografia.value : null
    } catch (error) {
      console.log(error)
    }
  }
  async crearCartografia(nombre, descripcion, escala, archivo, idCenad) {
    try {
      let nombreArchivo = null
      if (archivo) {
        const urlUpload = `${this.utils.urlApi}/files/${idCenad}/subirCartografia`
        nombreArchivo = await subirArchivo(archivo, urlUpload)
        console.log('el nombre del archivo es ' + nombreArchivo)
        if (nombreArchivo == false) return false
      }
      const urlCartografias = `${this.utils.urlApi}/cartografias`
      const body = {
        nombre: nombre.toUpperCase(),
        descripcion: descripcion,
        escala: escala,
        cenad: `${this.utils.urlApi}/cenads/${idCenad}`,
        categoriaFichero: `${this.utils.urlApi}/categorias_fichero/${this.utils.categoriaFicheroCartografia}`,
        nombreArchivo: nombreArchivo,
      }
      const response = await this.utils.fetchConToken(urlCartografias, 'POST', body)
      if (response.status == 201) {
        i18n.global.t('comun.enviando')
        toastExito(
          i18n.global.t('cartografias.creada', {
            cartografia: nombre,
          }),
        )
        await this.auth.getDatosInicialesDeCenad(idCenad)
        return true
      } else return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
 async editarCartografia(
  nombre,
  descripcion,
  escala,
  archivo,
  nombreArchivoActual,
  idCenad,
  idCartografia,
) {
  let nombreArchivo = nombreArchivoActual; // por defecto mantenemos el actual

  try {
    // Si hay archivo nuevo, lo subimos y borramos el anterior
    if (archivo) {
      const urlUpload = `${this.utils.urlApi}/files/${idCenad}/subirCartografia`;
      const nuevaCartografia = await subirArchivo(archivo, urlUpload);
      if (nuevaCartografia == false) return null;

      // Borrar archivo anterior
      const urlBorrarArchivo = `${this.utils.urlApi}/files/${idCenad}/borrarCartografia/${nombreArchivo}`;
      await borrarArchivo(urlBorrarArchivo);

      // Actualizamos el nombre del archivo para la BD
      nombreArchivo = nuevaCartografia;
    }

    // Aquí siempre hacemos el PATCH, aunque no haya archivo nuevo
    const urlCartografia = `${this.utils.urlApi}/cartografias/${idCartografia}`;
    const body = {
      nombre: nombre.toUpperCase(),
      descripcion: descripcion,
      escala: escala,
      nombreArchivo: nombreArchivo, // se mantiene igual si no hubo archivo nuevo
    };

    const response = await this.utils.fetchConToken(urlCartografia, 'PATCH', body);

    if (response.status == 200) {
      toastExito(
        i18n.global.t('cartografias.editada', {
          cartografia: nombre,
        }),
      );
      await this.auth.getDatosInicialesDeCenad(idCenad);
      return nombreArchivo;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}


  async deleteCartografia(nombreArchivo, idCartografia, idCenad) {
    try {
      const urlBorrarArchivo = `${this.utils.urlApi}/files/${idCenad}/borrarCartografia/${nombreArchivo}`
      await borrarArchivo(urlBorrarArchivo)
      const urlCartografia = `${this.utils.urlApi}/cartografias/${idCartografia}`
      const response = await this.utils.fetchConToken(urlCartografia, 'DELETE', null)
      const json = await response.json()
      this.cartografia.value = await json
      if (response.status == 200) {
        toastExito(
          i18n.global.t('cartografias.cartografiaBorrada', {
            cartografia: this.cartografia.value.nombre,
          }),
        )
        await this.auth.getDatosInicialesDeCenad(idCenad)
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async fetchArchivoCartografia(filename, idCenad) {
    const response = await this.utils.fetchArchivoConToken(`${this.utils.urlApi}/files/${idCenad}/cartografias/${filename}`, 'GET', null)
    if (!response.ok) throw new Error('No se pudo descargar el archivo')
    const blob = await response.blob()
    const archivoUrl = URL.createObjectURL(blob)
    return archivoUrl
  }
}
export default CartografiaService