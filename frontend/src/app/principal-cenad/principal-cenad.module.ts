import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalCenadRoutingModule } from './principal-cenad-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrincipalCenadRoutingModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class PrincipalCenadModule { }
