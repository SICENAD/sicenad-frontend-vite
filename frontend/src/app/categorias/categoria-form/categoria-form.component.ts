import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria';
import { CategoriaImpl } from '../models/categoria-impl';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {
  //variable para recuperar el id del CENAD/CMT
  idCenad: string = "";
  //variable con la que guardar la nueva categoria
  categoria: Categoria = new CategoriaImpl();
  //variable en la que meteremos las categorias de este CENAD/CMT para poder seleccionarlas como categoria padre
  categorias: Categoria[] = [];
  //variable para icono "volver"
  faVolver =faArrowAltCircleLeft;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    //recuperamos el id del CENAD de la barra de navegacion
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    //metemos en la variable todas las categorias del cenad, para seleccionar la categoria padre
    this.categorias = JSON.parse(localStorage.getItem(`categorias_${this.idCenad}`));
    //asignamos el CENAD a la categoria que creamos
    this.categoria.cenad = `${environment.hostSicenad}cenads/${this.idCenad}`;
  }

  //metodo para crear una nueva categoria y volver al listado de categorias de ese cenad
  crearCategoria(): void {
    this.categoriaService.create(this.categoria).subscribe((response) => {
        //actualizamos el localStorage
        this.categoriaService.getCategoriasPadreDeCenad(this.idCenad).subscribe((response) => localStorage.setItem(`categoriasPadre_${this.idCenad}`, JSON.stringify(this.categoriaService.extraerCategorias(response))));
        this.categoriaService.getCategoriasDeCenad(this.idCenad).subscribe((response) => {
          localStorage.setItem(`categorias_${this.idCenad}`, JSON.stringify(this.categoriaService.extraerCategorias(response)));
          console.log(`He creado la Categoria ${this.categoria.nombre}`);
          this.router.navigate([`/principalCenad/${this.idCenad}/categorias/${this.idCenad}`]);
        });
      });
  }
}
