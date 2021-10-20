import { UsuarioNormal } from "src/app/superadministrador/models/usuarioNormal";

export interface Unidad {
  idUnidad: string;
  nombre: string;
  direccion: string;
  usuariosNormal: UsuarioNormal[];
  tfno: string;
  email: string;
  poc: string;
  url: string;
}