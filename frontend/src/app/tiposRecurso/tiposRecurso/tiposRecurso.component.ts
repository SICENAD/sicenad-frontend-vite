import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { TipoRecurso } from '../models/tipoRecurso';
import { TipoRecursoImpl } from '../models/tipoRecurso-impl';
import { TipoRecursoService } from '../service/tipoRecurso.service';

@Component({
  selector: 'app-tiposRecurso',
  templateUrl: './tiposRecurso.component.html',
  styleUrls: ['./tiposRecurso.component.css']
})
export class TiposRecursoComponent implements OnInit {

  tiposRecurso: TipoRecurso[] = [];
  tipoRecursoVerDatos: TipoRecurso;
  faVolver = faArrowAltCircleLeft;

  constructor(
    private tipoRecursoService: TipoRecursoService,
    private router: Router) { }

    ngOnInit(): void {
      this.tipoRecursoService.getTiposRecurso().subscribe((response) => this.tiposRecurso = this.tipoRecursoService.extraerTiposRecurso(response));
    }
  
    verDatos(tipoRecurso: TipoRecurso): void {
      this.tipoRecursoVerDatos = tipoRecurso;
    }
  
    onTipoRecursoEliminar(tipoRecurso: TipoRecurso): void {
      this.tipoRecursoService.delete(tipoRecurso).subscribe(response => {
        console.log(`He borrado el Tipo de Recurso ${tipoRecurso.nombre}`);
        this.router.navigate(['/tiposRecurso']);
      });
    }
  
    onTipoRecursoEditar(tipoRecurso: TipoRecursoImpl): void {
      this.tipoRecursoService.update(tipoRecurso).subscribe(response => {
        console.log(`He actualizado el Tipo de Recurso ${tipoRecurso.nombre}`);
        this.router.navigate(['/tiposRecurso']);
      });
    }
  }
