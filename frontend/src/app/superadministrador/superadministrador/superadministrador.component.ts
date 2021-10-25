import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Cenad } from '../models/cenad';
import { CenadImpl } from '../models/cenad-impl';
import { CenadService } from '../service/cenad.service';

@Component({
  selector: 'app-superadministrador',
  templateUrl: './superadministrador.component.html',
  styleUrls: ['./superadministrador.component.css']
})
export class SuperadministradorComponent implements OnInit {
  //variable del icono "inicio"
  faHome = faHome;
  //variable que guarda todos los cenads
  cenads: Cenad[] = [];
  //variable que comunicara los datos del cenad
  cenadVerDatos: Cenad;
  constructor(
    private cenadService: CenadService,
    private router: Router) { }

    ngOnInit(): void {
      //recupera todos los cenads de la BD
      this.cenadService.getCenads().subscribe((response) => this.cenads = this.cenadService.extraerCenads(response));
    }

    //metodo para traspasar los datos del cenad
    verDatosCenad(cenad: Cenad): void {
      this.cenadVerDatos = cenad;
    }

    //metodo para eliminar un cenad
    onCenadEliminar(cenad: CenadImpl): void {
      this.cenadService.delete(cenad).subscribe(response => {
        console.log(`He borrado el CENAD/CMT ${cenad.nombre}`);
        this.router.navigate(['/superadministrador']);
      });
    }
    //metodo para editar un cenad
    onCenadEditar(cenad: CenadImpl): void {
      this.cenadService.update(cenad).subscribe(response => {
        console.log(`He actualizado el CENAD/CMT ${cenad.nombre} en la provincia ${cenad.provincia}`);
        this.router.navigate(['/superadministrador']);
      });
    }
  }