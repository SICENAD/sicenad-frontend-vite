import { SolicitudArma } from "./solicitud-arma";

export class SolicitudArmaImpl implements SolicitudArma {
  url: string;
  idSolicitudArma: string;
  coordAsentamiento: number;
	coordPuntoCaida: number;
	alcanceMax: number;
	zonaSegAngulo: number;
  armaUrl: string;
  arma: string;
  solicitudUrl: string;
  armaId: string;
  solicitudId: string;
  solicitud: string;

  constructor() {} 

}
