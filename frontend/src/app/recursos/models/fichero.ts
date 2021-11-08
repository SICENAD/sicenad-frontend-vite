import { CategoriaFichero } from "src/app/categoriasFichero/models/categoriaFichero";
import { SolicitudRecurso } from "src/app/solicitudes-recursos/models/solicitud-recurso";
import { Recurso } from "./recurso";

export interface Fichero {
  idFichero: string;
  nombre: string;
  nombreArchivo: string;
  descripcion: string;
  imagen: string;
  categoriaFichero: CategoriaFichero | any;
  recurso: Recurso | any;
  solicitudRecursoCenad: SolicitudRecurso | any;
  solicitudRecursoUnidad: SolicitudRecurso | any;
  url: string;
}