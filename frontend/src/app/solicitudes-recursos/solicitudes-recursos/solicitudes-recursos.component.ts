import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import { SolicitudRecurso } from '../models/solicitud-recurso';
import { SolicitudRecursoService } from '../service/solicitud-recurso.service';

@Component({
  selector: 'app-solicitudes-recursos',
  templateUrl: './solicitudes-recursos.component.html',
  styleUrls: ['./solicitudes-recursos.component.css']
})
export class SolicitudesRecursosComponent implements OnInit {

  //icono FontAwesome
  faVista = faGlasses;
  //id del Cenad
  idCenad: string = "";
  //id de la solicitud
  idSolicitud: string = "";
  //si un usuario esta autenticado
  isAutenticado: boolean = false;
  //si un usuario es administrador
  isAdministrador: boolean = false;
  //si un usuario es gestor
  isGestor: boolean = false;
  //si un usuario es normal
  isUserNormal: boolean = false;
  //arrays de las solicitudes
  //Validadas
  solicitudesValidadas: SolicitudRecurso[] = [];
  //Solicitadas
  solicitudesSolicitadas: SolicitudRecurso[] = [];
  //Rechazadas
  solicitudesRechazadas: SolicitudRecurso[] = [];
  //Canceladas
  solicitudesCanceladas: SolicitudRecurso[] = [];
  //Borrador
  solicitudesBorrador: SolicitudRecurso[] = [];
  //variables estáticas
  //solicitudes de un Cenad
  static solicitudesCenad: SolicitudRecurso[] = [];
  //estado de una solicitud, utilizada para realizar los filtros
  static estadoSolicitud: string = "";

  constructor(private solicitudService: SolicitudRecursoService,
    private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.inicio();
    this.comprobarUser();
    this.filtrarSolicitudes();
  }

  inicio(): void {
    //captura el parametro id del Cenad desde la barra de navegación
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
  }

  //método que comprueba el rol del usuario logeado en el sistema
  comprobarUser(): void {
    this.isAutenticado = sessionStorage.isLogged;
    if (this.isAutenticado) {
      if (sessionStorage.isAdmin == "true" && this.idCenad == sessionStorage.idCenad) {
        this.isAdministrador = true;
        } else if (sessionStorage.isGestor == "true" && this.idCenad == sessionStorage.idCenad) {
          this.isGestor = true;
            } else if (sessionStorage.isNormal == "true") {
              this.isUserNormal = true;
            }
    }
  }

  filtrarSolicitudes(): void {
    //obtiene un array de las solicitudes de un Cenad y posteriormente filtra este array:
    //por el usuario logeado (Administrador: todas las solicitudes de su Cenad, Gestor: todas las de su recurso, Usuario Normal: las de su Unidad)
    //por el estado de la solicitud
    //generando un array por cada estado (Validada, Solicitada, Rechazada, Cancelada, Borrador)
    this.solicitudService.getSolicitudesDeCenad(this.idCenad).subscribe((response) => {
      SolicitudesRecursosComponent.solicitudesCenad = this.solicitudService.extraerSolicitudes(response);
      setTimeout(() => {
        //si el usuario logeado es el administrador del Cenad
        if (this.isAdministrador) {
          this.solicitudesValidadas = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Validada').sort(function (a, b): number {
            return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
          }).slice(0, 5);
          this.solicitudesSolicitadas = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Solicitada').sort(function (a, b): number {
            return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
          }).slice(0, 5);
          this.solicitudesRechazadas = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Rechazada').sort(function (a, b): number {
            return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
          }).slice(0, 5);
          this.solicitudesCanceladas = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Cancelada').sort(function (a, b): number {
            return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
          }).slice(0, 5);
          this.solicitudesBorrador = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Borrador').sort(function (a, b): number {
            return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
          }).slice(0, 5);
          //si el usuario logeado es el normal
        } else if (this.isUserNormal) {
          this.solicitudesValidadas = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Validada'
            && s.usuarioNormal.unidad.idUnidad == sessionStorage.idUnidad).sort(function (a, b): number {
              return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
            }).slice(0, 5);
          this.solicitudesSolicitadas = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Solicitada'
            && s.usuarioNormal.unidad.idUnidad == sessionStorage.idUnidad).sort(function (a, b): number {
              return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
            }).slice(0, 5);
          this.solicitudesRechazadas = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Rechazada'
            && s.usuarioNormal.unidad.idUnidad == sessionStorage.idUnidad).sort(function (a, b): number {
              return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
            }).slice(0, 5);
          this.solicitudesCanceladas = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Cancelada'
            && s.usuarioNormal.unidad.idUnidad == sessionStorage.idUnidad).sort(function (a, b): number {
              return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
            }).slice(0, 5);
          this.solicitudesBorrador = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Borrador'
            && s.usuarioNormal.unidad.idUnidad == sessionStorage.idUnidad).sort(function (a, b): number {
              return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
            }).slice(0, 5);
          //si el usuario logeado es un gestor
        } else if (this.isGestor) {
          this.solicitudesValidadas = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Validada'
            && s.recurso.usuarioGestor.idUsuario == sessionStorage.idUsuario).sort(function (a, b): number {
              return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
            }).slice(0, 5);
          this.solicitudesSolicitadas = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Solicitada'
            && s.recurso.usuarioGestor.idUsuario == sessionStorage.idUsuario).sort(function (a, b): number {
              return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
            }).slice(0, 5);
          this.solicitudesRechazadas = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Rechazada'
            && s.recurso.usuarioGestor.idUsuario == sessionStorage.idUsuario).sort(function (a, b): number {
              return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
            }).slice(0, 5);
          this.solicitudesCanceladas = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Cancelada'
            && s.recurso.usuarioGestor.idUsuario == sessionStorage.idUsuario).sort(function (a, b): number {
              return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
            }).slice(0, 5);
          this.solicitudesBorrador = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Borrador'
            && s.recurso.usuarioGestor.idUsuario == sessionStorage.idUsuario).sort(function (a, b): number {
              return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
            }).slice(0, 5);
        }
      }, 1000);
    });
  }


  //método que se ejecuta al hacer click sobre "Ver Todas"
  //asigna a la variable estática estadoSolicitud el valor del estado de la solicitud donde se ha realizado click
  //y redirecciona a la página solicitudesTodas
  verTodas(tipo: string): void {
    SolicitudesRecursosComponent.estadoSolicitud = tipo;
    this.router.navigate([`principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}/solicitudesTodas/${this.idCenad}`]);
  }
}
