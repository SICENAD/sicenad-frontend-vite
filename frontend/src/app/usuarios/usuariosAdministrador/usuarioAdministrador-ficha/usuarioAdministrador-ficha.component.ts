import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { UsuarioAdministradorImpl } from '../../models/usuarioAdministrador-impl';
import { UsuarioAdministradorService } from '../../service/usuarioAdministrador.service';

@Component({
  selector: 'app-usuarioAdministrador-ficha',
  templateUrl: './usuarioAdministrador-ficha.component.html',
  styleUrls: ['./usuarioAdministrador-ficha.component.css']
})
export class UsuarioAdministradorFichaComponent implements OnInit {
  //variable que trae del otro componente el usuarioAdministrador
  @Input() usuarioAdministrador: UsuarioAdministradorImpl;
  //variables que emitiran al otro componente los eventos para editarlo/eliminarlo
  @Output() usuarioAdministradorEliminar = new EventEmitter<UsuarioAdministradorImpl>();
  @Output() usuarioAdministradorEditar = new EventEmitter<UsuarioAdministradorImpl>();
  //variable para cargar todas los cenads
  cenads: Cenad[] = [];
  //variables para poder mostrar el valor inicial del cenad en el campo select
  cenadSeleccionado: string;

  constructor(
    private usuarioAdministradorService: UsuarioAdministradorService) { }

  ngOnInit(): void {
     //rescata de la BD los cenads
     this.usuarioAdministradorService.getCenads().subscribe((response) => this.cenads = this.usuarioAdministradorService.extraerCenads(response));
    //asigna los valores seleccionados a los select de los campos del usuario
    this.actualizarNgModels();
  }

  //metodo para emitir el usuario a eliminar
  eliminar(): void {
    this.usuarioAdministradorEliminar.emit(this.usuarioAdministrador);
  }

  //metodo para emitir el usuario a editar
  editar(): void {
    this.usuarioAdministrador.cenad = this.cenadSeleccionado;
    this.usuarioAdministradorEditar.emit(this.usuarioAdministrador);
  }

    //metodo para poder mostrar en los select los valores seleccionados
    actualizarNgModels(): void {
      this.cenadSeleccionado = this.usuarioAdministrador.cenad.url;
    }
}