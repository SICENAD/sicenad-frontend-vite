import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Arma } from '../models/arma';
import { ArmaImpl } from '../models/arma-impl';
import { ArmaService } from '../service/arma.service';

@Component({
  selector: 'app-armas',
  templateUrl: './armas.component.html',
  styleUrls: ['./armas.component.css']
})
export class ArmasComponent implements OnInit {
  //variable que recoge todas las armas
  armas: Arma[] = [];
  //variable que relaciona cada arma con sus datos
  armaVerDatos: Arma;
  //variable del icono "volver"
  faVolver = faArrowAltCircleLeft;

  constructor(
    private armaService: ArmaService,
    private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //recoge del local storage en la variable todas las armas
    this.armas = JSON.parse(localStorage.armas);
  }

  //metodo para poder mostrar los datos del arma
  verDatos(arma: Arma): void {
    this.armaVerDatos = arma;
  }
  
  //metodo para eliminar un arma y volver al listado
  onArmaEliminar(arma: ArmaImpl): void {
    this.armaService.delete(arma).subscribe(response => {
      //actualizo el local storage
      this.armaService.getArmas().subscribe((response) => {
        localStorage.armas = JSON.stringify(this.armaService.extraerArmas(response));
        console.log(`He borrado el arma ${arma.nombre}`);
        this.router.navigate(['/armas']);
      });
    });
  }

  //metodo para editar un arma y volver al listado
  onArmaEditar(arma: ArmaImpl): void {
    this.armaService.update(arma).subscribe(response => {
      //actualizo el local storage
      this.armaService.getArmas().subscribe((response) => {
        localStorage.armas = JSON.stringify(this.armaService.extraerArmas(response));
        console.log(`He actualizado el arma ${arma.nombre}`);
        this.router.navigate(['/armas']);
      });
    });
  }
}