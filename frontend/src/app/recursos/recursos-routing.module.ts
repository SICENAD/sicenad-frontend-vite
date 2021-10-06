import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecursoFormComponent } from './recurso-form/recurso-form.component';
import { RecursosComponent } from './recursos/recursos.component';


const routes: Routes = [
  {
    path: '',
    component: RecursosComponent
  },
  {
    path: 'formulario/:idCenad',
    component: RecursoFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursosRoutingModule { }
