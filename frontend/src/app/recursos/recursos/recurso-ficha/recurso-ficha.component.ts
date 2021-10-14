import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChange, AfterViewInit, AfterContentInit, AfterViewChecked, DoCheck, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/categorias/models/categoria';
import { UsuarioGestor } from 'src/app/superadministrador/models/usuarioGestor';
import { TipoFormulario } from 'src/app/tiposFormulario/models/tipoFormulario';
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
  categorias: Categoria[] = [];
  gestores: UsuarioGestor[] = [];
  tiposFormulario: TipoFormulario[] = [];
  tipoFormularioSeleccionado: string;
  categoriaRecursoSeleccionada: string;
  recursoUsuarioGestorSeleccionado: string;

  constructor(
    private recursoService: RecursoService, private activateRoute: ActivatedRoute) { }

 ngOnInit(): void {
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    this.recursoService.getCategoriasDeCenad(this.idCenad).subscribe((response) => this.categorias = this.recursoService.extraerCategorias(response));
    this.recursoService.getUsuariosGestor(this.idCenad).subscribe((response) => this.gestores = this.recursoService.extraerUsuarios(response));
    this.recursoService.getTiposFormulario().subscribe((response) => {
       this.tiposFormulario = this.recursoService.extraerTiposFormulario(response);
      });
    this.actualizarNgModels();
  }

  eliminar(): void {
    this.recursoEliminar.emit(this.recurso);
  }

  actualizarNgModels(): void {
    this.tipoFormularioSeleccionado = this.recurso.tipoFormulario.url;
    console.log(this.tipoFormularioSeleccionado);
    this.categoriaRecursoSeleccionada = this.recurso.categoria.url;
    console.log(this.categoriaRecursoSeleccionada);
    this.recursoUsuarioGestorSeleccionado = this.recurso.usuarioGestor.url;
  }

  editar(): void {
    this.recurso.tipoFormulario = this.tipoFormularioSeleccionado;
    this.recurso.categoria = this.categoriaRecursoSeleccionada;
    this.recurso.usuarioGestor = this.recursoUsuarioGestorSeleccionado;
    this.recursoEditar.emit(this.recurso);
  }
}
