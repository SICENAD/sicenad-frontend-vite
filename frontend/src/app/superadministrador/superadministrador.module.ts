import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadministradorRoutingModule } from './superadministrador-routing.module';
import { FormsModule } from '@angular/forms';
import { SuperadministradorComponent } from './superadministrador/superadministrador.component';
import { CenadFormComponent } from './cenads/cenad-form/cenad-form.component';
import { CenadComponent } from './cenads/cenad/cenad.component';
import { CenadFichaComponent } from './cenads/cenad-ficha/cenad-ficha.component';
import { UnidadComponent } from './unidades/unidad/unidad.component';
import { UnidadFichaComponent } from './unidades/unidad-ficha/unidad-ficha.component';
import { UnidadFormComponent } from './unidades/unidad-form/unidad-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [SuperadministradorComponent, CenadComponent, CenadFichaComponent, CenadFormComponent, UnidadComponent, UnidadFichaComponent, UnidadFormComponent],
  imports: [
    CommonModule,
    SuperadministradorRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class SuperadministradorModule {}