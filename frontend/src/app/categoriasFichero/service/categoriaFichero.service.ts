import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from 'src/app/services/app-config.service';
import { environment } from 'src/environments/environment';
import { CategoriaFichero } from '../models/categoriaFichero';
import { CategoriaFicheroImpl } from '../models/categoriaFichero-impl';

@Injectable({
  providedIn: 'root'
})
export class CategoriaFicheroService {
  //endpoint raiz de la API
  private host: string = environment.hostSicenad;
  //endpoint especifico de las categorias de fichero
  private urlEndPoint: string = `${this.host}categorias_fichero/`;

  constructor(
    private http: HttpClient, private appConfigService: AppConfigService) { 
      this.host = appConfigService.hostSicenad ? appConfigService.hostSicenad : environment.hostSicenad;
      this.urlEndPoint = `${this.host}categorias_fichero/`;
    }

  //metodo que recupera de la BD todas las categorias de fichero
  getCategoriasFichero(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  //metodo que extrae el [] de categorias de fichero 
  extraerCategoriasFichero(respuestaApi: any): CategoriaFichero[] {
    const categoriasFichero: CategoriaFichero[] = [];
    respuestaApi._embedded.categorias_fichero.forEach(c => 
      categoriasFichero.push(this.mapearCategoriaFichero(c)));
    return categoriasFichero;
  }

  //metodo que mapea la categoria de fichero segun la interfaz
  mapearCategoriaFichero(categoriaFicheroApi: any): CategoriaFicheroImpl {
    const categoriaFichero = new CategoriaFicheroImpl();
    categoriaFichero.nombre = categoriaFicheroApi.nombre;
    categoriaFichero.descripcion = categoriaFicheroApi.descripcion;
    categoriaFichero.tipo = categoriaFicheroApi.tipo;
    categoriaFichero.url = categoriaFicheroApi._links.self.href;
    categoriaFichero.idCategoriaFichero = categoriaFichero.getId(categoriaFichero.url);
    return categoriaFichero;
  }

  //metodo que crea en nuestra BD una nueva categoria de fichero 
  create(categoriaFichero: CategoriaFichero): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, categoriaFichero).pipe(
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

  //metodo que borra de nuestra BD una categoria de fichero
  delete(categoriaFichero): Observable<CategoriaFichero> {
    return this.http.delete<CategoriaFichero>(`${this.urlEndPoint}${categoriaFichero.idCategoriaFichero}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }
  //metodo que actualiza en nuestra BD una categoria de fichero
  update(categoriaFichero: CategoriaFichero): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${categoriaFichero.idCategoriaFichero}`, categoriaFichero)
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
