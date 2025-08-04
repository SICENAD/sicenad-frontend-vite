import { baseNormalizada, toastExito, toSentenceCase, toTitleCase, formatearFecha, toInstant, toDate, subirArchivo, borrarArchivo, formatearFechaHora, parseDate, formatDate, formatDateTime } from '@/utils'

export default {
  install: (app) => {
    app.config.globalProperties.$utils = {
      toTitleCase,
      toSentenceCase,
      formatearFechaHora,
      formatearFecha,
      toInstant,
      toDate,
      parseDate,
      formatDate,
      formatDateTime,
      toastExito,
      baseNormalizada,
      subirArchivo, 
      borrarArchivo
    }
    /* por si quiero añadir propiedades concretas como $utils.base, aunque estos casos los tengo importados desde mi clase de utils
    const base = import.meta.env.VITE_PUBLIC_PATH || '/'
    const baseNormalizada = base.endsWith('/') ? base : base + '/'
    app.config.globalProperties.$base = () => base
    app.config.globalProperties.$baseNormalizada = () => baseNormalizada
    */
  },
}
