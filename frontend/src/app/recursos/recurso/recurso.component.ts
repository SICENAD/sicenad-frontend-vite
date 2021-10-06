import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recurso } from '../models/recurso';
import { RecursoService } from '../service/recurso.service';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.css']
})
export class RecursoComponent implements OnInit {

  @Input() recurso: Recurso;
  @Output() recursoSeleccionado = new EventEmitter<Recurso>();

  constructor(private recursoService: RecursoService) { }

  ngOnInit() {
    this.recursoService.getCategoria(this.recurso).subscribe((response) => this.recurso.categoria = this.recursoService.mapearCategoria(response));
    this.recursoService.getUsuarioGestor(this.recurso).subscribe((response) => this.recurso.usuarioGestor = this.recursoService.mapearUsuario(response));

  }
}
