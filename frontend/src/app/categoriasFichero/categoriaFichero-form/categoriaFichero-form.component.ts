import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { CategoriaFicheroImpl } from '../models/categoriaFichero-impl';
import { CategoriaFicheroService } from '../service/categoriaFichero.service';

@Component({
  selector: 'app-categoriaFichero-form',
  templateUrl: './categoriaFichero-form.component.html',
  styleUrls: ['./categoriaFichero-form.component.css']
})
export class CategoriaFicheroFormComponent implements OnInit {
  //variable con la que guardar la nueva categoria de fichero
  categoriaFichero: CategoriaFicheroImpl = new CategoriaFicheroImpl();
  //variable para icono "volver"
  faVolver = faArrowAltCircleLeft;

  constructor(
    private categoriaFicheroService: CategoriaFicheroService,
    private router: Router) { }

  ngOnInit() {  }

  //metodo para crear una nueva categoria de fichero y volver al listado de categorias de fichero
  crearCategoriaFichero(): void {
    console.log(this.categoriaFichero.descripcion);

    this.categoriaFicheroService.create(this.categoriaFichero).subscribe((response) => {
      console.log(`He creado la Categoría de Fichero ${this.categoriaFichero.nombre}`);
      this.router.navigate(['/categoriasFichero']);
    });
  }
}