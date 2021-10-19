import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePrincipalComponent } from './home-principal/home-principal.component';
import { ShellPrincipalComponent } from './shell-principal/shell-principal.component';


const routes: Routes = [
  {
    path: '',
    component: ShellPrincipalComponent,
    children: [
      {
        path: '',
        component: HomePrincipalComponent
      },
      {
        path: 'categorias/:idCenad',
        loadChildren: () => import('../categorias/categorias.module').then(m => m.CategoriasModule)
      },
      {
        path: 'recursos/:idCenad',
        loadChildren: () => import('../recursos/recursos.module').then(m => m.RecursosModule)
      },
      {
        path: 'consultaRecursos/:idCenad',
        loadChildren: () => import('../consultaRecursos/consultaRecursos.module').then(m => m.ConsultaRecursosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalCenadRoutingModule { }
