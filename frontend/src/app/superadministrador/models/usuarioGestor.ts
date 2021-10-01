import { Cenad } from "./cenad";

export interface UsuarioGestor {
  idUsuario: string;
  nombre: string;
  password: string;
  tfno: string;
  email: string;
  cenad: Cenad;
  tipo:string;
  descripcion:string;
  url: string;
}
