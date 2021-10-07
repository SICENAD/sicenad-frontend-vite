import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { UsuarioNormal } from '../../models/usuarioNormal';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent implements OnInit {

  @Input() usuarioNormal: UsuarioNormal;
  @Output() usuarioNormalSeleccionado = new EventEmitter<UsuarioNormal>();
  faEdit = faEdit;

  constructor() { }

  ngOnInit() {
  }
}



