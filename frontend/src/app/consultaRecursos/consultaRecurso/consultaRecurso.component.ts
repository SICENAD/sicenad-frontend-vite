import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Recurso } from 'src/app/recursos/models/recurso';
import { RecursoService } from 'src/app/recursos/service/recurso.service';


@Component({
  selector: 'app-consultaRecurso',
  templateUrl: './consultaRecurso.component.html',
  styleUrls: ['./consultaRecurso.component.css']
})
export class ConsultaRecursoComponent implements OnInit {

  @Input() recurso: Recurso;
  faEye = faEye;

  constructor(private recursoService: RecursoService) { }

  ngOnInit() {
    // this.recursoService.getCategoria(this.recurso).subscribe((response) => this.recurso.categoria = this.recursoService.mapearCategoria(response));
    // this.recursoService.getUsuarioGestor(this.recurso).subscribe((response) => this.recurso.usuarioGestor = this.recursoService.mapearUsuario(response));
    this.recursoService.getCategoria(this.recurso).subscribe((response) => this.recurso.categoria = this.recursoService.mapearCategoria(response));
  }
}
