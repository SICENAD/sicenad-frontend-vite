import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriaFicheroImpl } from '../../models/categoriaFichero-impl';

@Component({
  selector: 'app-categoriaFichero-ficha',
  templateUrl: './categoriaFichero-ficha.component.html',
  styleUrls: ['./categoriaFichero-ficha.component.css']
})
export class CategoriaFicheroFichaComponent implements OnInit {

  @Input() categoriaFichero: CategoriaFicheroImpl;
  @Output() categoriaFicheroEliminar = new EventEmitter<CategoriaFicheroImpl>();
  @Output() categoriaFicheroEditar = new EventEmitter<CategoriaFicheroImpl>();

  constructor() { }
    
  ngOnInit(): void {
  }

  eliminar(): void {
    this.categoriaFicheroEliminar.emit(this.categoriaFichero);
  }

  editar(): void {
    this.categoriaFicheroEditar.emit(this.categoriaFichero);
  }
}