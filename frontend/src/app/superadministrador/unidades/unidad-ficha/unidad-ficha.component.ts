import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuarioNormalImpl } from '../../models/usuarioNormal-impl';

@Component({
  selector: 'app-unidad-ficha',
  templateUrl: './unidad-ficha.component.html',
  styleUrls: ['./unidad-ficha.component.css']
})
export class UnidadFichaComponent implements OnInit {
  //variable que trae del otro componente el usuario normal
  @Input() usuarioNormal: UsuarioNormalImpl;
  //variables que emitiran al otro componente los eventos para editarlo/eliminarlo
  @Output() usuarioNormalEliminar = new EventEmitter<UsuarioNormalImpl>();
  @Output() usuarioNormalEditar = new EventEmitter<UsuarioNormalImpl>();

  constructor() {}

  ngOnInit(): void {}

  //metodo para emitir el usuario a eliminar
  eliminar(): void {
    this.usuarioNormalEliminar.emit(this.usuarioNormal);
  }

  //metodo para emitir el usuario a editar
  editar(): void {
    this.usuarioNormalEditar.emit(this.usuarioNormal);
  }
}