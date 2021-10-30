import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/service/categoria.service';
import { CategoriaFicheroService } from 'src/app/categoriasFichero/service/categoriaFichero.service';
import { RecursoService } from 'src/app/recursos/service/recurso.service';
import { CenadService } from 'src/app/superadministrador/service/cenad.service';
import { TipoFormularioService } from 'src/app/tiposFormulario/service/tipoFormulario.service';
import { UnidadService } from 'src/app/unidades/service/unidad.service';
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
  // usuariosSuperadministrador: UsuarioSuperadministrador [] = [];
  // usuariosAdministrador: UsuarioAdministrador [] = [];
  // usuariosGestor: UsuarioGestor [] = [];
  // usuariosNormal: UsuarioNormal [] = [];
  //variables que guardan los datos del usuario loggeado
  nombreUsuario: string ='';
  password: string = '';
  tipoUsuario: string = '';
  // static idCenad: string = '';
  nombreCenad: string = '';
  // static idUnidad: string = '';
  nombreUnidad: string = '';
  // static idUsuario: string = '';
  //compondra tipo de usuario y cenad/unidad, para escribir como quien se ha loggeado
  loggedAs: string = '';
  //variable que indica que el nombre de usuario existe o no
  usuarioExiste: boolean = false;
  //variable que indica si se esta loggeado
  // static isLogged: boolean = false;
  //variables que indican si eres de un tipo concreto de usuario
  // static isSuperAdmin: boolean = false;
  // static isAdmin: boolean = false;
  // static isGestor: boolean = false;
  // static isNormal: boolean = false;

  constructor(private usuarioSuperadministradorService: UsuarioSuperadministradorService,
              private usuarioAdministradorService: UsuarioAdministradorService,
              private usuarioGestorService: UsuarioGestorService,
              private usuarioNormalService: UsuarioNormalService,
              private cenadService: CenadService,
              private categoriaFicheroService: CategoriaFicheroService,
              private tipoFormularioService: TipoFormularioService,
              private unidadService: UnidadService) { }

  ngOnInit(): void {//recupero de la BD todos los usuarios, cenads, categorias de fichero, tipos de formulario y unidades y los guardo en el local storage
    if(!localStorage.usuariosSuperadministrador) {
      this.usuarioSuperadministradorService.getUsuarios().subscribe((response) => localStorage.usuariosSuperadministrador = JSON.stringify(this.usuarioSuperadministradorService.extraerUsuarios(response)));
    }
    if(!localStorage.usuariosAdministrador) { 
      this.usuarioAdministradorService.getUsuarios().subscribe((response) => localStorage.usuariosAdministrador = JSON.stringify(this.usuarioAdministradorService.extraerUsuarios(response)));
    }
    if(!localStorage.usuariosGestor) {
      this.usuarioGestorService.getUsuarios().subscribe((response) => localStorage.usuariosGestor = JSON.stringify(this.usuarioGestorService.extraerUsuarios(response)));
    }
    if(!localStorage.usuariosNormal) {
      this.usuarioNormalService.getUsuarios().subscribe((response) => localStorage.usuariosNormal = JSON.stringify(this.usuarioNormalService.extraerUsuarios(response)));
    }
    if(!localStorage.cenads) { 
      this.cenadService.getCenads().subscribe((response) => localStorage.cenads = JSON.stringify(this.cenadService.extraerCenads(response)));
    }
    if(!localStorage.categoriasFichero) {
      this.categoriaFicheroService.getCategoriasFichero().subscribe((response) => localStorage.categoriasFichero = JSON.stringify(this.categoriaFicheroService.extraerCategoriasFichero(response)));
    }
    if(!localStorage.tiposFormulario) {
      this.tipoFormularioService.getTiposFormulario().subscribe((response) => localStorage.tiposFormulario = JSON.stringify(this.tipoFormularioService.extraerTiposFormulario(response)));
    }
    if(!localStorage.unidades) {
      this.unidadService.getUnidades().subscribe((response) => localStorage.unidades = JSON.stringify(this.unidadService.extraerUnidades(response)));
    }
    //con esto evito que si actualizo la pagina se ven vacios los campos esteticos de logging
    if(sessionStorage.nombreCenad) {
      this.nombreCenad = sessionStorage.nombreCenad;
    }
    if(sessionStorage.nombreUnidad) {
      this.nombreUnidad = sessionStorage.nombreUnidad;
    }
    if(sessionStorage.nombreUsuario) {
      this.nombreUsuario = sessionStorage.nombreUsuario;
    }
    if(sessionStorage.loggedAs) {
      this.loggedAs = sessionStorage.loggedAs;
    }
    if(sessionStorage.tipoUsuario) {
      this.tipoUsuario = sessionStorage.tipoUsuario;
    }
  }

  //metodo que comprueba si el logging es correcto
  comprobarLogging(): void {
    //para tener los usuarios actualizados
    this.ngOnInit();
    //resetea el valor
    sessionStorage.isLogged = false;
    //comprueba que el nombre corresponde al superadministrador
    JSON.parse(localStorage.usuariosSuperadministrador).forEach(u => {
      if(u.nombre === this.nombreUsuario) {
        this.usuarioExiste = true;
        sessionStorage.nombreUsuario = this.nombreUsuario;
        if(u.password === this.password) {
           //valores que implican estar loggeado como superadmin
          sessionStorage.isLogged = true;
          sessionStorage.loggedAs = this.loggedAs = sessionStorage.tipoUsuario = this.tipoUsuario = 'Superadministrador';
          sessionStorage.idUsuario = u.idUsuario;
          sessionStorage.isSuperAdmin = true;
        } else {
          alert('La contraseña no es correcta');     
        }
      }
    });
    //ahora comprobará si es administrador...
    if (sessionStorage.isLogged === 'false') {
      JSON.parse(localStorage.usuariosAdministrador).forEach(u => {
        if(u.nombre === this.nombreUsuario) {
          sessionStorage.nombreUsuario = this.nombreUsuario;
          this.usuarioExiste = true;
          if(u.password === this.password) {
            sessionStorage.isLogged = true;
            sessionStorage.tipoUsuario = this.tipoUsuario = 'Administrador';
            this.usuarioAdministradorService.getCenad(u).subscribe((response) => {
              sessionStorage.idCenad = this.usuarioAdministradorService.mapearCenad(response).idCenad;
              sessionStorage.nombreCenad = this.nombreCenad = this.usuarioAdministradorService.mapearCenad(response).nombre;
              sessionStorage.loggedAs = this.loggedAs = `${sessionStorage.tipoUsuario} del ${sessionStorage.nombreCenad.toUpperCase()}`;  
            });
            sessionStorage.idUsuario = u.idUsuario;
            sessionStorage.isAdmin = true;
          } else {
            alert('La contraseña no es correcta');
          }
        }
      });
    }
    //ahora comprobará si es gestor
    if (sessionStorage.isLogged === 'false') {
      JSON.parse(localStorage.usuariosGestor).forEach(u => {
        if(u.nombre === this.nombreUsuario) {
          sessionStorage.nombreUsuario = this.nombreUsuario;
          this.usuarioExiste = true;
          if(u.password === this.password) {
            sessionStorage.isLogged = true;
            sessionStorage.tipoUsuario = this.tipoUsuario = 'Gestor';
            this.usuarioGestorService.getCenad(u).subscribe((response) => {
              sessionStorage.idCenad = this.usuarioGestorService.mapearCenad(response).idCenad;
              sessionStorage.nombreCenad = this.nombreCenad = this.usuarioGestorService.mapearCenad(response).nombre;
              sessionStorage.loggedAs = this.loggedAs = `${sessionStorage.tipoUsuario} del ${sessionStorage.nombreCenad.toUpperCase()}`;
            });
            sessionStorage.idUsuario = u.idUsuario;
            sessionStorage.isGestor = true;
          } else {
            alert('La contraseña no es correcta');
          }
        }
      });
    }
    //ahora comprobará si es usuario normal
    if (sessionStorage.isLogged === 'false') {
      JSON.parse(localStorage.usuariosNormal).forEach(u => {
        if(u.nombre === this.nombreUsuario) {
          sessionStorage.nombreUsuario = this.nombreUsuario;
          this.usuarioExiste = true;
          if(u.password === this.password) {
            sessionStorage.isLogged = true;
            sessionStorage.tipoUsuario = this.tipoUsuario = 'Unidad';
            this.usuarioNormalService.getUnidad(u.idUsuario).subscribe((response) => {
              sessionStorage.idUnidad = this.usuarioNormalService.mapearUnidad(response).idUnidad;
              sessionStorage.loggedAs = this.loggedAs = this.nombreUnidad = this.usuarioNormalService.mapearUnidad(response).nombre.toUpperCase();
              });
            sessionStorage.idUsuario = u.idUsuario;
            sessionStorage.isNormal = true;
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
    this.nombreUsuario = this.password = this.tipoUsuario = sessionStorage.idCenad = sessionStorage.idUnidad =
      this.nombreCenad = this.nombreUnidad = sessionStorage.idUsuario = this.loggedAs = sessionStorage.nombreUsuario = 
      sessionStorage.loggedAs = sessionStorage.nombreCenad = sessionStorage.tipoUsuario = '';
    sessionStorage.isAdmin = sessionStorage.isGestor = sessionStorage.isNormal 
      = sessionStorage.isSuperAdmin = sessionStorage.isLogged = false;
  }

  //metodo para acceder desde el html a la variable estatica
  getLogged(): boolean {
    return (sessionStorage.isLogged === 'true');
  }
}