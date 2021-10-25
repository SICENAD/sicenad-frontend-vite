import { UsuarioAdministrador } from "src/app/usuarios/models/usuarioAdministrador";
import { Cenad } from "./cenad";

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
  usuarioAdministrador: UsuarioAdministrador;
  tieneAdmin: boolean = false;

  constructor() {}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}