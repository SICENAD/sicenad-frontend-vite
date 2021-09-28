import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoRecurso } from '../models/tipoRecurso';
import { TipoRecursoImpl } from '../models/tipoRecurso-impl';
import { TipoRecursoService } from '../service/tipoRecurso.service';

@Component({
  selector: 'app-tipoRecurso-form',
  templateUrl: './tipoRecurso-form.component.html',
  styleUrls: ['./tipoRecurso-form.component.css']
})
export class TipoRecursoFormComponent implements OnInit {

  tipoRecurso: TipoRecursoImpl = new TipoRecursoImpl();
  tipoRecursos: TipoRecurso[] = [];

  constructor(
    private tipoRecursoService: TipoRecursoService,
    private router: Router) { }


  ngOnInit() {
    alert('Deberas añadir el componente Peticion9 al módulo de peticiones... ');
  }

  crearTipoRecurso(): void {
    this.tipoRecursoService.create(this.tipoRecurso).subscribe((response) => {
      console.log(`He creado el Tipo de Recurso ${this.tipoRecurso.nombre}`);
      alert('Deberas añadir el componente Peticion9 al módulo de peticiones... ');
      this.router.navigate(['/tiposRecurso']);
    });
  }

}
