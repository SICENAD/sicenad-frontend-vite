import { Categoria } from "src/app/categorias/models/categoria";
import { UsuarioGestor } from "src/app/superadministrador/models/usuarioGestor";
import { TipoFormulario } from "src/app/tiposFormulario/models/tipoFormulario";
import { Fichero } from "./fichero";
import { Recurso } from "./recurso";

export class RecursoImpl implements Recurso {
  idRecurso: string;
  nombre: string;
  descripcion: string;
  otros: string;
  ficheros: Fichero[];
  usuarioGestor: UsuarioGestor | any;
  categoria: Categoria | any;
  tipoFormulario: TipoFormulario | any;
  url: string;

  constructor() {}


  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}
