import { Fichero } from "src/app/recursos/models/fichero";
import { Recurso } from "src/app/recursos/models/recurso";
import { UsuarioNormal } from "src/app/usuarios/models/usuarioNormal";
import { SolicitudArma } from "./solicitud-arma";
import { SolicitudRecurso } from "./solicitud-recurso";

export class SolicitudRecursoImpl implements SolicitudRecurso {
  url: string;
  // COMUNES A TODAS LAS SOLICITUDES
  idSolicitud: string;
	observaciones: string;
	observacionesCenad: string;
	jefeUnidadUsuaria: string;
	pocEjercicio: string;
	tlfnRedactor: string;
	estado: string; // Borrador, Pendiente, Aprobada, Denegada, Cancelada, Finalizada
	fechaSolicitud: string;
	fechaUltModSolicitud: string;
	fechaHoraInicioRecurso: string;
	fechaHoraFinRecurso: string;
	fechaFinDocumentacion: string;
	unidadUsuaria: string;
  usuarioNormal: UsuarioNormal | any;
  documentacionCenad: Fichero[];
  documentacionUnidad: Fichero[];
  recurso: Recurso | any;
  etiqueta: string;
  //estos campos no existen en la entidad
  idUsuarioNormal: string;
  idUnidadUsuarioNormal: string;
  idRecurso: string;
  // DATOS ESPECIFICOS
  //Zona Caida Proyectiles/Explosivos
	isConMunTrazadoraIluminanteFumigena: boolean;
  solicitudesArmas: SolicitudArma[];
  //Campo Tiro Carros, VCI/C, Precisión
  tipoEjercicio: string;
	armaPral: string;
	armaPrpalNumDisparosPrev: string;
	armaSecund: string;
	armaSecundNumDisparosPrev: string;
  //Campo Tiro Laser
  numBlancosFijosA: number;
	numBlancosFijosB: number;
	numBlancosFijosC: number;
	numBlancosFijosD: number;
	numBlancosFijosE: number;
	numBlancosMovilesA: number;
	numBlancosMovilesB: number;
	numBlancosMovilesC: number;
	numBlancosMovilesD: number;
	numBlancosMovilesE: number;
  //Campo Tiro
  arma1CT: string;
	arma1CTlongitud: string;
	arma2CT: string;
	arma2CTlongitud: string;
  //Campo Explosivos
  explosivo: string;
  //Ejercicio Zona Restringida
  actividad: string;
  //Acantonamiento-Vivac
  vivac: string;
  //Zona de vida Batallón
  isConUsoCocina: boolean;
  numPersonasZVB: number;
  //Zona de Espera
  numPersonasZE: number;
  //Lavaderos
  numVehCadenas: number;
	numVehRuedas: number;
  //Simulación Real Láser
	fechaHoraMontaje: string;
	fechaHoraDesmontaje: string;
	numSimuladores: number;
	usoEstacionSeg: string;
  //Otros recursos
  otrosDatosEspecificos: string;

  constructor() {}

  }
