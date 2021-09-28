import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TipoRecurso } from '../models/tipoRecurso';
import { TipoRecursoImpl } from '../models/tipoRecurso-impl';

@Injectable({
  providedIn: 'root'
})
export class TipoRecursoService {
  private host: string = environment.hostSicenad;
  private urlEndPoint: string = `${this.host}tipos_recurso/`;

  constructor(
    private http: HttpClient) { }

  getTiposRecurso(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  extraerTiposRecurso(respuestaApi: any): TipoRecurso[] {
    const tiposRecurso: TipoRecurso[] = [];
    respuestaApi._embedded.tiposRecurso.forEach(t => {
      tiposRecurso.push(this.mapearTipoRecurso(t));

    });
    return tiposRecurso;
  }

  mapearTipoRecurso(tipoRecursoApi: any): TipoRecursoImpl {
    const tipoRecurso = new TipoRecursoImpl();
    tipoRecurso.nombre = tipoRecursoApi.nombre;
    tipoRecurso.descripcion = tipoRecursoApi.descripcion;
    tipoRecurso.codTipo = tipoRecursoApi.codTipo;
    tipoRecurso.url = tipoRecursoApi._links.self.href;
    tipoRecurso.idTipoRecurso = tipoRecurso.getId(tipoRecurso.url);

    return tipoRecurso;
  }

  create(tipoRecurso: TipoRecurso): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, tipoRecurso).pipe(
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

  delete(tipoRecurso): Observable<TipoRecurso> {
    return this.http.delete<TipoRecurso>(`${this.urlEndPoint}${tipoRecurso.idTipoRecurso}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  update(tipoRecurso: TipoRecurso): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}${tipoRecurso.idTipoRecurso}`, tipoRecurso)
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
