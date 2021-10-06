import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from 'src/app/categorias/models/categoria';
import { UsuarioGestor } from 'src/app/superadministrador/models/usuarioGestor';
import { TipoRecurso } from 'src/app/tiposRecurso/models/tipoRecurso';
import { Recurso } from '../models/recurso';
import { RecursoImpl } from '../models/recurso-impl';
import { RecursoService } from '../service/recurso.service';

@Component({
  selector: 'app-recurso-form',
  templateUrl: './recurso-form.component.html',
  styleUrls: ['./recurso-form.component.css']
})
export class RecursoFormComponent implements OnInit {

  idCenad: string = "";
  recurso: RecursoImpl = new RecursoImpl();
  categorias: Categoria[] = [];
  recursos: Recurso[] = [];
  gestores: UsuarioGestor[] = [];
  tiposRecurso: TipoRecurso[] = [];
  faVolver =faArrowAltCircleLeft;

  constructor(
    private recursoService: RecursoService,
    private router: Router, private activateRoute: ActivatedRoute) { }


  ngOnInit() {
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    this.recursoService.getCategorias().subscribe((response) => this.categorias = this.recursoService.extraerCategorias(response));
    this.recursoService.getUsuariosGestor().subscribe((response) => this.gestores = this.recursoService.extraerUsuarios(response));
    this.recursoService.getTiposRecurso().subscribe((response) => this.tiposRecurso = this.recursoService.extraerTiposRecurso(response));
  }

  crearRecurso(): void {
    this.recursoService.create(this.recurso).subscribe((response) => {
      console.log(`He creado el recurso ${this.recurso.nombre}`);
      this.router.navigate([`/principalCenad/${this.idCenad}/recursos/${this.idCenad}`]);
    });
  }

}

