import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  //variable boolean que dice si es administrador o no 
  isAdministrador: boolean = false;
  //variable para capturar el idCenad en el caso de que el que acceda sea el administrador de un cenad
  idCenad: string = "";
  //variable que recogera el string para el routerLink de volver atras en funcion de donde viene
  volver: string = '';
  //variable que recogera el string para el routerLink de nueva unidad en funcion de donde viene
  nuevaUnidad: string = '';
  //variable que recoge todas las unidades
  unidades: Unidad[] = [];
  //variable que relaciona cada unidad con sus datos
  unidadVerDatos: Unidad;
  //variable del icono "volver"
  faVolver = faArrowAltCircleLeft;

  constructor(
    private unidadService: UnidadService,
    private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //captura el id del cenad de la barra de navegacion
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    this.isAdministrador = (this.idCenad !==undefined);
    //recoge del local storage en la variable todas las unidades
    this.unidades = JSON.parse(localStorage.unidades);
    if (this.isAdministrador) {//la variable volver nos llevara a "superadministrador"o a "ppalCenad"
      //aqui debo sacar el idCenad del administrador que esta logueado
      this.volver = `/principalCenad/${this.idCenad}`;
      this.nuevaUnidad = `/principalCenad/${this.idCenad}/unidades/${this.idCenad}/formulario/${this.idCenad}`;
    } else {
      this.volver = `/superadministrador`;
      this.nuevaUnidad = `/unidades/formulario`;
    }
  }

  //metodo para poder mostrar los datos de la unidad
  verDatos(unidad: Unidad): void {
    this.unidadVerDatos = unidad;
  }
  
  //metodo para eliminar una unidad y volver al listado
  onUnidadEliminar(unidad: UnidadImpl): void {
    let ruta: string = (this.idCenad !==undefined) ? `principalCenad/${this.idCenad}/unidades/${this.idCenad}` : 'unidades'
    this.unidadService.delete(unidad).subscribe(response => {
      //actualizo el local storage
      this.unidadService.getUnidades().subscribe((response) => {
        localStorage.unidades = JSON.stringify(this.unidadService.extraerUnidades(response));
        console.log(`He borrado la unidad ${unidad.nombre}`);
        this.router.navigate([ruta]);
      });
    });
  }

  //metodo para editar una unidad y volver al listado
  onUnidadEditar(unidad: UnidadImpl): void {
    let ruta: string = (this.idCenad !==undefined) ? `principalCenad/${this.idCenad}/unidades/${this.idCenad}` : 'unidades'
    this.unidadService.update(unidad).subscribe(response => {
      //actualizo el local storage
      this.unidadService.getUnidades().subscribe((response) => {
        localStorage.unidades = JSON.stringify(this.unidadService.extraerUnidades(response));
        console.log(`He actualizado la unidad ${unidad.nombre}`);
        this.router.navigate([ruta]);
      });
    });
  }
}