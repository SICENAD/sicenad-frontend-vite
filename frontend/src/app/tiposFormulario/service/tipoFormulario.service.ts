import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recurso } from 'src/app/recursos/models/recurso';
import { RecursoImpl } from 'src/app/recursos/models/recurso-impl';
import { environment } from 'src/environments/environment';
import { TipoFormulario } from '../models/tipoFormulario';
import { TipoFormularioImpl } from '../models/tipoFormulario-impl';

@Injectable({
  providedIn: 'root'
})
export class TipoFormularioService {
  private host: string = environment.hostSicenad;
  private urlEndPoint: string = `${this.host}tipos_formulario/`;

  constructor(
    private http: HttpClient) { }

  getTiposFormulario(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  extraerTiposFormulario(respuestaApi: any): TipoFormulario[] {
    const tiposFormulario: TipoFormulario[] = [];
    respuestaApi._embedded.tipos_formulario.forEach(t => {
      tiposFormulario.push(this.mapearTipoFormulario(t));

    });
    return tiposFormulario;
  }

  mapearTipoFormulario(tipoFormularioApi: any): TipoFormularioImpl {
    const tipoFormulario = new TipoFormularioImpl();
    tipoFormulario.nombre = tipoFormularioApi.nombre;
    tipoFormulario.descripcion = tipoFormularioApi.descripcion;
    tipoFormulario.codTipo = tipoFormularioApi.codTipo;
    tipoFormulario.url = tipoFormularioApi._links.self.href;
    tipoFormulario.idTipoFormulario = tipoFormulario.getId(tipoFormulario.url);
    // this.getRecursosDeTipoFormulario(tipoFormulario).subscribe((response) => {
    //   tipoFormulario.recursos = this.extraerRecursos(response)});

    return tipoFormulario;
  }

  create(tipoFormulario: TipoFormulario): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, tipoFormulario).pipe(
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

  delete(tipoFormulario): Observable<TipoFormulario> {
    return this.http.delete<TipoFormulario>(`${this.urlEndPoint}${tipoFormulario.idTipoFormulario}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  update(tipoFormulario: TipoFormulario): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${tipoFormulario.idTipoFormulario}`, tipoFormulario)
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

  getRecursosDeTipoFormulario(tipoFormulario: TipoFormulario): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${tipoFormulario.idTipoFormulario}/recursos`);
  }

  extraerRecursos(respuestaApi: any): Recurso[] {
    const recursos: Recurso[] = [];
    respuestaApi._embedded.recursos.forEach(r => {
      recursos.push(this.mapearRecurso(r));

    });
    return recursos;
  }

  mapearRecurso(recursoApi: any): RecursoImpl {
    const recurso = new RecursoImpl();
    recurso.nombre = recursoApi.nombre;
    recurso.descripcion = recursoApi.descripcion;
    recurso.otros = recursoApi.otros;
    recurso.url = recursoApi._links.self.href;
    recurso.idRecurso = recurso.getId(recurso.url);

    return recurso;
  }
}
