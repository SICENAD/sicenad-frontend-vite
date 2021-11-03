import { SolicitudArma } from "./solicitudArma";

export interface Arma {
  idArma: string;
  nombre: string;
  tipoTiro: string;
  armasSolicitudes: SolicitudArma[];
  url: string;
}