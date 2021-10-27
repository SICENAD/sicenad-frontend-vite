import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { CanActivateViaLoggingAdministrador } from './logging/canActivateViaLoggingAdministrador';
import { CanActivateViaLoggingGestor } from './logging/canActivateViaLoggingGestor';
import { CanActivateViaLoggingNormal } from './logging/canActivateViaLoggingNormal';
import { CanActivateViaLoggingSuperadministrador } from './logging/canActivateViaLoggingSuperadministrador';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  //hay que declarar los "guards"
  providers: [CanActivateViaLoggingAdministrador, CanActivateViaLoggingGestor, CanActivateViaLoggingNormal, CanActivateViaLoggingSuperadministrador],
  bootstrap: [AppComponent]
})
export class AppModule { }