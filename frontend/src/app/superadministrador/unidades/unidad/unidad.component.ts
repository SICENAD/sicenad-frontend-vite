import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuarioNormal } from '../../models/usuarioNormal';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styles: []
})
export class UnidadComponent implements OnInit {

  @Input() usuarioNormal: UsuarioNormal;
  @Output() usuarioNormalSeleccionado = new EventEmitter<UsuarioNormal>();



  constructor() { }

  ngOnInit() {
  }
}



