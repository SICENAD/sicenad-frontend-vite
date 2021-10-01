import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalCenadRoutingModule } from './principal-cenad-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrincipalCenadComponent } from './principal-cenad/principal-cenad.component';


@NgModule({
  declarations: [PrincipalCenadComponent],
  imports: [
    CommonModule,
    PrincipalCenadRoutingModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class PrincipalCenadModule { }
