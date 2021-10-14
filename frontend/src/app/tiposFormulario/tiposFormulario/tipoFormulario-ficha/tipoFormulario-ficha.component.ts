import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoFormularioImpl } from '../../models/tipoFormulario-impl';

@Component({
  selector: 'app-tipoFormulario-ficha',
  templateUrl: './tipoFormulario-ficha.component.html',
  styleUrls: ['./tipoFormulario-ficha.component.css']
})
export class TipoFormularioFichaComponent implements OnInit {

  @Input() tipoFormulario: TipoFormularioImpl;
  @Output() tipoFormularioEliminar = new EventEmitter<TipoFormularioImpl>();
  @Output() tipoFormularioEditar = new EventEmitter<TipoFormularioImpl>();

  constructor() { }
    
  ngOnInit(): void {
  }

  eliminar(): void {
    this.tipoFormularioEliminar.emit(this.tipoFormulario);
  }

  editar(): void {
    this.tipoFormularioEditar.emit(this.tipoFormulario);
  }
}