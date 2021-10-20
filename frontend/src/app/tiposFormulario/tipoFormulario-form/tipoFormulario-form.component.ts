import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { TipoFormulario } from '../models/tipoFormulario';
import { TipoFormularioImpl } from '../models/tipoFormulario-impl';
import { TipoFormularioService } from '../service/tipoFormulario.service';

@Component({
  selector: 'app-tipoFormulario-form',
  templateUrl: './tipoFormulario-form.component.html',
  styleUrls: ['./tipoFormulario-form.component.css']
})
export class TipoFormularioFormComponent implements OnInit {
  //variable para guardar el nuevo tipo de formulario
  tipoFormulario: TipoFormularioImpl = new TipoFormularioImpl();
  //variable del icono "volver"
  faVolver = faArrowAltCircleLeft;

  constructor(
    private tipoFormularioService: TipoFormularioService,
    private router: Router) { }

  ngOnInit() {
  }

  //metodo que crea un tipo de formulario y vuelve al listado de tipos de formulario
  crearTipoFormulario(): void {
    this.tipoFormularioService.create(this.tipoFormulario).subscribe((response) => {
      console.log(`He creado el Tipo de Formulario ${this.tipoFormulario.nombre}`);
      this.router.navigate(['/tiposFormulario']);
    });
  }
}