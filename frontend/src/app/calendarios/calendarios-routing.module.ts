import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarioCenadComponent } from './calendario-cenad/calendario-cenad.component';
import { PlanificacionCalendarioFormComponent } from './planificacion-calendario-form/planificacion-calendario-form.component';


const routes: Routes = [
  {
    path: '',
    component: CalendarioCenadComponent
  },
  {
    path: 'formulario/:idCenad/:idSolicitud',
    component: PlanificacionCalendarioFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendariosRoutingModule { }
