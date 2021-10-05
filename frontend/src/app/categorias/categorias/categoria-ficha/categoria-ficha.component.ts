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

  idCenad: string = "";
  @Input() categoria: CategoriaImpl;
  @Output() categoriaEliminar = new EventEmitter<CategoriaImpl>();
  @Output() categoriaEditar = new EventEmitter<CategoriaImpl>();
  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService, 
    private activateRoute: ActivatedRoute) { }
    
  ngOnInit(): void {
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    this.categoriaService.getCategoriasDeCenad(this.idCenad).subscribe((response) => this.categorias = this.categoriaService.extraerCategorias(response));  }

  eliminar(): void {
    this.categoriaEliminar.emit(this.categoria);
  }

  editar(): void {
    this.categoriaEditar.emit(this.categoria);
  }
}