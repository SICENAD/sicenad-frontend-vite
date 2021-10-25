import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Unidad } from 'src/app/unidades/models/unidad';
import { UsuarioNormalImpl } from '../../models/usuarioNormal-impl';
import { UsuarioNormalService } from '../../service/usuarioNormal.service';

@Component({
  selector: 'app-usuarioNormal-ficha',
  templateUrl: './usuarioNormal-ficha.component.html',
  styleUrls: ['./usuarioNormal-ficha.component.css']
})
export class UsuarioNormalFichaComponent implements OnInit {
  //variable que trae del otro componente el usuario normal
  @Input() usuarioNormal: UsuarioNormalImpl;
  //variables que emitiran al otro componente los eventos para editarlo/eliminarlo
  @Output() usuarioNormalEliminar = new EventEmitter<UsuarioNormalImpl>();
  @Output() usuarioNormalEditar = new EventEmitter<UsuarioNormalImpl>();
  //variable para cargar todas las unidades
  unidades: Unidad[] = [];
  //variables para poder mostrar el valor inicial de la unidad en el campo select
  unidadSeleccionada: string;

  constructor(
    private usuarioNormalService: UsuarioNormalService) { }

  ngOnInit(): void {
     //rescata de la BD las unidades
     this.usuarioNormalService.getUnidades().subscribe((response) => this.unidades = this.usuarioNormalService.extraerUnidades(response));
    //asigna los valores seleccionados a los select de los campos del recurso
    this.actualizarNgModels();
  }

  //metodo para emitir el usuario a eliminar
  eliminar(): void {
    this.usuarioNormalEliminar.emit(this.usuarioNormal);
  }

  //metodo para emitir el usuario a editar
  editar(): void {
    this.usuarioNormal.unidad = this.unidadSeleccionada;
    this.usuarioNormalEditar.emit(this.usuarioNormal);
  }

    //metodo para poder mostrar en los select los valores seleccionados
    actualizarNgModels(): void {
      this.unidadSeleccionada = this.usuarioNormal.unidad.url;
    }
}