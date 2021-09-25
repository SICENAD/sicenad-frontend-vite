import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styles: []
})
export class CategoriaComponent implements OnInit {

  @Input() categoria: Categoria;
  @Output() categoriaSeleccionada = new EventEmitter<Categoria>();

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.getCategoriaPadre(this.categoria).subscribe((response) => this.categoria.categoriaPadre = this.categoriaService.mapearCategoria(response));
  }
}



