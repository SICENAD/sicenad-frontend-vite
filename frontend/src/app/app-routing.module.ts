import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
     path: 'principalCenad/:idCenad',
     loadChildren: () => import('./principal-cenad/principal-cenad.module').then(m => m.PrincipalCenadModule)
   },
  {
    path: 'superadministrador',
    loadChildren: () => import('./superadministrador/superadministrador.module').then(m => m.SuperadministradorModule),
  },
  {
    path: 'tiposRecurso',
    loadChildren: () => import('./tiposRecurso/tiposRecurso.module').then(m => m.TiposRecursoModule),
  },
  // {
  //   path: 'categorias/:idCenad',
  //   loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule),
  // },
  // {
  //   path: 'recursos',
  //   loadChildren: () => import('./recursos/recursos.module').then(m => m.RecursosModule),
  // },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found',
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
