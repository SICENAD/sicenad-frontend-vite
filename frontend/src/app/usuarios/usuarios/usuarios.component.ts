import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from 'src/app/core/shell/header/header.component';
import { UsuarioAdministrador } from '../models/usuarioAdministrador';
import { UsuarioAdministradorImpl } from '../models/usuarioAdministrador-impl';
import { UsuarioGestor } from '../models/usuarioGestor';
import { UsuarioGestorImpl } from '../models/usuarioGestor-impl';
import { UsuarioNormal } from '../models/usuarioNormal';
import { UsuarioNormalImpl } from '../models/usuarioNormal-impl';
import { UsuarioAdministradorService } from '../service/usuarioAdministrador.service';
import { UsuarioGestorService } from '../service/usuarioGestor.service';
import { UsuarioNormalService } from '../service/usuarioNormal.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  //variable del icono "volver"
  faVolver = faArrowAltCircleLeft;
  //variable que dice si es tu cenad o no
  isMiCenad: boolean = false;
  //variable boolean que dice si es administrador (ve gestores de su cenad) o no (ve administradores)
  isAdministrador: boolean = false;
  //variable para capturar el idCenad en el caso de que el que acceda sea el administrador de un cenad
  idCenad: string = "";
  //variable que recogera el string para el routerLink de volver atras en funcion de donde viene
  volver: string = '';
  //variable que recogera el string para el routerLink de nuevo usuario normal en funcion de donde viene
  nuevoUsuarioNormal: string = '';
  //variable que guarda todos los usuariosAdministradores
  usuariosAdministrador: UsuarioAdministrador[] = [];
  //variable que guarda todos los usuariosGestores
  usuariosGestor: UsuarioGestor[] = [];
  //variable que guarda todos los usuariosNormales
  usuariosNormal: UsuarioNormal[] = [];
  //variable que comunicara los datos del usuarioAdministrador
  usuarioAdministradorVerDatos: UsuarioAdministrador;
  //variable que comunicara los datos del usuarioGestor
  usuarioGestorVerDatos: UsuarioGestor;
  //variable que comunicara los datos del usuario normal
  usuarioNormalVerDatos: UsuarioNormal;
  //variable que comunicara los datos del usuario administrador
  constructor(
    private usuarioAdministradorService: UsuarioAdministradorService,
    private usuarioNormalService: UsuarioNormalService,
    private usuarioGestorService: UsuarioGestorService,
    private router: Router, private activateRoute: ActivatedRoute) { }

    ngOnInit(): void {
      //captura el id del cenad de la barra de navegacion
      this.idCenad = this.activateRoute.snapshot.params['idCenad'];
      //compruebo si el usuario loggeado pertenece a este cenad
      this.isMiCenad = (this.idCenad === sessionStorage.idCenad);
      //compruebo si el usuario loggeado es administrador
      this.isAdministrador = (sessionStorage.isAdmin === 'true');
      //comprueba que sea administrador de ese cenad
      //recupera todos los usuarios normal del loccal storage
      this.usuariosNormal = JSON.parse(localStorage.usuariosNormal);
      if(this.isAdministrador && this.isMiCenad) {
        //recupera del local storage los usuarios gestores del cenad
        this.usuariosGestor = JSON.parse(localStorage.getItem(`usuariosGestor_${this.idCenad}`));
      }
      if (this.isAdministrador) {//la variable volver nos llevara a "superadministrador"o a "ppalCenad"
        //aqui debo sacar el idCenad del administrador que esta logueado
        this.volver = `/principalCenad/${this.idCenad}`;
        this.nuevoUsuarioNormal = `/principalCenad/${this.idCenad}/usuarios/${this.idCenad}/formulario-usuarioNormal/${this.idCenad}`;
      } else {
        //recupera todos los administradores de la BD
        this.usuariosAdministrador = JSON.parse(localStorage.usuariosAdministrador);
        this.volver = `/superadministrador`;
        this.nuevoUsuarioNormal = `/usuarios/formulario-usuarioNormal`;
      }
    }

    //metodo para traspasar los datos del usuario administrador
    verDatosUsuarioAdministrador(usuarioAdministrador: UsuarioAdministrador): void {
      this.usuarioAdministradorVerDatos = usuarioAdministrador;
    }

    //metodo para eliminar un usuario administrador
    onUsuarioAdministradorEliminar(usuarioAdministrador: UsuarioAdministradorImpl): void {
      this.usuarioAdministradorService.delete(usuarioAdministrador).subscribe(response => {
        //actualizo el local storage
        this.usuarioAdministradorService.getUsuarios().subscribe((response) =>{ 
          localStorage.usuariosAdministrador = JSON.stringify(this.usuarioAdministradorService.extraerUsuarios(response));
          console.log(`He borrado el Administrador ${usuarioAdministrador.nombre}`);
          this.router.navigate(['/usuarios']);
        });
      });
    }

    //metodo para editar un usuario administrador
    onUsuarioAdministradorEditar(usuarioAdministrador: UsuarioAdministradorImpl): void {
      this.usuarioAdministradorService.update(usuarioAdministrador).subscribe(response => {
      //actualizo el local storage
        this.usuarioAdministradorService.getUsuarios().subscribe((response) =>{ 
          localStorage.usuariosAdministrador = JSON.stringify(this.usuarioAdministradorService.extraerUsuarios(response));
          console.log(`He actualizado el Administrador ${usuarioAdministrador.nombre}`);
          this.router.navigate(['/usuarios']);
        });
      });
    }

    //metodo para traspasar los datos del usuario gestor
    verDatosUsuarioGestor(usuarioGestor: UsuarioGestor): void {
      this.usuarioGestorVerDatos = usuarioGestor;
    }

    //metodo para eliminar un usuario gestor
    onUsuarioGestorEliminar(usuarioGestor: UsuarioGestorImpl): void {
      this.usuarioGestorService.delete(usuarioGestor).subscribe(response => {
        //actualizo el local storage
        this.usuarioGestorService.getUsuarios().subscribe((response) => localStorage.usuariosGestor = JSON.stringify(this.usuarioGestorService.extraerUsuarios(response)));
        this.usuarioGestorService.getUsuariosGestoresDeCenad(this.idCenad).subscribe((response) => {
          localStorage.setItem(`usuariosGestor_${this.idCenad}`, JSON.stringify(this.usuarioGestorService.extraerUsuarios(response)));
          console.log(`He borrado el gestor ${usuarioGestor.nombre}`);
          this.router.navigate([`/principalCenad/${this.idCenad}/usuarios/${this.idCenad}`]);
        });
      });
    }

    //metodo para editar un usuario gestor
    onUsuarioGestorEditar(usuarioGestor: UsuarioGestorImpl): void {
      this.usuarioGestorService.update(usuarioGestor).subscribe(response => {
        //actualizo el local storage
        this.usuarioGestorService.getUsuarios().subscribe((response) => localStorage.usuariosGestor = JSON.stringify(this.usuarioGestorService.extraerUsuarios(response)));
        this.usuarioGestorService.getUsuariosGestoresDeCenad(this.idCenad).subscribe((response) => {
          localStorage.setItem(`usuariosGestor_${this.idCenad}`, JSON.stringify(this.usuarioGestorService.extraerUsuarios(response)));
          console.log(`He actualizado el gestor ${usuarioGestor.nombre}`);
          this.router.navigate([`/principalCenad/${this.idCenad}/usuarios/${this.idCenad}`]);
        });
      });
    }

    //metodo para traspasar los datos del usuario normal
    verDatosUsuarioNormal(usuarioNormal: UsuarioNormal): void {
      this.usuarioNormalVerDatos = usuarioNormal;
    }

    //metodo para eliminar un usuario normal
    onUsuarioNormalEliminar(usuarioNormal: UsuarioNormalImpl): void {
      let ruta: string = (this.idCenad !==undefined) ? `principalCenad/${this.idCenad}/usuarios/${this.idCenad}` : 'usuarios'  
      this.usuarioNormalService.delete(usuarioNormal).subscribe(response => {
        //actualizo el local storage
        this.usuarioNormalService.getUsuarios().subscribe((response) => {
          localStorage.usuariosNormal = JSON.stringify(this.usuarioNormalService.extraerUsuarios(response));
          console.log(`He borrado el usuario ${usuarioNormal.nombre}`);
          this.router.navigate([ruta]);
        });
      });
    }

    //metodo para editar un usuario normal
    onUsuarioNormalEditar(usuarioNormal: UsuarioNormalImpl): void {
      let ruta: string = (this.idCenad !==undefined) ? `principalCenad/${this.idCenad}/usuarios/${this.idCenad}` : 'usuarios'    
      this.usuarioNormalService.update(usuarioNormal).subscribe(response => {
        //actualizo el local storage
        this.usuarioNormalService.getUsuarios().subscribe((response) => {
          localStorage.usuariosNormal = JSON.stringify(this.usuarioNormalService.extraerUsuarios(response));
          console.log(`He actualizado el usuario ${usuarioNormal.nombre}`);
          this.router.navigate([ruta]);
        });
      });
    }
  }