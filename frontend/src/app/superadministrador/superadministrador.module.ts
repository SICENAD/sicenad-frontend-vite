import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadministradorRoutingModule } from './superadministrador-routing.module';
import { FormsModule } from '@angular/forms';
import { SuperadministradorComponent } from './superadministrador/superadministrador.component';
import { CenadFormComponent } from './cenads/cenad-form/cenad-form.component';
import { CenadComponent } from './cenads/cenad/cenad.component';
import { CenadFichaComponent } from './cenads/cenad-ficha/cenad-ficha.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsuarioNormalFormComponent } from './usuariosNormal/usuarioNormal-form/usuarioNormal-form.component';
import { UsuarioNormalFichaComponent } from './usuariosNormal/usuarioNormal-ficha/usuarioNormal-ficha.component';
import { UsuarioNormalComponent } from './usuariosNormal/usuarioNormal/usuarioNormal.component';

@NgModule({
  declarations: [SuperadministradorComponent, CenadComponent, CenadFichaComponent, CenadFormComponent, UsuarioNormalComponent, UsuarioNormalFichaComponent, UsuarioNormalFormComponent],
  imports: [
    CommonModule,
    SuperadministradorRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class SuperadministradorModule {}