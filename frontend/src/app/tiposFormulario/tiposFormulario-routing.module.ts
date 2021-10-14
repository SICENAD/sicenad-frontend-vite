import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoFormularioFormComponent } from './tipoFormulario-form/tipoFormulario-form.component';
import { TiposFormularioComponent } from './tiposFormulario/tiposFormulario.component';


const routes: Routes = [
  {
    path: '',
    component: TiposFormularioComponent
  },
  {
    path: 'formulario',
    component: TipoFormularioFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposFormularioRoutingModule { }
