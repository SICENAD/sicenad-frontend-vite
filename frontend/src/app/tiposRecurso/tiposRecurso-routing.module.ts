import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoRecursoFormComponent } from './tipoRecurso-form/tipoRecurso-form.component';
import { TiposRecursoComponent } from './tiposRecurso/tiposRecurso.component';

const routes: Routes = [
  {
    path: '',
    component: TiposRecursoComponent
  },
  {
    path: 'formulario',
    component: TipoRecursoFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposRecursoRoutingModule { }
