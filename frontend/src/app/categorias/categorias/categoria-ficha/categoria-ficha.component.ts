import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { CategoriaImpl } from '../../models/categoria-impl';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-categoria-ficha',
  templateUrl: './categoria-ficha.component.html',
  styles: []
})
export class CategoriaFichaComponent implements OnInit {

  @Input() categoria: CategoriaImpl;
  @Output() categoriaEliminar = new EventEmitter<CategoriaImpl>();
  @Output() categoriaEditar = new EventEmitter<CategoriaImpl>();
  categorias: Categoria[] = [];


  constructor(
    private categoriaService: CategoriaService) { }
    
  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe((response) => this.categorias = this.categoriaService.extraerCategorias(response));
  }

  eliminar(): void {
    this.categoriaEliminar.emit(this.categoria);
  }

  editar(): void {
    this.categoriaEditar.emit(this.categoria);
  }
}