import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePrincipalComponent } from './home-principal/home-principal.component';
import { ShellPrincipalComponent } from './shell-principal/shell-principal.component';

const routes: Routes = [
  {
    path: '',
    component: ShellPrincipalComponent,
    children: [
      {//pagina principal de cada cenad
        path: '',
        component: HomePrincipalComponent
      },
      {//listado de categorias de cada cenad
        path: 'categorias/:idCenad',
        loadChildren: () => import('../categorias/categorias.module').then(m => m.CategoriasModule)
      },
      {//listado de recursos de cada cenad (administrador)
        path: 'recursos/:idCenad',
        loadChildren: () => import('../recursos/recursos.module').then(m => m.RecursosModule)
      },
      {//listado de recursos de cada cenad (gestor/usuario)
        path: 'consultaRecursos/:idCenad',
        loadChildren: () => import('../consultaRecursos/consultaRecursos.module').then(m => m.ConsultaRecursosModule)
      },
      {//listado de gestores/usuarios normal de cada cenad (administrador)
        path: 'usuarios/:idCenad',
        loadChildren: () => import('../usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {//listado de unidades
        path: 'unidades/:idCenad',
        loadChildren: () => import('../unidades/unidades.module').then(m => m.UnidadesModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalCenadRoutingModule {}