import { Categoria } from "src/app/categorias/models/categoria";
import { UsuarioGestor } from "src/app/superadministrador/models/usuarioGestor";
import { TipoFormulario } from "src/app/tiposFormulario/models/tipoFormulario";

export interface Recurso {
  idRecurso: string;
  nombre: string;
  descripcion: string;
  otros: string;
  ficheros: any[];
  usuarioGestor: UsuarioGestor | any;
  categoria: Categoria | any;
  tipoFormulario: TipoFormulario | any;
  url: string;
}
