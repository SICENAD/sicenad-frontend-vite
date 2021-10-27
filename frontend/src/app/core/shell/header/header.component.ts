import { Component, OnInit } from '@angular/core';
import { UsuarioAdministrador } from 'src/app/usuarios/models/usuarioAdministrador';
import { UsuarioGestor } from 'src/app/usuarios/models/usuarioGestor';
import { UsuarioNormal } from 'src/app/usuarios/models/usuarioNormal';
import { UsuarioSuperadministrador } from 'src/app/usuarios/models/usuarioSuperadministrador';
import { UsuarioAdministradorService } from 'src/app/usuarios/service/usuarioAdministrador.service';
import { UsuarioGestorService } from 'src/app/usuarios/service/usuarioGestor.service';
import { UsuarioNormalService } from 'src/app/usuarios/service/usuarioNormal.service';
import { UsuarioSuperadministradorService } from 'src/app/usuarios/service/usuarioSuperadministrador.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //variables que guardan los usuarios de cada tipo
  usuariosSuperadministrador: UsuarioSuperadministrador [] = [];
  usuariosAdministrador: UsuarioAdministrador [] = [];
  usuariosGestor: UsuarioGestor [] = [];
  usuariosNormal: UsuarioNormal [] = [];
  //variables que guardan los datos del usuario loggeado
  nombreUsuario: string ='';
  password: string = '';
  tipoUsuario: string = '';
  static idCenad: string = '';
  nombreCenad: string = '';
  static idUnidad: string = '';
  nombreUnidad: string = '';
  static idUsuario: string = '';
  //compondra tipo de usuario y cenad/unidad, para escribir como quien se ha loggeado
  loggedAs: string = '';
  //variable que indica que el nombre de usuario existe o no
  usuarioExiste: boolean = false;
  //variable que indica si se esta loggeado
  static isLogged: boolean = false;
  //variables que indican si eres de un tipo concreto de usuario
  static isSuperAdmin: boolean = false;
  static isAdmin: boolean = false;
  static isGestor: boolean = false;
  static isNormal: boolean = false;

  constructor(private usuarioSuperadministradorService: UsuarioSuperadministradorService,
              private usuarioAdministradorService: UsuarioAdministradorService,
              private usuarioGestorService: UsuarioGestorService,
              private usuarioNormalService: UsuarioNormalService) { }

  ngOnInit(): void {//recupero de la BD todos los usuarios
    this.usuarioSuperadministradorService.getUsuarios().subscribe((response) => this.usuariosSuperadministrador = this.usuarioSuperadministradorService.extraerUsuarios(response));
    this.usuarioAdministradorService.getUsuarios().subscribe((response) => this.usuariosAdministrador = this.usuarioAdministradorService.extraerUsuarios(response));
    this.usuarioGestorService.getUsuarios().subscribe((response) => this.usuariosGestor = this.usuarioGestorService.extraerUsuarios(response));
    this.usuarioNormalService.getUsuarios().subscribe((response) => this.usuariosNormal = this.usuarioNormalService.extraerUsuarios(response));
  }

  //metodo que comprueba si el logging es correcto
  comprobarLogging(): void {
    //para tener los usuarios actualizados
    this.ngOnInit();
    //resetea el valor
    HeaderComponent.isLogged = false;
    //comprueba que el nombre corresponde al superadministrador
    this.usuariosSuperadministrador.forEach(u => {
      if(u.nombre === this.nombreUsuario) {
        this.usuarioExiste = true;
        if(u.password === this.password) {
           //valores que implican estar loggeado como superadmin
          HeaderComponent.isLogged = true;
          this.loggedAs = this.tipoUsuario = 'Superadministrador';
          HeaderComponent.idUsuario = u.idUsuario;
          HeaderComponent.isSuperAdmin = true;
        } else {
          alert('La contraseña no es correcta');     
        }
      }
    });
    //ahora comprobará si es administrador...
    if (!HeaderComponent.isLogged) {
      this.usuariosAdministrador.forEach(u => {
        if(u.nombre === this.nombreUsuario) {
          this.usuarioExiste = true;
          if(u.password === this.password) {
            HeaderComponent.isLogged = true;
            this.tipoUsuario = 'Administrador';
            HeaderComponent.idCenad = u.cenad.idCenad;
            this.nombreCenad = u.cenad.nombre;
            HeaderComponent.idUsuario = u.idUsuario;
            this.loggedAs = `${this.tipoUsuario} del ${this.nombreCenad.toUpperCase()}`;
            HeaderComponent.isAdmin = true;
          } else {
            alert('La contraseña no es correcta');
          }
        }
      });
    }
    //ahora comprobará si es gestor
    if (!HeaderComponent.isLogged) {
      this.usuariosGestor.forEach(u => {
        if(u.nombre === this.nombreUsuario) {
          this.usuarioExiste = true;
          if(u.password === this.password) {
            HeaderComponent.isLogged = true;
            this.tipoUsuario = 'Gestor';
            HeaderComponent.idCenad = u.cenad.idCenad;
            this.nombreCenad = u.cenad.nombre;
            HeaderComponent.idUsuario = u.idUsuario;
            this.loggedAs = `${this.tipoUsuario} del ${this.nombreCenad.toUpperCase()}`;
            HeaderComponent.isGestor = true;
          } else {
            alert('La contraseña no es correcta');
          }
        }
      });
    }
    //ahora comprobará si es usuario normal
    if (!HeaderComponent.isLogged) {
      this.usuariosNormal.forEach(u => {
        if(u.nombre === this.nombreUsuario) {
          this.usuarioExiste = true;
          if(u.password === this.password) {
            HeaderComponent.isLogged = true;
            this.tipoUsuario = 'Unidad';
            HeaderComponent.idUnidad = u.unidad.idUnidad;
            HeaderComponent.idUsuario = u.idUsuario;
            this.loggedAs = this.nombreUnidad = u.unidad.nombre.toUpperCase();
            HeaderComponent.isNormal = true;
          } else {
            alert('La contraseña no es correcta');
          }
        }
      });
    }
    //es el unico caso que queda  
    if(!this.usuarioExiste) {
      alert('El usuario no existe');
    }
  }

  //metodo para cerrar sesion y resetear variables
  cerrarSesion(): void {
    this.ngOnInit();
    this.nombreUsuario = this.password = this.tipoUsuario = HeaderComponent.idCenad = HeaderComponent.idUnidad =
      this.nombreCenad = this.nombreUnidad = HeaderComponent.idUsuario = this.loggedAs = '';
    HeaderComponent.isAdmin = HeaderComponent.isGestor = HeaderComponent.isNormal 
      = HeaderComponent.isSuperAdmin = HeaderComponent.isLogged = false;
  }

  //metodo para acceder desde el html a la variable estatica
  getLogged(): boolean {
    return HeaderComponent.isLogged;
  }
}
