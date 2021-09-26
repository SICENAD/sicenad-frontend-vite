import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorFormComponent } from './administradores/administrador-form/administrador-form.component';
import { CenadFormComponent } from './cenads/cenad-form/cenad-form.component';
import { SuperadministradorComponent } from './superadministrador/superadministrador.component';
import { UnidadFormComponent } from './unidades/unidad-form/unidad-form.component';


const routes: Routes = [
  {
    path: '',
    component: SuperadministradorComponent
  },
  {
    path: 'formulario-cenad',
    component: CenadFormComponent
  },
  {
    path: 'formulario-administrador',
    component: AdministradorFormComponent
  },
  {
    path: 'formulario-unidad',
    component: UnidadFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadministradorRoutingModule { }
