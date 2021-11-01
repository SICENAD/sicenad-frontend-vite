import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { UsuarioAdministradorImpl } from '../../models/usuarioAdministrador-impl';
import { UsuarioAdministradorService } from '../../service/usuarioAdministrador.service';

@Component({
  selector: 'app-usuarioAdministrador-form',
  templateUrl: './usuarioAdministrador-form.component.html',
  styleUrls: ['./usuarioAdministrador-form.component.css']
})
export class UsuarioAdministradorFormComponent implements OnInit {
  //variable en la que se grabara el nuevo usuarioAdministrador
  usuarioAdministrador: UsuarioAdministradorImpl = new UsuarioAdministradorImpl();
  //variable para cargar todos los cenads
  cenads: Cenad[] = [];
  //variable del icono "volver"
  faVolver = faArrowAltCircleLeft;

  constructor(
    private usuarioAdministradorService: UsuarioAdministradorService,
    private router: Router) { }

  ngOnInit(): void {
    //rescata de la BD los cenads sin administrador
    this.usuarioAdministradorService.getCenadsSinAdmin().subscribe((response) => this.cenads = this.usuarioAdministradorService.extraerCenads(response));
  }

  //metodo para crear un usuarioAdministrador
  crearUsuarioAdministrador(): void {
    this.usuarioAdministradorService.create(this.usuarioAdministrador).subscribe((response) => {
      console.log(`He creado el Usuario Administrador ${this.usuarioAdministrador.nombre}`);
      //actualizo el local storage
      this.usuarioAdministradorService.getUsuarios().subscribe((response) => {
        localStorage.usuariosAdministrador = JSON.stringify(this.usuarioAdministradorService.extraerUsuarios(response));
        this.router.navigate(['/usuarios']);
      });
    });
  }
}