import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { TipoFormulario } from '../models/tipoFormulario';

@Component({
  selector: 'app-tipoFormulario',
  templateUrl: './tipoFormulario.component.html',
  styleUrls: ['./tipoFormulario.component.css']
})
export class TipoFormularioComponent implements OnInit {

  @Input() tipoFormulario: TipoFormulario;
  @Output() tipoFormularioSeleccionado = new EventEmitter<TipoFormulario>();
  faEdit = faEdit;

  constructor() { }

  ngOnInit() {
  }
}



