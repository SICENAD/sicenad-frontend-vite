import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioNormalImpl } from '../../models/usuarioNormal-impl';
import { UsuarioNormalService } from '../../service/usuarioNormal.service';

@Component({
  selector: 'app-unidad-form',
  templateUrl: './unidad-form.component.html',
  styleUrls: ['./unidad-form.component.css']
})
export class UnidadFormComponent implements OnInit {

  usuarioNormal: UsuarioNormalImpl = new UsuarioNormalImpl();


  constructor(
    private usuarioNormalService: UsuarioNormalService,
    private router: Router) { }

    ngOnInit(): void {
    }

  crearUsuarioNormal(): void {
    this.usuarioNormalService.create(this.usuarioNormal).subscribe((response) => {
      console.log(`He creado el Usuario Normal ${this.usuarioNormal.nombre}`);
      this.router.navigate(['/superadministrador']);
    });
  }

}