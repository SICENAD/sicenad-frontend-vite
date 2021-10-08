import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { CategoriaFichero } from '../models/categoriaFichero';
import { CategoriaFicheroImpl } from '../models/categoriaFichero-impl';
import { CategoriaFicheroService } from '../service/categoriaFichero.service';


@Component({
  selector: 'app-categoriasFichero',
  templateUrl: './categoriasFichero.component.html',
  styleUrls: ['./categoriasFichero.component.css']
})
export class CategoriasFicheroComponent implements OnInit {

  categoriasFichero: CategoriaFichero[] = [];
  categoriaFicheroVerDatos: CategoriaFichero;
  faVolver = faArrowAltCircleLeft;

  constructor(
    private categoriaFicheroService: CategoriaFicheroService,
    private router: Router) { }

    ngOnInit(): void {
      this.categoriaFicheroService.getCategoriasFichero().subscribe((response) => this.categoriasFichero = this.categoriaFicheroService.extraerCategoriasFichero(response));
    }
  
    verDatos(categoriaFichero: CategoriaFichero): void {
      this.categoriaFicheroVerDatos = categoriaFichero;
    }
  
    onCategoriaFicheroEliminar(categoriaFichero: CategoriaFichero): void {
      this.categoriaFicheroService.delete(categoriaFichero).subscribe(response => {
        console.log(`He borrado la Categoría de Fichero ${categoriaFichero.nombre}`);
        this.router.navigate(['/categoriasFichero']);
      });
    }
  
    onCategoriaFicheroEditar(categoriaFichero: CategoriaFicheroImpl): void {
      this.categoriaFicheroService.update(categoriaFichero).subscribe(response => {
        console.log(`He actualizado la Categoría de Fichero ${categoriaFichero.nombre}`);
        this.router.navigate(['/categoriasFichero']);
      });
    }
  }
