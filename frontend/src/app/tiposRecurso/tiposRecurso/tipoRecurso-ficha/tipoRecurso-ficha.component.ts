import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoRecursoImpl } from '../../models/tipoRecurso-impl';

@Component({
  selector: 'app-tipoRecurso-ficha',
  templateUrl: './tipoRecurso-ficha.component.html',
  styles: []
})
export class TipoRecursoFichaComponent implements OnInit {

  @Input() tipoRecurso: TipoRecursoImpl;
  @Output() tipoRecursoEliminar = new EventEmitter<TipoRecursoImpl>();
  @Output() tipoRecursoEditar = new EventEmitter<TipoRecursoImpl>();


  constructor() { }
    
  ngOnInit(): void {
  }

  eliminar(): void {
    this.tipoRecursoEliminar.emit(this.tipoRecurso);
  }

  editar(): void {
    this.tipoRecursoEditar.emit(this.tipoRecurso);
  }
}