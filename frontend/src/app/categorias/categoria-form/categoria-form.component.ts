import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { Categoria } from '../models/categoria';
import { CategoriaImpl } from '../models/categoria-impl';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  categoria: CategoriaImpl = new CategoriaImpl();
  categorias: Categoria[] = [];
  cenads: Cenad[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private router: Router) { }


  ngOnInit() {
    this.categoriaService.getCategorias().subscribe((response) => this.categorias = this.categoriaService.extraerCategorias(response));
    this.categoriaService.getCenads().subscribe((response) => this.cenads = this.categoriaService.extraerCenads(response));
  }

  crearCategoria(): void {
    this.categoriaService.create(this.categoria).subscribe((response) => {
      console.log(`He creado la Categoria ${this.categoria.nombre}`);
      this.router.navigate(['/categorias']);
    });
  }

}
