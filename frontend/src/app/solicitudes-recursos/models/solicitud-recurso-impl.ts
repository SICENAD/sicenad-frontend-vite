import { Recurso } from "src/app/recursos/models/recurso";
import { UsuarioNormal } from "src/app/usuarios/models/usuarioNormal";
import { SolicitudRecurso } from "./solicitud-recurso";

export class SolicitudRecursoImpl implements SolicitudRecurso {
  url: string;
  idSolicitud: string;
  observaciones: string;
  observacionesCenad: string;
  jefeUnidadUsuaria: string;
  pocEjercicio: string;
  tlfnRedactor: string;
  estado: string;
  fechaSolicitud: string;
  fechaUltModSolicitud: string;
  fechaHoraInicioRecurso: string;
  fechaHoraFinRecurso: string;
  fechaFinDocumentacion: string;
  unidadUsuaria: string;
  usuarioNormal: UsuarioNormal | any;
  documentacionCenad: any[];
  documentacionUnidad: any[];
  recurso: Recurso | any;
  otros: string;
  etiqueta: string;
  idUsuarioNormal: string;
  idUnidadUsuarioNormal: string;
  idRecurso: string;

  constructor() {}

}
