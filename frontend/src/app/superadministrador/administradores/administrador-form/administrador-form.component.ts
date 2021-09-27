import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cenad } from '../../models/cenad';
import { UsuarioAdministradorImpl } from '../../models/usuarioAdministrador-impl';
import { CenadService } from '../../service/cenad.service';
import { UsuarioAdministradorService } from '../../service/usuarioAdministrador.service';

@Component({
  selector: 'app-administrador-form',
  templateUrl: './administrador-form.component.html',
  styleUrls: ['./administrador-form.component.css']
})
export class AdministradorFormComponent implements OnInit {

  cenads: Cenad[] = [];
  cenadsSinAdmin: Cenad[] = [];
  usuarioAdministrador: UsuarioAdministradorImpl = new UsuarioAdministradorImpl();

  constructor(
    private usuarioAdministradorService: UsuarioAdministradorService,
    private cenadService: CenadService,
    private router: Router) { }


  ngOnInit() {
    this.cenadService.getCenads().subscribe((response) => this.cenads = this.cenadService.extraerCenads(response));
    
    setTimeout(()=> {
      for (let c of this.cenads) {
        this.usuarioAdministradorService.getUsuarioAdministrador(c).subscribe((response) => c.usuarioAdministrador = this.usuarioAdministradorService.mapearUsuario(response));
    
        setTimeout(() => {
          if (c.usuarioAdministrador) {
            c.tieneAdmin = true;
          }
          this.cenadsSinAdmin = this.cenads.filter(c => !c.tieneAdmin);
        }, 1000);
      }
    }, 1000);
    
  }

  crearUsuarioAdministrador(): void {
    this.usuarioAdministradorService.create(this.usuarioAdministrador).subscribe((response) => {
      console.log(`He creado el Administrador ${this.usuarioAdministrador.nombre}`);
      this.router.navigate(['/superadministrador']);
    });
  }

}
