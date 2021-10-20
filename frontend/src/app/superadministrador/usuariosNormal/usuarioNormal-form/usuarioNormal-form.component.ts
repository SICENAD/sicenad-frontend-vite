import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  //variable en la que se grabara el nuevo usuario normal
  usuarioNormal: UsuarioNormalImpl = new UsuarioNormalImpl();
  //variable para cargar todas las unidades
  unidades: Unidad[] = [];
  //variable del icono "volver"
  faVolver = faArrowAltCircleLeft;

  constructor(
    private usuarioNormalService: UsuarioNormalService,
    private router: Router) { }

  ngOnInit(): void {
    //rescata de la BD las unidades
    this.usuarioNormalService.getUnidades().subscribe((response) => this.unidades = this.usuarioNormalService.extraerUnidades(response));
  }

  //metodo para crear un usuario normal
  crearUsuarioNormal(): void {
    this.usuarioNormalService.create(this.usuarioNormal).subscribe((response) => {
      console.log(`He creado el Usuario Normal ${this.usuarioNormal.nombre}`);
      this.router.navigate(['/superadministrador']);
    });
  }
}