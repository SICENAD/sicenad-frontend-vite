import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuarioNormalImpl } from '../../models/usuarioNormal-impl';

@Component({
  selector: 'app-unidad-ficha',
  templateUrl: './unidad-ficha.component.html',
  styles: []
})
export class UnidadFichaComponent implements OnInit {

  @Input() usuarioNormal: UsuarioNormalImpl;
  @Output() usuarioNormalEliminar = new EventEmitter<UsuarioNormalImpl>();
  @Output() usuarioNormalEditar = new EventEmitter<UsuarioNormalImpl>();


  constructor() { }

  ngOnInit(): void {
  }

  eliminar(): void {
    this.usuarioNormalEliminar.emit(this.usuarioNormal);
  }

  editar(): void {
    this.usuarioNormalEditar.emit(this.usuarioNormal);
  }
}