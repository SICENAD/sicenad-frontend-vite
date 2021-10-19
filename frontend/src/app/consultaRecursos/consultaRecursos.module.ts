import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConsultaRecursosComponent } from './consultaRecursos/consultaRecursos.component';
import { ConsultaRecursosRoutingModule } from './consultaRecursos-routing.module';
import { ConsultaRecursoComponent } from './consultaRecurso/consultaRecurso.component';
import { ConsultaRecursoFormComponent } from './consultaRecurso-form/consultaRecurso-form.component';
import { FicheroComponent } from './fichero/fichero.component';


@NgModule({
  declarations: [ConsultaRecursosComponent, ConsultaRecursoComponent, ConsultaRecursoFormComponent, FicheroComponent],
  imports: [
    CommonModule,
    ConsultaRecursosRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class ConsultaRecursosModule { }
