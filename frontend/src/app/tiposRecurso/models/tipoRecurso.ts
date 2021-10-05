import { Recurso } from "src/app/recursos/models/recurso";

export interface TipoRecurso {
  idTipoRecurso: string;
  nombre: string;
  descripcion: string;
  recursos: Recurso[];
  codTipo: number;
  url: string;
}
