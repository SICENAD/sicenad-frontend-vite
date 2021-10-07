import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { TipoRecurso } from '../models/tipoRecurso';

@Component({
  selector: 'app-tipoRecurso',
  templateUrl: './tipoRecurso.component.html',
  styleUrls: ['./tipoRecurso.component.css']
})
export class TipoRecursoComponent implements OnInit {

  @Input() tipoRecurso: TipoRecurso;
  @Output() tipoRecursoSeleccionado = new EventEmitter<TipoRecurso>();
  faEdit = faEdit;

  constructor() { }

  ngOnInit() {
  }
}



