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

  tiposFormulario: TipoFormulario[] = [];
  tipoFormularioVerDatos: TipoFormulario;
  faVolver = faArrowAltCircleLeft;

  constructor(
    private tipoFormularioService: TipoFormularioService,
    private router: Router) { }

    ngOnInit(): void {
      this.tipoFormularioService.getTiposFormulario().subscribe((response) => this.tiposFormulario = this.tipoFormularioService.extraerTiposFormulario(response));
    }
  
    verDatos(tipoFormulario: TipoFormulario): void {
      this.tipoFormularioVerDatos = tipoFormulario;
    }
  
    onTipoFormularioEliminar(tipoFormulario: TipoFormulario): void {
      this.tipoFormularioService.delete(tipoFormulario).subscribe(response => {
        console.log(`He borrado el Tipo de Formulario ${tipoFormulario.nombre}`);
        this.router.navigate(['/tiposFormulario']);
      });
    }
  
    onTipoFormularioEditar(tipoFormulario: TipoFormularioImpl): void {
      this.tipoFormularioService.update(tipoFormulario).subscribe(response => {
        console.log(`He actualizado el Tipo de Formulario ${tipoFormulario.nombre}`);
        this.router.navigate(['/tiposFormulario']);
      });
    }
  }
