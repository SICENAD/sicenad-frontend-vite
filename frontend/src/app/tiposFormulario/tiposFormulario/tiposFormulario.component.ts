import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { TipoFormulario } from '../models/tipoFormulario';
import { TipoFormularioImpl } from '../models/tipoFormulario-impl';
import { TipoFormularioService } from '../service/tipoFormulario.service';

@Component({
  selector: 'app-tiposFormulario',
  templateUrl: './tiposFormulario.component.html',
  styleUrls: ['./tiposFormulario.component.css']
})
export class TiposFormularioComponent implements OnInit {
  //variable que recoge todos los tipos de formulario
  tiposFormulario: TipoFormulario[] = [];
  //variable que relaciona cada tipo de formulario con sus datos
  tipoFormularioVerDatos: TipoFormulario;
  //variable del icono "volver"
  faVolver = faArrowAltCircleLeft;

  constructor(
    private tipoFormularioService: TipoFormularioService,
    private router: Router) { }

  ngOnInit(): void {
    //recoge del local storage en la variable todos los tipos de formulario
    this.tiposFormulario = JSON.parse(localStorage.tiposFormulario);
  }
  
  //metodo para poder mostrar los datos del tipo de formulario
  verDatos(tipoFormulario: TipoFormulario): void {
    this.tipoFormularioVerDatos = tipoFormulario;
  }
  
  //metodo para eliminar un tipo de formulario y volver al listado
  onTipoFormularioEliminar(tipoFormulario: TipoFormulario): void {
    this.tipoFormularioService.delete(tipoFormulario).subscribe(response => {
      //actualizo el local storage
      this.tipoFormularioService.getTiposFormulario().subscribe((response) => localStorage.tiposFormulario = JSON.stringify(this.tipoFormularioService.extraerTiposFormulario(response)));
      console.log(`He borrado el Tipo de Formulario ${tipoFormulario.nombre}`);
      this.router.navigate(['/tiposFormulario']);
    });
  }

  //metodo para editar un tipo de formulario y volver al listado
  onTipoFormularioEditar(tipoFormulario: TipoFormularioImpl): void {
    this.tipoFormularioService.update(tipoFormulario).subscribe(response => {
      //actualizo el local storage
      this.tipoFormularioService.getTiposFormulario().subscribe((response) => localStorage.tiposFormulario = JSON.stringify(this.tipoFormularioService.extraerTiposFormulario(response)));
      console.log(`He actualizado el Tipo de Formulario ${tipoFormulario.nombre}`);
      this.router.navigate(['/tiposFormulario']);
    });
  }
}