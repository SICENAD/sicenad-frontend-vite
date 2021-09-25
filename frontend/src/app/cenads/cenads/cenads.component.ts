import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cenad } from '../models/cenad';
import { CenadImpl } from '../models/cenad-impl';
import { CenadService } from '../service/cenad.service';

@Component({
  selector: 'app-cenads',
  templateUrl: './cenads.component.html',
  styleUrls: ['./cenads.component.css']
})
export class CenadsComponent implements OnInit {

  cenads: Cenad[] = [];
  cenadVerDatos: Cenad;

  constructor(
    private cenadService: CenadService,
    private router: Router) { }

    ngOnInit(): void {
      this.cenadService.getCenads().subscribe((response) => this.cenads = this.cenadService.extraerCenads(response));
    }
  
    verDatos(cenad: Cenad): void {
      this.cenadVerDatos = cenad;
    }
  
    onCenadEliminar(cenad: CenadImpl): void {
      this.cenadService.delete(cenad).subscribe(response => {
        console.log(`He borrado el CENAD/CMT ${cenad.nombre}`);
        this.router.navigate(['/cenads']);
      });
    }
  
    onCenadEditar(cenad: CenadImpl): void {
      this.cenadService.update(cenad).subscribe(response => {
        console.log(`He actualizado el CENAD/CMT ${cenad.nombre} en la provincia ${cenad.provincia}`);
        this.router.navigate(['/cenads']);
      });
    }
  }
