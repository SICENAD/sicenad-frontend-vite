import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoFormularioImpl } from '../../models/tipoFormulario-impl';

@Component({
  selector: 'app-tipoFormulario-ficha',
  templateUrl: './tipoFormulario-ficha.component.html',
  styleUrls: ['./tipoFormulario-ficha.component.css']
})
export class TipoFormularioFichaComponent implements OnInit {
  //variable que trae del otro componente el tipo de formulario seleccionado
  @Input() tipoFormulario: TipoFormularioImpl;
  //variables que emiten al otro componente los eventos para eliminar/editar el tipo de formulario
  @Output() tipoFormularioEliminar = new EventEmitter<TipoFormularioImpl>();
  @Output() tipoFormularioEditar = new EventEmitter<TipoFormularioImpl>();

  constructor() {}
    
  ngOnInit(): void {}

  //metodo que emite el evento para eliminar el tipo de formulario
  eliminar(): void {
    this.tipoFormularioEliminar.emit(this.tipoFormulario);
  }

  //metodo que emite el evento para editar el tipo de formulario
  editar(): void {
    this.tipoFormularioEditar.emit(this.tipoFormulario);
  }
}