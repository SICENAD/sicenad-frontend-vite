import { UsuarioAdministrador } from "src/app/usuarios/models/usuarioAdministrador";

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
  usuarioAdministrador: UsuarioAdministrador;
  tieneAdmin: boolean;
}