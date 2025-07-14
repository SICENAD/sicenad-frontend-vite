import { defineStore } from 'pinia'
import useAuthStore from '@/stores/auth'

const useUtilsStore = defineStore('utils', {
  state: () => {
    return {
      properties: null,
      provincias: [
    { idProvincia: 15, nombre: "A CORUÑA" },
    { idProvincia: 1, nombre: "ALAVA" },
    { idProvincia: 2, nombre: "ALBACETE" },
    { idProvincia: 3, nombre: "ALICANTE" },
    { idProvincia: 4, nombre: "ALMERIA" },
    { idProvincia: 33, nombre: "ASTURIAS" },
    { idProvincia: 5, nombre: "AVILA" },
    { idProvincia: 6, nombre: "BADAJOZ" },
    { idProvincia: 8, nombre: "BARCELONA" },
    { idProvincia: 9, nombre: "BURGOS" },
    { idProvincia: 10, nombre: "CACERES" },
    { idProvincia: 11, nombre: "CADIZ" },
    { idProvincia: 39, nombre: "CANTABRIA" },
    { idProvincia: 12, nombre: "CASTELLON" },
    { idProvincia: 51, nombre: "CEUTA" },
    { idProvincia: 13, nombre: "CIUDAD REAL" },
    { idProvincia: 14, nombre: "CORDOBA" },
    { idProvincia: 16, nombre: "CUENCA" },
    { idProvincia: 17, nombre: "GERONA" },
    { idProvincia: 18, nombre: "GRANADA" },
    { idProvincia: 19, nombre: "GUADALAJARA" },
    { idProvincia: 20, nombre: "GUIPUZCOA" },
    { idProvincia: 21, nombre: "HUELVA" },
    { idProvincia: 22, nombre: "HUESCA" },
    { idProvincia: 7, nombre: "ISLAS BALEARES" },
    { idProvincia: 23, nombre: "JAEN" },
    { idProvincia: 26, nombre: "LA RIOJA" },
    { idProvincia: 24, nombre: "LEON" },
    { idProvincia: 25, nombre: "LERIDA" },
    { idProvincia: 27, nombre: "LUGO" },
    { idProvincia: 28, nombre: "MADRID" },
    { idProvincia: 29, nombre: "MALAGA" },
    { idProvincia: 52, nombre: "MELILLA" },
    { idProvincia: 30, nombre: "MURCIA" },
    { idProvincia: 31, nombre: "NAVARRA" },
    { idProvincia: 32, nombre: "OURENSE" },
    { idProvincia: 34, nombre: "PALENCIA" },
    { idProvincia: 35, nombre: "LAS PALMAS" },
    { idProvincia: 36, nombre: "PONTEVEDRA" },
    { idProvincia: 37, nombre: "SALAMANCA" },
    { idProvincia: 40, nombre: "SEGOVIA" },
    { idProvincia: 41, nombre: "SEVILLA" },
    { idProvincia: 42, nombre: "SORIA" },
    { idProvincia: 38, nombre: "STA CRUZ TENERIFE" },
    { idProvincia: 43, nombre: "TARRAGONA" },
    { idProvincia: 44, nombre: "TERUEL" },
    { idProvincia: 45, nombre: "TOLEDO" },
    { idProvincia: 46, nombre: "VALENCIA" },
    { idProvincia: 47, nombre: "VALLADOLID" },
    { idProvincia: 48, nombre: "VIZCAYA" },
    { idProvincia: 49, nombre: "ZAMORA" },
    { idProvincia: 50, nombre: "ZARAGOZA" },
]
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
