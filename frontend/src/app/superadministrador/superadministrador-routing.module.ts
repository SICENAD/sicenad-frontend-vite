import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenadFormComponent } from './cenads/cenad-form/cenad-form.component';
import { SuperadministradorComponent } from './superadministrador/superadministrador.component';
import { UsuarioNormalFormComponent } from './usuariosNormal/usuarioNormal-form/usuarioNormal-form.component';

const routes: Routes = [
  {//muestra la pantalla inicial del superadministrador
    path: '',
    component: SuperadministradorComponent
  },
  {//para crear un cenad
    path: 'formulario-cenad',
    component: CenadFormComponent
  },
  {//para crear una unidad o usuarioNormal
    path: 'formulario-usuarioNormal',
    component: UsuarioNormalFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadministradorRoutingModule {}