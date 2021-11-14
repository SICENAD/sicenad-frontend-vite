import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';

import { CalendariosRoutingModule } from './calendarios-routing.module';
import { CalendarioCenadComponent } from './calendario-cenad/calendario-cenad.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CalendarioCenadComponent],
  imports: [
    CommonModule,
    CalendariosRoutingModule,
    FullCalendarModule,
    FormsModule,
    FontAwesomeModule
  
  ]
})
export class CalendariosModule { }
