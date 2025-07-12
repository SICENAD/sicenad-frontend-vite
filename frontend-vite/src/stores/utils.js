import { defineStore } from 'pinia'
import useAuthStore from '@/stores/auth'

const useUtilsStore = defineStore('utils', {
  state: () => {
    return {
      properties: null,
    }
  },
  getters: {
    urlApi: (state) => state.properties?.urlApi || '',
    passwordForRegister: (state) => state.properties?.passwordForRegister || '',
    sizeMaxEscudo: (state) => state.properties?.sizeMaxEscudo || 0,
    sizeMaxDocRecurso: (state) => state.properties?.sizeMaxDocRecurso || 0,
    sizeMaxDocSolicitud: (state) => state.properties?.sizeMaxDocSolicitud || 0,
    sizeMaxCartografia: (state) => state.properties?.sizeMaxCartografia || 0,
    categoriaFicheroCartografia: (state) => state.properties?.sizeMaxDocRecurso || "1",
    tiposTiro: (state) => state.properties?.tiposTiro || []
  },
  actions: {
    async cargarPropiedadesIniciales() {
      if (this.properties) return // ya está cargado, no hagas nada
      try {
        const publicPath = import.meta.env.VITE_PUBLIC_PATH
        const res = await fetch(`${publicPath}properties.json`)
        //const res = await fetch(`${window.location.pathname.replace(/\/$/, '')}/properties.json`)
        this.properties = await res.json()
      } catch (error) {
        console.error('Error cargando properties.json:', error)
      }
    },
    async fetchConToken(url, method, bodyinJson) {
      try {
        const response =
          bodyinJson == null
            ? await fetch(url, {
              method: method,
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                Authorization: `Bearer ${useAuthStore().token}`,
              },
            })
            : await fetch(url, {
              method: method,
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                Authorization: `Bearer ${useAuthStore().token}`,
              },
              body: JSON.stringify(bodyinJson),
            })
        return response
      } catch (error) {
        console.log(error)
      }
    },
  },
})

export default useUtilsStore
