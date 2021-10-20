import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Cenad } from '../models/cenad';
import { CenadImpl } from '../models/cenad-impl';
import { UsuarioAdministrador } from '../models/usuarioAdministrador';
import { UsuarioAdministradorImpl } from '../models/usuarioAdministrador-impl';
import { UsuarioNormal } from '../models/usuarioNormal';
import { UsuarioNormalImpl } from '../models/usuarioNormal-impl';
import { CenadService } from '../service/cenad.service';
import { UsuarioAdministradorService } from '../service/usuarioAdministrador.service';
import { UsuarioNormalService } from '../service/usuarioNormal.service';

@Component({
  selector: 'app-superadministrador',
  templateUrl: './superadministrador.component.html',
  styleUrls: ['./superadministrador.component.css']
})
export class SuperadministradorComponent implements OnInit {
  //variable del icono "inicio"
  faHome = faHome;
  //variable que guarda todos los cenads
  cenads: Cenad[] = [];
  //variable que guarda todos los usuariosNormales
  usuariosNormal: UsuarioNormal[] = [];
  //variable que comunicara los datos del cenad
  cenadVerDatos: Cenad;
  //variable que comunicara los datos del usuario normal
  usuarioNormalVerDatos: UsuarioNormal;
  //variable que comunicara los datos del usuario administrador
  usuarioAdministradorVerDatos: UsuarioAdministrador;
  constructor(
    private cenadService: CenadService,
    private usuarioAdministradorService: UsuarioAdministradorService,
    private usuarioNormalService: UsuarioNormalService,
    private router: Router) { }

    ngOnInit(): void {
      //recupera todos los cenads de la BD
      this.cenadService.getCenads().subscribe((response) => this.cenads = this.cenadService.extraerCenads(response));
      //recupera todos los usuarios normal de la BD
      this.usuarioNormalService.getUsuarios().subscribe((response) => this.usuariosNormal = this.usuarioNormalService.extraerUsuarios(response));
    }

    //metodo para traspasar los datos del cenad
    verDatosCenad(cenad: Cenad): void {
      this.cenadVerDatos = cenad;
    }

    //metodo para eliminar un cenad
    onCenadEliminar(cenad: CenadImpl): void {
      this.cenadService.delete(cenad).subscribe(response => {
        console.log(`He borrado el CENAD/CMT ${cenad.nombre}`);
        this.router.navigate(['/superadministrador']);
      });
    }
    //metodo para editar un cenad
    onCenadEditar(cenad: CenadImpl): void {
      this.cenadService.update(cenad).subscribe(response => {
        console.log(`He actualizado el CENAD/CMT ${cenad.nombre} en la provincia ${cenad.provincia}`);
        this.router.navigate(['/superadministrador']);
      });
    }

    //metodo para traspasar los datos del usuario administrador
    verDatosUsuarioAdministrador(usuarioAdministrador: UsuarioAdministrador): void {
      this.usuarioAdministradorVerDatos = usuarioAdministrador;
    }

    //metodo para eliminar un usuario administrador
    onUsuarioAdministradorEliminar(usuarioAdministrador: UsuarioAdministradorImpl): void {
      this.usuarioAdministradorService.delete(usuarioAdministrador).subscribe(response => {
        console.log(`He borrado el Administrador ${usuarioAdministrador.nombre}`);
        this.router.navigate(['/superadministrador']);
      });
    }

    //metodo para editar un usuario administrador
    onUsuarioAdministradorEditar(usuarioAdministrador: UsuarioAdministradorImpl): void {
      this.usuarioAdministradorService.update(usuarioAdministrador).subscribe(response => {
        console.log(`He actualizado el Administrador ${usuarioAdministrador.nombre}`);
        this.router.navigate(['/superadministrador']);
      });
    }

    //metodo para traspasar los datos del usuario normal
    verDatosUsuarioNormal(usuarioNormal: UsuarioNormal): void {
      this.usuarioNormalVerDatos = usuarioNormal;
    }

    //metodo para eliminar un usuario normal
    onUsuarioNormalEliminar(usuarioNormal: UsuarioNormalImpl): void {
      this.usuarioNormalService.delete(usuarioNormal).subscribe(response => {
        console.log(`He borrado el usuario ${usuarioNormal.nombre}`);
        this.router.navigate(['/superadministrador']);
      });
    }

    //metodo para editar un usuario normal
    onUsuarioNormalEditar(usuarioNormal: UsuarioNormalImpl): void {
      this.usuarioNormalService.update(usuarioNormal).subscribe(response => {
        console.log(`He actualizado el usuario ${usuarioNormal.nombre}`);
        this.router.navigate(['/superadministrador']);
      });
    }
  }