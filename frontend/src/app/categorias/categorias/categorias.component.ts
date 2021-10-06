import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../models/categoria';
import { CategoriaImpl } from '../models/categoria-impl';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  idCenad: string = "";
  categorias: Categoria[] = [];
  categoriaVerDatos: Categoria;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
    , private activateRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.idCenad = this.activateRoute.snapshot.params['idCenad'];
      this.categoriaService.getCategoriasDeCenad(this.idCenad).subscribe((response) => {
        this.categorias = this.categoriaService.extraerCategorias(response);
        //console.log(this.categorias);
      });
    }

    verDatos(categoria: Categoria): void {
      this.categoriaVerDatos = categoria;
    }

    onCategoriaEliminar(categoria: CategoriaImpl): void {
      this.categoriaService.delete(categoria).subscribe(response => {
        console.log(`He borrado la Categoria ${categoria.nombre}`);
        this.router.navigate([`/principalCenad/${this.idCenad}/categorias/${this.idCenad}`]);
      });
    }

    onCategoriaEditar(categoria: CategoriaImpl): void {
      this.categoriaService.update(categoria).subscribe(response => {
        console.log(`He actualizado la Categoria ${categoria.nombre}`);
        this.router.navigate([`/principalCenad/${this.idCenad}/categorias/${this.idCenad}`]);
      });
    }
  }
