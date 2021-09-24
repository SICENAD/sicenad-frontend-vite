import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CenadsRoutingModule } from './cenads-routing.module';
import { CenadsComponent } from './cenads/cenads.component';
import { CenadComponent } from './cenad/cenad.component';
import { CenadFormComponent } from './cenad-form/cenad-form.component';
import { CenadFichaComponent } from './cenads/cenad-ficha/cenad-ficha.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CenadsComponent, CenadComponent, CenadFormComponent, CenadFichaComponent],
  imports: [
    CommonModule,
    CenadsRoutingModule,
    FormsModule
  ]
})
export class CenadsModule { }
