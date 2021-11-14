import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarioCenadComponent } from './calendario-cenad/calendario-cenad.component';


const routes: Routes = [
  {
    path: '',
    component: CalendarioCenadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendariosRoutingModule { }
