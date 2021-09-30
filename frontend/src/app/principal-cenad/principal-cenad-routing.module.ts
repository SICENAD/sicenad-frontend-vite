import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalCenadComponent } from '../principalCenad/principal-cenad/principal-cenad.component';


const routes: Routes = [
  {
    path: '',
    component: PrincipalCenadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalCenadRoutingModule { }
