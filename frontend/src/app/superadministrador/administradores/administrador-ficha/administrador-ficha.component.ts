import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cenad } from '../../models/cenad';
import { UsuarioAdministradorImpl } from '../../models/usuarioAdministrador-impl';
import { CenadService } from '../../service/cenad.service';

@Component({
  selector: 'app-administrador-ficha',
  templateUrl: './administrador-ficha.component.html',
  styles: []
})
export class AdministradorFichaComponent implements OnInit {

  @Input() usuarioAdministrador: UsuarioAdministradorImpl;
  @Output() usuarioAdministradorEliminar = new EventEmitter<UsuarioAdministradorImpl>();
  @Output() usuarioAdministradorEditar = new EventEmitter<UsuarioAdministradorImpl>();
  cenads: Cenad[] = [];



  constructor(private cenadService: CenadService) { }

  ngOnInit(): void {
    this.cenadService.getCenads().subscribe((response) => this.cenads = this.cenadService.extraerCenads(response));

  }

  eliminar(): void {
    this.usuarioAdministradorEliminar.emit(this.usuarioAdministrador);
  }

  editar(): void {
    this.usuarioAdministradorEditar.emit(this.usuarioAdministrador);
  }
}
