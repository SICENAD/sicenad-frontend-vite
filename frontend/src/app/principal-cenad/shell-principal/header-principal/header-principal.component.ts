import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdge } from '@fortawesome/free-brands-svg-icons';
import { faQuestionCircle, faSnowflake } from '@fortawesome/free-regular-svg-icons';
import { faBars, faBomb, faBook, faBusinessTime, faCalendarAlt, faCloudSun, faEdit, faFire, faFolderOpen, faFolderPlus, faGlobe, faHome, faLink, faMap, faSearchLocation, faSitemap, faTree, faUserCog, faUsers } from '@fortawesome/free-solid-svg-icons';
import { PrincipalService } from 'src/app/principal-cenad/service/principal.service';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { CenadImpl } from 'src/app/superadministrador/models/cenad-impl';
import { UsuarioAdministrador } from 'src/app/usuarios/models/usuarioAdministrador';
import { UsuarioAdministradorImpl } from 'src/app/usuarios/models/usuarioAdministrador-impl';
import { UsuarioGestor } from 'src/app/usuarios/models/usuarioGestor';
import { UsuarioGestorImpl } from 'src/app/usuarios/models/usuarioGestor-impl';
import { UsuarioNormal } from 'src/app/usuarios/models/usuarioNormal';
import { UsuarioNormalImpl } from 'src/app/usuarios/models/usuarioNormal-impl';

@Component({
  selector: 'app-header-principal',
  templateUrl: './header-principal.component.html',
  styleUrls: ['./header-principal.component.css']
})
export class HeaderPrincipalComponent implements OnInit {

  //variables de iconos varios
  faRecurso = faFolderOpen;
  faConsultar = faEdge;
  faMas = faFolderPlus;
  faCalendario = faCalendarAlt;
  faSolicitar = faBusinessTime;
  faHome = faHome;
  faArtefacto = faBomb;
  faInfo = faQuestionCircle;
  faVista = faSearchLocation;
  faEnlace = faLink;
  faNormativa = faBook;
  faMeteo = faSnowflake;
  faCartografia = faMap;
  faMenu = faBars;
  faUser = faUserCog;
  faPrevision = faCloudSun;
  faIPI = faFire;
  faMetozonas = faGlobe;
  faUsuarios = faUsers;
  faCategorias = faTree;
  faPeticiones = faEdit;
  faUnidades =faSitemap;
  //variable para mostrar el nombre del cenad
  nombreCenad: string = "";
  //variable que guarda el cenad seleccionado
  cenad: Cenad = new CenadImpl();
  //variable para rescatar el id del cenad de la barra de navegacion
  idCenad: string = "";
  //variable que guarda el id del cenad de la provincia de zaragoza
  idCenadZaragoza: string = "";
  //variable que indica si el cenad seleccionado es el cenad SG
  isCenadZaragoza: boolean = false;
  //variable que guarda todos los cenads
  cenads: Cenad[] = [];
  // variables estáticas para logging...
  isAutenticado: boolean = false;
  static userAdminLogeado: UsuarioAdministrador = new UsuarioAdministradorImpl();
  static userGestorLogeado: UsuarioGestor = new UsuarioGestorImpl();
  static userNormalLogeado: UsuarioNormal = new UsuarioNormalImpl();

  constructor(private principalService: PrincipalService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    //carga el cenad seleccionado
    this.cargarCenad();
    // realiza el proceso de carga de todos los CENAD,s/CMT,s y comprueba si el CENAD/CMT seleccionado en el home es el de zaragoza
    this.cargarCenads();
  }

  // Captura el idCenad pasado como parámetro en la barra de navegación
  capturarIdBarraNavegacion(): void {
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
  }

  // Rescata de la BD el CENAD/CMT cuyo id es pasado como parámetro desde la barra de navegación
  cargarCenad(): void {
    this.capturarIdBarraNavegacion();
    this.principalService.getCenad(this.idCenad).subscribe(response => {
        this.cenad = this.principalService.mapearCenad(response);
        this.nombreCenad = this.cenad.nombre;
      });
  }

  // metodo que carga los diferentes CENAD,s/CMT,s y comprueba si es el de zaragoza, ya que tiene algun enlace especial a mostrar
  cargarCenads(): void {
    this.principalService.getCenads().subscribe((response) => {
      this.cenads = this.principalService.extraerCenads(response);
      this.buscarIdCenadZaragoza();
      this.comprobarCenadZaragoza();
    });
  }

  // si el idProvincia del CENAD/CMT es el de Zaragoza (50), actualiza el valor de la variable idCenadZaragoza
  buscarIdCenadZaragoza(): void {
    this.cenads.forEach(c => {
      if (c.provincia == 50) {
        this.idCenadZaragoza = c.idCenad;
      }
    });
  }

  // Para ocultar menú ampliado de meteorología y vistas ACMT(es especial del CENAD SG)
  comprobarCenadZaragoza(): void {
    if (this.idCenadZaragoza == this.idCenad) {
      this.isCenadZaragoza = true;
    }
  }
}