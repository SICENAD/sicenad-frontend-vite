import { Recurso } from "src/app/recursos/models/recurso";
import { UsuarioNormal } from "src/app/usuarios/models/usuarioNormal";

export interface SolicitudCalendario {
    //mapeado a IdSolicitud
    id: string;
    estado: string;
    //mapeado a fechaHoraInicioRecurso
    start: Date; 
    //mapeado a  fechaHoraFinRecurso
	end: Date;
    //mapeado a unidad
    title: string;
    idUnidad: string;
    usuarioNormal: UsuarioNormal | any;
    recurso: Recurso | any;
    //mapeado a la etiqueta de la solicitud
    color: string;
    url: string;
}
