import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { UsuarioNormalImpl } from '../../models/usuarioNormal-impl';
import { UsuarioNormalService } from '../../service/usuarioNormal.service';

@Component({
  selector: 'app-unidad-form',
  templateUrl: './unidad-form.component.html',
  styleUrls: ['./unidad-form.component.css']
})
export class UnidadFormComponent implements OnInit {
  //variable en la que se grabara el nuevo usuario normal
  usuarioNormal: UsuarioNormalImpl = new UsuarioNormalImpl();
  //variable del icono "volver"
  faVolver = faArrowAltCircleLeft;

  constructor(
    private usuarioNormalService: UsuarioNormalService,
    private router: Router) { }

  ngOnInit(): void {}

  //metodo para crear un usuario normal
  crearUsuarioNormal(): void {
    this.usuarioNormalService.create(this.usuarioNormal).subscribe((response) => {
      console.log(`He creado el Usuario Normal ${this.usuarioNormal.nombre}`);
      this.router.navigate(['/superadministrador']);
    });
  }
}