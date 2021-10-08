import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { CategoriaFichero } from '../models/categoriaFichero';
import { CategoriaFicheroImpl } from '../models/categoriaFichero-impl';
import { CategoriaFicheroService } from '../service/categoriaFichero.service';

@Component({
  selector: 'app-categoriaFichero-form',
  templateUrl: './categoriaFichero-form.component.html',
  styleUrls: ['./categoriaFichero-form.component.css']
})
export class CategoriaFicheroFormComponent implements OnInit {

  categoriaFichero: CategoriaFicheroImpl = new CategoriaFicheroImpl();
  categoriasFichero: CategoriaFichero[] = [];
  faVolver = faArrowAltCircleLeft;

  constructor(
    private categoriaFicheroService: CategoriaFicheroService,
    private router: Router) { }

  ngOnInit() {  }

  crearCategoriaFichero(): void {
    this.categoriaFicheroService.create(this.categoriaFichero).subscribe((response) => {
      console.log(`He creado la Categoría de Fichero ${this.categoriaFichero.nombre}`);
      this.router.navigate(['/categoriasFichero']);
    });
  }
}
