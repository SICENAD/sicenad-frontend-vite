import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { UnidadImpl } from '../models/unidad-impl';
import { UnidadService } from '../service/unidad.service';

@Component({
  selector: 'app-unidad-form',
  templateUrl: './unidad-form.component.html',
  styleUrls: ['./unidad-form.component.css']
})
export class UnidadFormComponent implements OnInit {
  //variable para guardar la nueva unidad
  unidad: UnidadImpl = new UnidadImpl();
  //variable del icono "volver"
  faVolver = faArrowAltCircleLeft;

  constructor(
    private unidadService: UnidadService,
    private router: Router) { }

  ngOnInit() {
  }

  //metodo que crea una unidad y vuelve al listado de unidades
  crearUnidad(): void {
    this.unidadService.create(this.unidad).subscribe((response) => {
      console.log(`He creado la unidad ${this.unidad.nombre}`);
      this.router.navigate(['/unidades']);
    });
  }
}