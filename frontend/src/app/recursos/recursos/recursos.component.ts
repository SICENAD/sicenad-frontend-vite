import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recurso } from '../models/recurso';
import { RecursoImpl } from '../models/recurso-impl';
import { RecursoService } from '../service/recurso.service';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent implements OnInit {

  idCenad: string = "";
  recursos: Recurso[] = [];
  recursoVerDatos: Recurso;

  constructor(
    private recursoService: RecursoService,
    private router: Router, private activateRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.idCenad = this.activateRoute.snapshot.params['idCenad'];
      this.recursoService.getRecursosDeCenad(this.idCenad).subscribe((response) => this.recursos = this.recursoService.extraerRecursos(response));
      //this.recursoService.getRecursos().subscribe((response) => this.recursos = this.recursoService.extraerRecursos(response));
    }

    verDatos(recurso: Recurso): void {
      this.recursoVerDatos = recurso;
    }

    onRecursoEliminar(recurso: RecursoImpl): void {
      this.recursoService.delete(recurso).subscribe(response => {
        console.log(`He borrado el recurso ${recurso.nombre}`);
        this.router.navigate([`/principalCenad/${this.idCenad}/recursos/${this.idCenad}`]);
      });
    }

    onRecursoEditar(recurso: RecursoImpl): void {
      //console.log(recurso);
      this.recursoService.update(recurso).subscribe(response => {
        console.log(`He actualizado el recurso ${recurso.nombre}`);
        this.router.navigate([`/principalCenad/${this.idCenad}/recursos/${this.idCenad}`]);
      });
    }
  }
