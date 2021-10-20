import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../../models/categoria';
import { CategoriaImpl } from '../../models/categoria-impl';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-categoria-ficha',
  templateUrl: './categoria-ficha.component.html',
  styleUrls: ['./categoria-ficha.component.css']
})
export class CategoriaFichaComponent implements OnInit {
  //variable para recuperar el id del CENAD/CMT
  idCenad: string = "";
  //variable que me comunica del otro componente la categoria a ver/editar
  @Input() categoria: CategoriaImpl;
  //variables que comunican al otro componente el evento para editar/eliminar la categoria
  @Output() categoriaEliminar = new EventEmitter<CategoriaImpl>();
  @Output() categoriaEditar = new EventEmitter<CategoriaImpl>();
  //variable en la que meteremos las categorias de este CENAD/CMT para poder seleccionarlas como categoria padre
  categorias: Categoria[] = [];
  //variable que se utiliza como variable intermedia para que se muestre en el select la opcion elegida inicialmente
  categoriaPadreSeleccionada: string = "";

  constructor(
    private categoriaService: CategoriaService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //recuperamos el id del CENAD de la barra de navegacion
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    //metemos en la variable todas las categorias del cenad, para seleccionar la categoria padre
    this.categoriaService.getCategoriasDeCenad(this.idCenad).subscribe((response) => this.categorias = this.categoriaService.extraerCategorias(response));
    //actualizamos los valores iniciales de los select, en este caso el de categoria padre
    this.actualizarNgModels();
  }

  //metodo que actualiza la variable intermedi que permite mostrar el valor de la categoria padre en el select
  actualizarNgModels(): void {
    if (this.categoria.categoriaPadre) {
      this.categoriaPadreSeleccionada = this.categoria.categoriaPadre.url;
    }else {
      this.categoriaPadreSeleccionada = "";
    }
  }

  //metodo que emite el evento al otro componente para eliminar la categoria
  eliminar(): void {
    this.categoriaEliminar.emit(this.categoria);
  }

  //metodo que emite el evento al otro componente para editar la categoria
  editar(): void {
    this.categoria.categoriaPadre = this.categoriaPadreSeleccionada;
    this.categoriaEditar.emit(this.categoria);
  }
}
