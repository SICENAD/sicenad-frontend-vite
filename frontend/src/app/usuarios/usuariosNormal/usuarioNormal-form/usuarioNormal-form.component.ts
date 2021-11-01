import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Unidad } from 'src/app/unidades/models/unidad';
import { UsuarioNormalImpl } from '../../models/usuarioNormal-impl';
import { UsuarioNormalService } from '../../service/usuarioNormal.service';

@Component({
  selector: 'app-usuarioNormal-form',
  templateUrl: './usuarioNormal-form.component.html',
  styleUrls: ['./usuarioNormal-form.component.css']
})
export class UsuarioNormalFormComponent implements OnInit {
  //variable boolean que dice si es administrador o no 
  isAdministrador: boolean = false;
  //variable para capturar el idCenad en el caso de que el que acceda sea el administrador de un cenad
  idCenad: string = "";
  //variable que recogera el string para el routerLink de volver atras en funcion de donde viene
  volver: string = '';    
  //variable en la que se grabara el nuevo usuario normal
  usuarioNormal: UsuarioNormalImpl = new UsuarioNormalImpl();
  //variable para cargar todas las unidades
  unidades: Unidad[] = [];
  //variable del icono "volver"
  faVolver = faArrowAltCircleLeft;

  constructor(
    private usuarioNormalService: UsuarioNormalService,
    private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //captura el id del cenad de la barra de navegacion
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    this.isAdministrador = (this.idCenad !==undefined);
    if (this.isAdministrador) {//la variable volver nos llevara a "usuarios"o a "ppalCenad/{id}/usuarios/{id}"
      //aqui debo sacar el idCenad del administrador que esta logueado
      this.volver = `/principalCenad/${this.idCenad}/usuarios/${this.idCenad}`;
    } else {
      this.volver = `/usuarios`;
    }
    //rescata del local storage las unidades
    this.unidades = JSON.parse(localStorage.unidades);
  }

  //metodo para crear un usuario normal
  crearUsuarioNormal(): void {
    let ruta: string = (this.idCenad !==undefined) ? `principalCenad/${this.idCenad}/usuarios/${this.idCenad}` : 'usuarios'
    this.usuarioNormalService.create(this.usuarioNormal).subscribe((response) => {
      //actualizo el local storage
      this.usuarioNormalService.getUsuarios().subscribe((response) => {
        localStorage.usuariosNormal = JSON.stringify(this.usuarioNormalService.extraerUsuarios(response));
        console.log(`He creado el Usuario Normal ${this.usuarioNormal.nombre}`);
        this.router.navigate([ruta]);
      });
    });
  }
}