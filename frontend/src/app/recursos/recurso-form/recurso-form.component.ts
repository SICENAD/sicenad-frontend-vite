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
    //rescata del local storage las categorias del cenad
    this.categorias = JSON.parse(localStorage.getItem(`categorias_${this.idCenad}`));
    //rescata del local storage los usuarios gestores de ese cenad
    this.gestores = JSON.parse(localStorage.getItem(`usuariosGestor_${this.idCenad}`));
    //rescata del LocalStorage los tipos de formulario
    this.tiposFormulario = JSON.parse(localStorage.tiposFormulario);
  }

  //metodo para crear un recurso en ese cenad y volver al listado de recursos de ese cenad
  crearRecurso(): void {
    this.recursoService.create(this.recurso).subscribe((response) => {
      //actualizo local storage
      this.recursoService.getRecursosDeCenad(this.idCenad).subscribe((response) => {
        localStorage.setItem(`recursos_${this.idCenad}`, JSON.stringify(this.recursoService.extraerRecursos(response)));
        console.log(`He creado el recurso ${this.recurso.nombre}`);
        this.router.navigate([`/principalCenad/${this.idCenad}/recursos/${this.idCenad}`]);
      });
    });
  }
}