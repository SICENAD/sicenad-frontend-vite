import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from 'src/app/services/app-config.service';
import { environment } from 'src/environments/environment';
import { Arma } from '../models/arma';
import { ArmaImpl } from '../models/arma-impl';

@Injectable({
  providedIn: 'root'
})
export class ArmaService {
  //endpoint raiz de la API
  private host: string = environment.hostSicenad;
  //endpoint especifico de las armas
  private urlEndPoint: string = `${this.host}armas/`;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.host = appConfigService.hostSicenad ? appConfigService.hostSicenad : environment.hostSicenad;
    this.urlEndPoint = `${this.host}armas/`;
   }

  //metodo que rescata de la BD todas armas
  getArmas(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  //metodo que extrae el [] de armas
  extraerArmas(respuestaApi: any): Arma[] {
    const armas: Arma[] = [];
    respuestaApi._embedded.armas.forEach(a => 
      armas.push(this.mapearArma(a)));
    return armas;
  }

  //metodo que mapea un arma segun la interfaz
  mapearArma(armaApi: any): ArmaImpl {
    const arma = new ArmaImpl();
    arma.nombre = armaApi.nombre;
    arma.tipoTiro = armaApi.tipoTiro;
    arma.url = armaApi._links.self.href;
    arma.idArma = arma.getId(arma.url);
    return arma;
  }

  //metodo que materializa la creacion de un arma
  create(arma: Arma): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, arma).pipe(
      catchError((e) => {
        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  //metodo que materializa la eliminacion de un arma
  delete(arma): Observable<Arma> {
    return this.http.delete<Arma>(`${this.urlEndPoint}${arma.idArma}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  //metodo que materializa la edicion de un arma
  update(arma: Arma): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${arma.idArma}`, arma)
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }
}