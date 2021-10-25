import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/categorias/models/categoria';
import { Recurso } from 'src/app/recursos/models/recurso';
import { RecursoService } from 'src/app/recursos/service/recurso.service';

@Component({
  selector: 'app-consultaRecursos',
  templateUrl: './consultaRecursos.component.html',
  styleUrls: ['./consultaRecursos.component.css']
})
export class ConsultaRecursosComponent implements OnInit {
  //variable con la que rescatamos de la barra de navegacion el idCenad
  idCenad: string = "";
  //variable en la que se guardan todos los recursos del cenad
  recursos: Recurso[] = [];
  //variable que recoge las categorias del cenad. inicialmente las padre, luego van filtrandose
  categoriasFiltradas: Categoria[] = [];
  //variable que recoge los recursos pertenecientes a las categorias filtradas
  recursosFiltrados: Recurso[] = [];
  //con esta variable vamos mostrando la categoria con la que he filtrado y de ella se sacan subcategorias y recursos
  categoriaSeleccionada: Categoria;

  constructor(
    private recursoService: RecursoService,
    private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //rescatamos el id del Cenad de la barra de navegacion
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    //rescatamos de la BD los recursos de ese cenad
    this.recursoService.getRecursosDeCenad(this.idCenad).subscribe((response) => { 
      if (response._embedded) {//con este condicional elimino el error de consola si no hay ningun recurso
        this.recursos = this.recursoService.extraerRecursos(response);
      }});
    //asignamos a la variable categorias filtradas las categorias padre del cenad, para comenzar a filtrar
    this.recursoService.getCategoriasPadreDeCenad(this.idCenad).subscribe((response) => { 
      if (response._embedded) {//con este condicional elimino el error de consola si no hay ninguna categoria padre
        this.categoriasFiltradas = this.recursoService.extraerCategorias(response);
      }});
  }

  //metodo que filtra por la categoria seleccionada y muestra los recursos de la misma o sus hijas...
  filtrar() {
    //se asigna a la variable de categorias filtradas las subcategorias de la categoria seleccionada
    this.recursoService.getSubcategorias(this.categoriaSeleccionada).subscribe((response) =>
      this.categoriasFiltradas = this.recursoService.extraerCategorias(response));
    setTimeout(() => {
      //si la categoria seleccionada no tiene subcategorias, los recursos a mostrar son los suyos
      if (this.categoriasFiltradas.length === 0) {
        this.recursoService.getRecursosDeCategoria(this.categoriaSeleccionada).subscribe((response) => this.recursos = this.recursoService.extraerRecursos(response));
      }
      else {//los recursos a mostrar son los que tenga cualquier subcategoria de la seleccionada, sea el nivel de subcategoria que sea
        this.recursoService.getRecursosDeSubcategorias(this.categoriaSeleccionada).subscribe((response) => this.recursos = this.recursoService.extraerRecursos(response));
      }
    }, 1000);
  }

  //metodo para resetear los filtros y volver a mostrar todos los recursos del cenad
  borrarFiltros() {
    this.recursoService.getCategoriasPadreDeCenad(this.idCenad).subscribe((response) =>
      this.categoriasFiltradas = this.recursoService.extraerCategorias(response));
    this.recursoService.getRecursosDeCenad(this.idCenad).subscribe((response) => this.recursos = this.recursoService.extraerRecursos(response));
    this.categoriaSeleccionada = null;
  }
}