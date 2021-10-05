import { UsuarioAdministrador } from "./usuarioAdministrador";

export interface Cenad {
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
  tieneAdmin: boolean;
}
