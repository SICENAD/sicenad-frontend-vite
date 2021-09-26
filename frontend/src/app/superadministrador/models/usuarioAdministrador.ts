import { Cenad } from "./cenad";

export interface UsuarioAdministrador {
  idUsuario: string;
  nombre: string;
  password: string;
  tfno: string;
  email: string;
  cenad: Cenad;
  tipo:string;
  url: string;
}
