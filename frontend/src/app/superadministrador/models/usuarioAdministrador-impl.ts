import { Cenad } from "./cenad";
import { UsuarioAdministrador } from "./usuarioAdministrador";

export class UsuarioAdministradorImpl implements UsuarioAdministrador {
  idUsuario: string;
  nombre: string;
  password: string;
  tfno: string;
  email: string;
  cenad: Cenad | string;
  tipo:string;
  descripcion:string;
  url: string;

  constructor() {}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}
