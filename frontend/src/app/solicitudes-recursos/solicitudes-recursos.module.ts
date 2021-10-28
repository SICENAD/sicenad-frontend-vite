import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesRecursosRoutingModule } from './solicitudes-recursos-routing.module';
import { SolicitudesRecursosComponent } from './solicitudes-recursos/solicitudes-recursos.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SolicitudRecursoComponent } from './solicitud-recurso/solicitud-recurso.component';
import { SolicitudRecursoFormComponent } from './solicitud-recurso-form/solicitud-recurso-form.component';
import { SolicitudesTodasComponent } from './solicitudes-todas/solicitudes-todas.component';


@NgModule({
  declarations: [SolicitudesRecursosComponent, SolicitudRecursoComponent, SolicitudRecursoFormComponent, SolicitudesTodasComponent],
  imports: [
    CommonModule,
    SolicitudesRecursosRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class SolicitudesRecursosModule { }
