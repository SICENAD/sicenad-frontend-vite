import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { toastExito, toTitleCase } from '@/utils'
import axios from 'axios'

class CenadService {
  cenads
  cenad
  auth
  utils

  constructor() {
    this.cenads = ref([])
    this.cenad = ref()
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
  async crearCenad(nombre, provincia, direccion, tfno, email, descripcion, escudoFile) {
    try {
      let escudo = null
      // Subir archivo si se proporciona uno
      if (escudoFile) {
        const formData = new FormData()
        formData.append('file', escudoFile)

        const urlUpload = `${this.utils.urlApi}/files/subirEscudo`
        const uploadResponse = await fetch(urlUpload, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${this.auth.token}`,
          },
        })

        if (uploadResponse.status === 413) {
          alert('El archivo tiene un tamaño superior al permitido')
          return false
        }

        const data = await uploadResponse.json()
        console.log('Respuesta de subida:', data)
        if (!uploadResponse.ok) {
          if (data.mensaje) {
            console.error(data.mensaje)
          }
          return false
        }

        escudo = data.nombreArchivo // o el campo que devuelva tu backend
      }

      const urlCenads = `${this.utils.urlApi}/cenads`
      const response = await this.utils.fetchConToken(urlCenads, 'POST', {
        nombre: nombre.toUpperCase(),
        provincia: provincia,
        direccion: toTitleCase(direccion),
        tfno: tfno,
        email: email,
        descripcion: descripcion,
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
async editarCenad(nombre, provincia, direccion, tfno, email, descripcion, archivoEscudo, escudoActual, idCenad) {
  let escudo = escudoActual; // por defecto mantenemos el actual

  // Si hay archivo nuevo, subimos y actualizamos nombre del archivo
  if (archivoEscudo !== null && archivoEscudo !== undefined) {
    const formData = new FormData();
    formData.append('file', archivoEscudo);

    const response = await fetch(`${this.utils.urlApi}/files/subirEscudo`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error subiendo escudo');
    }

    const data = await response.json();
    escudo = data.nombreArchivo;
  }

  try {
    const urlCenad = `${this.utils.urlApi}/cenads/${idCenad}`;

    // Construimos el body con los campos a enviar
    const body = {
      nombre: nombre.toUpperCase(),
      provincia: provincia,
      direccion: toTitleCase(direccion),
      tfno: tfno,
      email: email,
      descripcion: descripcion,
    };

    // Solo añadimos escudo si tenemos uno definido
    if (escudo) {
      body.escudo = escudo;
    }

    const response = await this.utils.fetchConToken(urlCenad, 'PATCH', body);

    if (response.status === 200) {
      toastExito(
        i18n.global.t('cenads.editado', {
          cenad: nombre,
        }),
      );
      return escudo;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}


  async fetchCenad(idCenad) {
    try {
      const urlCenad = `${this.utils.urlApi}/cenads/${idCenad}`
      const response = await this.utils.fetchConToken(urlCenad, 'GET', null)
      const json = await response.json()
      this.cenad.value = await json
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async deleteCenad(idCenad) {
    try {
      const urlCenad = `${this.utils.urlApi}/cenads/${idCenad}`
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
  async uploadEscudo(file) {
    const url = `${this.utils.urlApi}/files/subirEscudo`
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${this.auth.token}`,
        },
      })

      if (response.status === 413) {
        alert('El archivo tiene un tamaño superior al permitido')
        throw new Error('Archivo demasiado grande')
      }

      const data = await response.json()

      if (!response.ok) {
        if (data.mensaje) {
          console.error(data.mensaje)
        }
        throw new Error('Error al subir el escudo')
      }

      return data // Ej: { nombreArchivo: 'escudo.png' }
    } catch (error) {
      console.error('Error en uploadEscudo:', error)
      throw error
    }
  }
  

async fetchEscudo(filename) {
  const response = await fetch(`${this.utils.urlApi}/files/escudos/${filename}`, {
    headers: {
      'Authorization': `Bearer ${this.auth.token}`
    }
  });

  if (!response.ok) throw new Error('No se pudo cargar la imagen');

  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);
  return imageUrl;  // Lo usas como src en una <img>
}



}

export default CenadService
