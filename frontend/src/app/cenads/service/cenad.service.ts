import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cenad } from '../models/cenad';
import { CenadImpl } from '../models/cenad-impl';

@Injectable({
  providedIn: 'root'
})
export class CenadService {

  private host: string = environment.hostSicenad;
  private urlEndPoint: string = `${this.host}cenads/`;

  constructor(
    private http: HttpClient) { }

  getCenads(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  extraerCenads(respuestaApi: any): Cenad[] {
    const cenads: Cenad[] = [];
    respuestaApi._embedded.cenads.forEach(c => {
      cenads.push(this.mapearCenad(c));

    });
    return cenads;
  }

  mapearCenad(cenadApi: any): CenadImpl {
    const cenad = new CenadImpl();
    cenad.nombre = cenadApi.nombre;
    cenad.descripcion = cenadApi.descripcion;
    cenad.direccion = cenadApi.direccion;
    cenad.escudo = cenadApi.escudo;
    cenad.provincia = cenadApi.provincia;
    cenad.tfno = cenadApi.tfno;
    cenad.email = cenadApi.email;
    cenad.url = cenadApi._links.self.href;
    cenad.idCenad = cenad.getId(cenad.url);

    return cenad;
  }

  create(cenad: Cenad): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, cenad).pipe(
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

  delete(cenad): Observable<Cenad> {
    return this.http.delete<Cenad>(`${this.urlEndPoint}${cenad.idCenad}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  update(cenad: Cenad): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}${cenad.idCenad}`, cenad)
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

  getCenad(id): Observable<any> {
    return this.http.get<Cenad>(`${this.urlEndPoint}${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
