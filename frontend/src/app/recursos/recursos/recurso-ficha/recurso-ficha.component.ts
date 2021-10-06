import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChange, AfterViewInit, AfterContentInit, AfterViewChecked, DoCheck, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/categorias/models/categoria';
import { UsuarioGestor } from 'src/app/superadministrador/models/usuarioGestor';
import { TipoRecurso } from 'src/app/tiposRecurso/models/tipoRecurso';
import { Recurso } from '../../models/recurso';
import { RecursoImpl } from '../../models/recurso-impl';
import { RecursoService } from '../../service/recurso.service';

@Component({
  selector: 'app-recurso-ficha',
  templateUrl: './recurso-ficha.component.html',
  styleUrls: ['./recurso-ficha.component.css']
})
export class RecursoFichaComponent implements OnInit {

  idCenad: string = "";
  @Input() recurso: RecursoImpl;
  @Output() recursoEliminar = new EventEmitter<RecursoImpl>();
  @Output() recursoEditar = new EventEmitter<RecursoImpl>();
  //recursos: Recurso[] = [];
  categorias: Categoria[] = [];
  gestores: UsuarioGestor[] = [];
  tiposRecurso: TipoRecurso[] = [];
  tipoRecursoSeleccionado: string;
  categoriaRecursoSeleccionada: string;
  recursoUsuarioGestorSeleccionado: string;

  constructor(
    private recursoService: RecursoService, private activateRoute: ActivatedRoute) { }


 ngOnInit(): void {
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    this.recursoService.getCategorias().subscribe((response) => this.categorias = this.recursoService.extraerCategorias(response));
    this.recursoService.getUsuariosGestor().subscribe((response) => this.gestores = this.recursoService.extraerUsuarios(response));
    this.recursoService.getTiposRecurso().subscribe((response) => {
       this.tiposRecurso = this.recursoService.extraerTiposRecurso(response);
      // console.log(this.tiposRecurso);
      });
    this.actualizarNgModels();
  }

  eliminar(): void {
    this.recursoEliminar.emit(this.recurso);
  }

  actualizarNgModels(): void {
    this.tipoRecursoSeleccionado = this.recurso.tipoRecurso.url;
    console.log(this.tipoRecursoSeleccionado);
    this.categoriaRecursoSeleccionada = this.recurso.categoria.url;
    console.log(this.categoriaRecursoSeleccionada);
    this.recursoUsuarioGestorSeleccionado = this.recurso.usuarioGestor.url;
  }

  editar(): void {
    this.recurso.tipoRecurso = this.tipoRecursoSeleccionado;
    this.recurso.categoria = this.categoriaRecursoSeleccionada;
   // this.recurso.usuarioGestor = this.recursoUsuarioGestorSeleccionado;
    this.recursoEditar.emit(this.recurso);
    // console.log(this.recurso.tipoRecurso);
    // console.log(this.recurso.categoria);
  }

}
