import { Categoria } from "src/app/categorias/models/categoria";
import { UsuarioGestor } from "src/app/superadministrador/models/usuarioGestor";
import { TipoRecurso } from "src/app/tiposRecurso/models/tipoRecurso";
import { Recurso } from "./recurso";

export class RecursoImpl implements Recurso {
  idRecurso: string;
  nombre: string;
  descripcion: string;
  otros: string;
  ficheros: any[];
  usuarioGestor: UsuarioGestor | any;
  categoria: Categoria | any;
  tipoRecurso: TipoRecurso | any;
  url: string;

  constructor() {}


  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}
