import { Arma } from "./arma";
import { SolicitudArma } from "./solicitudArma";

export class ArmaImpl implements Arma {
  idArma: string;
  nombre: string;
  tipoTiro: string;
  armasSolicitudes: SolicitudArma[];
  url: string;

  constructor() {}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}