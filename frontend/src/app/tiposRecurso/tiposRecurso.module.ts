import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TiposRecursoRoutingModule } from './tiposRecurso-routing.module';
import { TiposRecursoComponent } from './tiposRecurso/tiposRecurso.component';
import { TipoRecursoComponent } from './tipoRecurso/tipoRecurso.component';
import { TipoRecursoFichaComponent } from './tiposRecurso/tipoRecurso-ficha/tipoRecurso-ficha.component';
import { TipoRecursoFormComponent } from './tipoRecurso-form/tipoRecurso-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [TiposRecursoComponent, TipoRecursoComponent, TipoRecursoFichaComponent, TipoRecursoFormComponent],
  imports: [
    CommonModule,
    TiposRecursoRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class TiposRecursoModule { }
