import { Categoria } from "src/app/categorias/models/categoria";
import { UsuarioGestor } from "src/app/superadministrador/models/usuarioGestor";
import { TipoRecurso } from "src/app/tiposRecurso/models/tipoRecurso";

export interface Recurso {
  idRecurso: string;
  nombre: string;
  descripcion: string;
  otros: string;
  ficheros: any[];
  usuarioGestor: UsuarioGestor | any;
  categoria: Categoria | any;
  tipoRecurso: TipoRecurso | any;
  url: string;
}
