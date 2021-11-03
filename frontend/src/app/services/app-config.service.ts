import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//este servicio me permite tener un archivo de properties donde poder modificar variables sin necesidad de volver a construir...
export class AppConfigService {

  private appConfig: any;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return this.http.get('/assets/properties.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  get sizeMaxEscudo() {

    if (!this.appConfig) {
      throw Error('No se ha cargado el archivo de configuración!');
    }

    return this.appConfig.sizeMaxEscudo;
  }

  get sizeMaxDocRecurso() {

    if (!this.appConfig) {
      throw Error('No se ha cargado el archivo de configuración!');
    }

    return this.appConfig.sizeMaxDocRecurso;
  }

  get sizeMaxDocSolicitud() {

    if (!this.appConfig) {
      throw Error('No se ha cargado el archivo de configuración!');
    }

    return this.appConfig.sizeMaxDocSolicitud;
  }


  get tiempoMaximoLocalStorage() {

    if (!this.appConfig) {
      throw Error('No se ha cargado el archivo de configuración!');
    }

    return this.appConfig.tiempoMaximoLocalStorage;
  }


  get tiposTiro() {

    if (!this.appConfig) {
      throw Error('No se ha cargado el archivo de configuración!');
    }

    return this.appConfig.tiposTiro;
  }


  get hostSicenad() {

    if (!this.appConfig) {
      throw Error('No se ha cargado el archivo de configuración!');
    }

    return this.appConfig.hostSicenad;
  }
}