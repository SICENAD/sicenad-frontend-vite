import { Cenad } from "./cenad";
import { UsuarioAdministrador } from "./usuarioAdministrador";

export class CenadImpl implements Cenad {
  idCenad: string;
  nombre: string;
  descripcion: string;
  direccion: string;
  tfno: string;
  email: string;
  escudo: string;
  provincia: number;
  url: string;
  usuarioAdministrador: UsuarioAdministrador | string;
  tieneAdmin: boolean = false;

  constructor() {}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}
