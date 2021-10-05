import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdge } from '@fortawesome/free-brands-svg-icons';
import { faBusinessTime, faCalendarAlt, faFolderOpen, faLink, faMap } from '@fortawesome/free-solid-svg-icons';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { CenadImpl } from 'src/app/superadministrador/models/cenad-impl';
import { environment } from 'src/environments/environment';
import { PrincipalService } from '../service/principal.service';

@Component({
  selector: 'app-home-principal',
  templateUrl: './home-principal.component.html',
  styleUrls: ['./home-principal.component.css']
})
export class HomePrincipalComponent implements OnInit {

  // Fortaswesome
  faRecurso = faFolderOpen;
  faConsultar = faEdge;
  faCalendario = faCalendarAlt;
  faSolicitar = faBusinessTime;
  faEnlace = faLink;
  faCartografia = faMap;
  //
  cenad: Cenad = new CenadImpl();
  idCenad: string = "";
  src: string = "";
  pathRelativo: string = `${environment.hostSicenad}files/escudos/`;
  escudoCenad: string = "";
  pathImg: string = "";

  constructor(private principalService: PrincipalService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCenad();
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
       this.escudoCenad = this.cenad.escudo;
        this.pathImg = `${this.pathRelativo}${this.escudoCenad}`;
      });
  }
}
