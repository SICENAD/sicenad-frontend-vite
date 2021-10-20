import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component'

const routes: Routes = [
  {//mostrara el Home de la aplicacion, con el mapa para seleccionar cenad
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {//mostrara la pagina principal de cada cenad
     path: 'principalCenad/:idCenad',
     loadChildren: () => import('./principal-cenad/principal-cenad.module').then(m => m.PrincipalCenadModule)
   },
  {//mostrara el modulo de superadministrador, si el rol lo permite
    path: 'superadministrador',
    loadChildren: () => import('./superadministrador/superadministrador.module').then(m => m.SuperadministradorModule)
  },
  {//mostrara el modulo de tipos de formulario, si el rol lo permite
    path: 'tiposFormulario',
    loadChildren: () => import('./tiposFormulario/tiposFormulario.module').then(m => m.TiposFormularioModule)
  },
  {//mostrara el modulo de categorias de fichero, si el rol lo permite
    path: 'categoriasFichero',
    loadChildren: () => import('./categoriasFichero/categoriasFichero.module').then(m => m.CategoriasFicheroModule)
  },
  {//mostrara el modulo de unidades, si el rol lo permite
    path: 'unidades',
    loadChildren: () => import('./unidades/unidades.module').then(m => m.UnidadesModule)
  },
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