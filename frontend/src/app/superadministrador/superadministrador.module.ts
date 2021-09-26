import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadministradorRoutingModule } from './superadministrador-routing.module';
import { FormsModule } from '@angular/forms';
import { SuperadministradorComponent } from './superadministrador/superadministrador.component';
import { CenadFormComponent } from './cenads/cenad-form/cenad-form.component';
import { CenadComponent } from './cenads/cenad/cenad.component';
import { CenadFichaComponent } from './cenads/cenad-ficha/cenad-ficha.component';
import { AdministradorFormComponent } from './administradores/administrador-form/administrador-form.component';
import { AdministradorFichaComponent } from './administradores/administrador-ficha/administrador-ficha.component';
import { UnidadComponent } from './unidades/unidad/unidad.component';
import { UnidadFichaComponent } from './unidades/unidad-ficha/unidad-ficha.component';
import { UnidadFormComponent } from './unidades/unidad-form/unidad-form.component';


@NgModule({
  declarations: [SuperadministradorComponent, CenadComponent, CenadFichaComponent, CenadFormComponent, AdministradorFormComponent, AdministradorFichaComponent, UnidadComponent, UnidadFichaComponent, UnidadFormComponent],
  imports: [
    CommonModule,
    SuperadministradorRoutingModule,
    FormsModule
  ]
})
export class SuperadministradorModule { }
