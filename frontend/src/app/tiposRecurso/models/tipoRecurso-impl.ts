import { TipoRecurso } from "./tipoRecurso";

export class TipoRecursoImpl implements TipoRecurso {
  idTipoRecurso: string;
  nombre: string;
  descripcion: string;
  // recursos: Recurso[];
  codTipo: number;
  url: string;

  constructor() {}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}
