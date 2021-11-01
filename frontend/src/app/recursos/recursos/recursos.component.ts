import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/categorias/models/categoria';
import { Recurso } from '../models/recurso';
import { RecursoImpl } from '../models/recurso-impl';
import { RecursoService } from '../service/recurso.service';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent implements OnInit {
  //variable para capturar el id del cenad de la barra de navegacion
  idCenad: string = "";
  //variable con todos los recursos del cenad
  recursos: Recurso[] = [];
  //variable para trasferir los datos del recurso
  recursoVerDatos: Recurso;
  //variable con las categorias que se van filtrando
  categoriasFiltradas: Categoria[] = [];
  //variable con los recursos tras los filtros
  recursosFiltrados: Recurso[] = [];
  //variable con la categoria seleccionada en el filtro
  categoriaSeleccionada: Categoria;

  constructor(
    private recursoService: RecursoService,
    private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //captura el id del cenad de la barra de navegacion
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    //rescatamos del local storage los recursos de ese cenad
    this.recursos = JSON.parse(localStorage.getItem(`recursos_${this.idCenad}`));
    //recupera del local storage las categorias padre de ese cenad, para comenzar el filtrado
    this.categoriasFiltradas = JSON.parse(localStorage.getItem(`categoriasPadre_${this.idCenad}`));
  }

  //metodo para transferir los datos del recurso al otro componente
  verDatos(recurso: Recurso): void {
    this.recursoVerDatos = recurso;
  }

  //metodo para eliminar un recurso y volver al listado de recursos de ese cenad
  onRecursoEliminar(recurso: RecursoImpl): void {
    this.recursoService.delete(recurso).subscribe(response => {
      //actualizo local storage
      this.recursoService.getRecursosDeCenad(this.idCenad).subscribe((response) => {
        localStorage.setItem(`recursos_${this.idCenad}`, JSON.stringify(this.recursoService.extraerRecursos(response)));
        console.log(`He borrado el recurso ${recurso.nombre}`);
        this.router.navigate([`/principalCenad/${this.idCenad}/recursos/${this.idCenad}`]);
      });
    });
  }

  //metodo para editar un recurso y volver al listado de recursos de ese cenad
  onRecursoEditar(recurso: RecursoImpl): void {
    this.recursoService.update(recurso).subscribe(response => {
      //actualizo local storage
      this.recursoService.getRecursosDeCenad(this.idCenad).subscribe((response) => {
        localStorage.setItem(`recursos_${this.idCenad}`, JSON.stringify(this.recursoService.extraerRecursos(response)));
        console.log(`He actualizado el recurso ${recurso.nombre}`);
        this.router.navigate([`/principalCenad/${this.idCenad}/recursos/${this.idCenad}`]);
      });
    });
  }

  //metodo para filtrar recursivamente las categorias
  filtrar() {
    //rescata de la BD las subcategorias de la categoria seleccionada
    this.recursoService.getSubcategorias(this.categoriaSeleccionada).subscribe((response) =>
      this.categoriasFiltradas = this.recursoService.extraerCategorias(response));
    setTimeout(() => {
      //si la categoria seleccionada no tiene subcategorias muestra los recursos de esa categoria
      if (this.categoriasFiltradas.length === 0) {
    //rescatamos de la BD los recursos de ese cenad de esa categoria seleccionada
        this.recursoService.getRecursosDeCategoria(this.categoriaSeleccionada).subscribe((response) => { 
          if (response._embedded) {//con este condicional elimino el error de consola si no hay ningun recurso
            this.recursos = this.recursoService.extraerRecursos(response);
          }
        });
      } else {//muestra los recursos de sus subcategorias, esten al nivel que esten
              this.recursoService.getRecursosDeSubcategorias(this.categoriaSeleccionada).subscribe((response) => this.recursos = this.recursoService.extraerRecursos(response));
          }
    }, 500);
  }

  //metodo que restea los filtros y regresa al listado de recursos del cenad
  borrarFiltros() {
    //rescata del local storage las categorias padre del cenad
    this.categoriasFiltradas = JSON.parse(localStorage.getItem(`categoriasPadre_${this.idCenad}`));
    //rescatamos del local storage los recursos de ese cenad
    this.recursos = JSON.parse(localStorage.getItem(`recursos_${this.idCenad}`));
    //resetea la categoria seleccionada
    this.categoriaSeleccionada = null;
  }
}