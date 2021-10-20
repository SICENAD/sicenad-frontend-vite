import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Unidad } from '../models/unidad';
import { UnidadImpl } from '../models/unidad-impl';
import { UnidadService } from '../service/unidad.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {
  //variable que recoge todas las unidades
  unidades: Unidad[] = [];
  //variable que relaciona cada unidad con sus datos
  unidadVerDatos: Unidad;
  //variable del icono "volver"
  faVolver = faArrowAltCircleLeft;

  constructor(
    private unidadService: UnidadService,
    private router: Router) { }

  ngOnInit(): void {
    //recoge en la variable todas las unidades
    this.unidadService.getUnidades().subscribe((response) => this.unidades = this.unidadService.extraerUnidades(response));
  }
  
  //metodo para poder mostrar los datos de la unidad
  verDatos(unidad: Unidad): void {
    this.unidadVerDatos = unidad;
  }
  
  //metodo para eliminar una unidad y volver al listado
  onUnidadEliminar(unidad: UnidadImpl): void {
    this.unidadService.delete(unidad).subscribe(response => {
      console.log(`He borrado la unidad ${unidad.nombre}`);
      this.router.navigate(['/unidades']);
    });
  }

  //metodo para editar una unidad y volver al listado
  onUnidadEditar(unidad: UnidadImpl): void {
    this.unidadService.update(unidad).subscribe(response => {
      console.log(`He actualizado la unidad ${unidad.nombre}`);
      this.router.navigate(['/unidades']);
    });
  }
}