import { Component, Input, OnInit } from '@angular/core';
import { Arma } from 'src/app/armas/models/arma';
import { ArmaImpl } from 'src/app/armas/models/arma-impl';
import { SolicitudArma } from '../../models/solicitud-arma';
import { SolicitudArmaImpl } from '../../models/solicitud-arma-impl';
import { SolicitudRecursoService } from '../../service/solicitud-recurso.service';
import { SolicitudRecursoFormComponent } from '../solicitud-recurso-form.component';

@Component({
  selector: 'app-arma',
  templateUrl: './arma.component.html',
  styleUrls: ['./arma.component.css']
})
export class ArmaComponent implements OnInit {
  //para habilitar la edición de los campos del formulario
  @Input() isConsulta: boolean;
  //instancia objeto SolicitudArma que recibe del componente SolicitudRecursoForm
  @Input() solicitudArma: SolicitudArma;
  //instancia objeto Arma
  arma: Arma = new ArmaImpl();
  //array Arma
  armas: Arma[] = [];
  //para controlar si encuentra el objeto arma que tiene una solicitudArma
  test: boolean = false;

  constructor(private solicitudService: SolicitudRecursoService) { }

  ngOnInit() {
    this.test = false;
    //obtiene todas las armas 
    this.solicitudService.getArmas().subscribe((response) => {
      this.armas = this.solicitudService.extraerArmas(response);
      //si la instancia del objeto solicitudArma tiene asociado un arma
      //el campo armaId contiene su id
      this.armas.forEach(a => {
        if (a.idArma == this.solicitudArma.armaId) {
          this.arma = a;
          this.test = true;
        }
      });
      //si la solicitudArma se acaba de crear y se ha asociado un arma
      //el campo solicitudArma.arma contiene el endpoint del arma
      if (this.test == false) {
        this.armas.forEach(a => {
          a.url == this.solicitudArma.arma ? this.arma = a : "";
        });
      }
    });
  }

  actualizar(): void {
    if (this.solicitudArma.idSolicitudArma) {
      this.solicitudService.updateSolicitudArma(this.solicitudArma).subscribe((response) => {
        console.log(response);
        //actualiza la variable estática que contiene el array de solicitudArma
        SolicitudRecursoFormComponent.solicitudesArmasZCdeSolicitud.forEach(s => {
          if (s.idSolicitudArma === this.solicitudArma.idSolicitudArma) {
            s = this.solicitudArma;
          }
        });
      });
    }

  }

  borrar(): void {
    if (this.solicitudArma.idSolicitudArma) {
      //elimina de la variable estática la solicitud arma que se ha eliminado
      SolicitudRecursoFormComponent.solicitudesArmasZCdeSolicitud = SolicitudRecursoFormComponent.solicitudesArmasZCdeSolicitud.filter(s => {
        s.idSolicitudArma != this.solicitudArma.idSolicitudArma;
      });
      console.log('estatica', SolicitudRecursoFormComponent.solicitudesArmasZCdeSolicitud);
      this.solicitudService.deleteSolicitudArma(this.solicitudArma).subscribe((response) => {
        //console.log('he borrado la solicitud', this.solicitudArma); 
        console.log(response);
        //se crean instancias de los objetos para inicializar sus valores y el modal se actualice
        this.solicitudArma = new SolicitudArmaImpl();
        this.arma = new ArmaImpl();
      });
    }
  }

}
