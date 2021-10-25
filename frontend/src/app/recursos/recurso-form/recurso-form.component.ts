import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from 'src/app/categorias/models/categoria';
import { TipoFormulario } from 'src/app/tiposFormulario/models/tipoFormulario';
import { UsuarioGestor } from 'src/app/usuarios/models/usuarioGestor';
import { RecursoImpl } from '../models/recurso-impl';
import { RecursoService } from '../service/recurso.service';

@Component({
  selector: 'app-recurso-form',
  templateUrl: './recurso-form.component.html',
  styleUrls: ['./recurso-form.component.css']
})
export class RecursoFormComponent implements OnInit {
  //variable para capturar el id del cenad de la barra de navegacion
  idCenad: string = "";
  //variable para grabar el nuevo recurso
  recurso: RecursoImpl = new RecursoImpl();
  //variable para recoger las categorias de ese cenad
  categorias: Categoria[] = [];
  //variable para cargar los gestores de ese cenad
  gestores: UsuarioGestor[] = [];
  //variable para cargar todos los tipos de formulario
  tiposFormulario: TipoFormulario[] = [];
  //variable del icono "volver"
  faVolver =faArrowAltCircleLeft;

  constructor(
    private recursoService: RecursoService,
    private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    //resacata el id del cenad de la barra de navegacion
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    //rescata de la BD las categorias del cenad
    this.recursoService.getCategoriasDeCenad(this.idCenad).subscribe((response) => this.categorias = this.recursoService.extraerCategorias(response));
    //rescata de la BD los usuarios gestores de ese cenad
    this.recursoService.getUsuariosGestor(this.idCenad).subscribe((response) => this.gestores = this.recursoService.extraerUsuarios(response));
    //rescata de la BD los tipos de formulario
    this.recursoService.getTiposFormulario().subscribe((response) => this.tiposFormulario = this.recursoService.extraerTiposFormulario(response));
  }

  //metodo para crear un recurso en ese cenad y volver al listado de recursos de ese cenad
  crearRecurso(): void {
    this.recursoService.create(this.recurso).subscribe((response) => {
      console.log(`He creado el recurso ${this.recurso.nombre}`);
      this.router.navigate([`/principalCenad/${this.idCenad}/recursos/${this.idCenad}`]);
    });
  }
}