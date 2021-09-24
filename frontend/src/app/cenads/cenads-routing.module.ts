import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenadFormComponent } from './cenad-form/cenad-form.component';
import { CenadsComponent } from './cenads/cenads.component';


const routes: Routes = [
  {
    path: '',
    component: CenadsComponent
  },
  {
    path: 'formulario',
    component: CenadFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CenadsRoutingModule { }
