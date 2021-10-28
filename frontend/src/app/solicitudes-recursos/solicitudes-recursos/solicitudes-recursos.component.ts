import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import { HeaderPrincipalComponent } from 'src/app/principal-cenad/shell-principal/header-principal/header-principal.component';
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
  isAutenticado: boolean = true;
  //si un usuario es administrador
  isAdministrador: boolean = false;
  //si un usuario es gestor
  isGestor: boolean = false;
  //si un usuario es normal
  isUserNormal: boolean = true;
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
  }

  inicio(): void {
    //captura el parametro id del Cenad desde la barra de navegación
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    //obtiene un array de las solicitudes de un Cenad y posteriormente filtra este array por el estado de la solicitud
    //generando un array por cada estado (Validada, Solicitada, Rechazada, Cancelada, Borrador)
    this.solicitudService.getSolicitudesDeCenad(this.idCenad).subscribe((response)=> {
      SolicitudesRecursosComponent.solicitudesCenad = this.solicitudService.extraerSolicitudes(response);
      this.solicitudesValidadas = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Validada').sort(function(a, b):number {
          return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
        }).slice(0, 5);
      this.solicitudesSolicitadas = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Solicitada').sort(function(a, b):number {
        return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
       }).slice(0, 5);
      this.solicitudesRechazadas = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Rechazada').sort(function(a, b):number {
        return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
       }).slice(0, 5);
      this.solicitudesCanceladas = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Cancelada').sort(function(a, b):number {
        return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
       }).slice(0, 5);
       this.solicitudesBorrador = SolicitudesRecursosComponent.solicitudesCenad.filter(s => s.estado == 'Borrador').sort(function(a, b):number {
        return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
       }).slice(0, 5);
    });

  }

  //método que comprueba el rol del usuario logeado en el sistema
  comprobarUser(): void {
    if (this.isAutenticado) {
      if (HeaderPrincipalComponent.userAdminLogeado) {
        this.isAdministrador = true;
      } else if (HeaderPrincipalComponent.userGestorLogeado) {
            this.isGestor = true;
          } else if (HeaderPrincipalComponent.userNormalLogeado) {
                  this.isUserNormal = true;
                }
    }
  }

  //método que se ejecuta al hacer click sobre "Ver Todas"
  //asigna a la variable estática estadoSolicitud el valor del estado de la solicitud donde se ha realizado click
  //y redirecciona a la página solicitudesTodas
  verTodas(tipo: string): void {
    SolicitudesRecursosComponent.estadoSolicitud = tipo;
    this.router.navigate([`principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}/solicitudesTodas/${this.idCenad}`]);
  }



}
