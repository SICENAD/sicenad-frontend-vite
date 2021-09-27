import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  cenads: Cenad[] = [];
  usuariosNormal: UsuarioNormal[] = [];
  cenadVerDatos: Cenad;
  usuarioNormalVerDatos: UsuarioNormal;
  usuarioAdministradorVerDatos: UsuarioAdministrador;
  constructor(
    private cenadService: CenadService,
    private usuarioAdministradorService: UsuarioAdministradorService,
    private usuarioNormalService: UsuarioNormalService,
    private router: Router) { }

    ngOnInit(): void {
      this.cenadService.getCenads().subscribe((response) => this.cenads = this.cenadService.extraerCenads(response));
      this.usuarioNormalService.getUsuarios().subscribe((response) => this.usuariosNormal = this.usuarioNormalService.extraerUsuarios(response));
    }

    verDatosCenad(cenad: Cenad): void {
      this.cenadVerDatos = cenad;
      this.usuarioAdministradorVerDatos = cenad.usuarioAdministrador;
    }

    onCenadEliminar(cenad: CenadImpl): void {
      this.cenadService.delete(cenad).subscribe(response => {
        console.log(`He borrado el CENAD/CMT ${cenad.nombre}`);
        this.router.navigate(['/superadministrador']);
      });
    }

    onCenadEditar(cenad: CenadImpl): void {
      this.cenadService.update(cenad).subscribe(response => {
        console.log(`He actualizado el CENAD/CMT ${cenad.nombre} en la provincia ${cenad.provincia}`);
        this.router.navigate(['/superadministrador']);
      });
    }

    verDatosUsuarioAdministrador(usuarioAdministrador: UsuarioAdministrador): void {
      this.usuarioAdministradorVerDatos = this.cenadVerDatos.usuarioAdministrador;
    }

    onUsuarioAdministradorEliminar(usuarioAdministrador: UsuarioAdministradorImpl): void {
      this.usuarioAdministradorService.delete(usuarioAdministrador).subscribe(response => {
        console.log(`He borrado el Administrador ${usuarioAdministrador.nombre}`);
        this.router.navigate(['/superadministrador']);
      });
    }

    onUsuarioAdministradorEditar(usuarioAdministrador: UsuarioAdministradorImpl): void {
      this.usuarioAdministradorService.update(usuarioAdministrador).subscribe(response => {
        console.log(`He actualizado el Administrador ${usuarioAdministrador.nombre}`);
        this.router.navigate(['/superadministrador']);
      });
    }

    verDatosUsuarioNormal(usuarioNormal: UsuarioNormal): void {
      this.usuarioNormalVerDatos = usuarioNormal;
    }

    onUsuarioNormalEliminar(usuarioNormal: UsuarioNormalImpl): void {
      this.usuarioNormalService.delete(usuarioNormal).subscribe(response => {
        console.log(`He borrado el usuario ${usuarioNormal.nombre}`);
        this.router.navigate(['/superadministrador']);
      });
    }

    onUsuarioNormalEditar(usuarioNormal: UsuarioNormalImpl): void {
      this.usuarioNormalService.update(usuarioNormal).subscribe(response => {
        console.log(`He actualizado el usuario ${usuarioNormal.nombre}`);
        this.router.navigate(['/superadministrador']);
      });
    }
  }
