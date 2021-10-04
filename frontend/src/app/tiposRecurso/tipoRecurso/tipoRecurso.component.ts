import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoRecurso } from '../models/tipoRecurso';
import { TipoRecursoService } from '../service/tipoRecurso.service';

@Component({
  selector: 'app-tipoRecurso',
  templateUrl: './tipoRecurso.component.html',
  styleUrls: ['./tipoRecurso.component.css']
})
export class TipoRecursoComponent implements OnInit {

  @Input() tipoRecurso: TipoRecurso;
  @Output() tipoRecursoSeleccionado = new EventEmitter<TipoRecurso>();

  constructor() { }

  ngOnInit() {
  }
}



