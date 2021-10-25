import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { UsuarioAdministrador } from '../../models/usuarioAdministrador';

@Component({
  selector: 'app-usuarioAdministrador',
  templateUrl: './usuarioAdministrador.component.html',
  styleUrls: ['./usuarioAdministrador.component.css']
})
export class UsuarioAdministradorComponent implements OnInit {
  //variable que trae del otro componente el usuarioAdministrador
  @Input() usuarioAdministrador: UsuarioAdministrador;
  //variable que emitira al otro componente el usuarioAdministrador para mostrar los datos
  @Output() usuarioAdministradorSeleccionado = new EventEmitter<UsuarioAdministrador>();
  //variable del icono "editar"
  faEdit = faEdit;

  constructor() {}

  ngOnInit() {}
}