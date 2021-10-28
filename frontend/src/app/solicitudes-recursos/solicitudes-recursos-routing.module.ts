import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudRecursoFormComponent } from './solicitud-recurso-form/solicitud-recurso-form.component';
import { SolicitudesRecursosComponent } from './solicitudes-recursos/solicitudes-recursos.component';
import { SolicitudesTodasComponent } from './solicitudes-todas/solicitudes-todas.component';


const routes: Routes = [
  {
    path: '',
    component: SolicitudesRecursosComponent
  },
  {
    path: 'solicitudesTodas/:idCenad',
    component: SolicitudesTodasComponent
  },
  {
    path: 'formulario/:idCenad/:idSolicitud',
    component: SolicitudRecursoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRecursosRoutingModule { }
