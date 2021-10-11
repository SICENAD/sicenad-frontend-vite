import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdge } from '@fortawesome/free-brands-svg-icons';
import { faQuestionCircle, faSnowflake } from '@fortawesome/free-regular-svg-icons';
import { faBars, faBomb, faBook, faBusinessTime, faCalendarAlt, faCloudSun, faEdit, faFire, faFolderOpen, faFolderPlus, faGlobe, faHome, faLink, faMap, faSearchLocation, faTree, faUserCog, faUsers } from '@fortawesome/free-solid-svg-icons';
import { PrincipalService } from 'src/app/principal-cenad/service/principal.service';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { CenadImpl } from 'src/app/superadministrador/models/cenad-impl';

@Component({
  selector: 'app-header-principal',
  templateUrl: './header-principal.component.html',
  styleUrls: ['./header-principal.component.css']
})
export class HeaderPrincipalComponent implements OnInit {

  // Fortaswesome
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
  //
  nombreCenad: string = "";
  cenad: Cenad = new CenadImpl();
  idCenad: string = "";
  idCenadZaragoza: string = "";
  isAutenticado: boolean = false;
  isCenadZaragoza: boolean = false;
  cenads: Cenad[] = [];
  cenadsFiltro: Cenad[] = [];

  constructor(private principalService: PrincipalService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCenad();
    // realiza el proceso de carga de todos los CENAD,s/CMT,s
    // y comprueba si el CENAD/CMT seleccionado en el home es el de zaragoza
    this.cargarCenads();
  }

  // Captura el idCenad pasado como parámetro en la barra de navegación
  capturarIdBarraNavegacion(): void {
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
  }

  // Hace una llamada a la API y carga el CENAD/CMT cuyo id es pasado como parámetro desde la barra de navegación
  cargarCenad(): void {
    this.capturarIdBarraNavegacion();
    this.principalService.getCenad(this.idCenad).subscribe(response => {
        this.cenad = this.principalService.mapearCenad(response);
        this.nombreCenad = this.cenad.nombre;
      });
  }


   //this.cargarCenads();
    // para solucionar el problema de la ejecución asíncrona
    //setTimeout(()=> {
   // this.buscarIdCenadZaragoza();
   // this.comprobarCenadZaragoza();
  //  }, 500);


  // función que carga los diferentes CENAD,s/CMT,s de la API
  cargarCenads(): void {
    this.principalService.getCenads().subscribe((response) => {
      this.cenads = this.principalService.extraerCenads(response);
     // console.log('cargarCenads');
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
    //console.log('buscarIdCenadZaragoza');
  }

  // Para ocultar menú ampliado de meteorología y vistas ACMT
  comprobarCenadZaragoza(): void {
    if (this.idCenadZaragoza == this.idCenad) {
      this.isCenadZaragoza = true;
    }
    //console.log('comprobarCenadZaragoza');
  }

}



