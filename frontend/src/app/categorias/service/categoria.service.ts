import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recurso } from 'src/app/recursos/models/recurso';
import { RecursoImpl } from 'src/app/recursos/models/recurso-impl';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { CenadImpl } from 'src/app/superadministrador/models/cenad-impl';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria';
import { CategoriaImpl } from '../models/categoria-impl';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  //endpoint raiz de la API
  private host: string = environment.hostSicenad;
  //endpoint especifico de las categorias
  private urlEndPoint: string = `${this.host}categorias/`;

  constructor(
    private http: HttpClient) { }

  //metodo que recupera de la BD las categorias de un CENAD/CMT
  getCategoriasDeCenad(idCenad:string): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${idCenad}/categorias/?page=0&size=1000`);
  }

  //metodo para obtener las categorias padre de un cenad
  getCategoriasPadreDeCenad(idCenad:string): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${idCenad}/categoriasPadre/?page=0&size=1000`);
  }

  //metodo que extrae el [] de categorias
  extraerCategorias(respuestaApi: any): Categoria[] {
    const categorias: Categoria[] = [];
    respuestaApi._embedded.categorias.forEach(c => 
      categorias.push(this.mapearCategoria(c)));
    return categorias;
  }

  //metodo que mapea cada categoria segun la interfaz
  mapearCategoria(categoriaApi: any): CategoriaImpl {
    const categoria = new CategoriaImpl();
    categoria.nombre = categoriaApi.nombre;
    categoria.descripcion = categoriaApi.descripcion;
    categoria.url = categoriaApi._links.self.href;
    categoria.idCategoria = categoria.getId(categoria.url);
    return categoria;
  }

  //metodo que crea en nuestra BD una nueva categoria
  create(categoria: Categoria): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, categoria).pipe(
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

  //metodo que borra de nuestra BD una categoria
  delete(categoria): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.urlEndPoint}${categoria.idCategoria}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  //metodo que actualiza en nuestra BD una categoria
  update(categoria: Categoria): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${categoria.idCategoria}`, categoria)
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

  //metodo que recupera de la BD la categoria padre de una categoria
  getCategoriaPadre(categoria: Categoria): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${categoria.idCategoria}/categoriaPadre`)
    .pipe(
      catchError((e) => {
        if (e.status === 404) {
          console.error('Esta categoría no tiene categoría Padre');
        }
        return throwError(e);
      })
    );
  }

  //metodo que recupera de la BD las subcategorias de una categoria
  getSubcategorias(categoria:Categoria): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${categoria.idCategoria}/subcategorias/`);
  }

  //metodo que recupera de la BD todos los CENADS
  getCenads(): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/?page=0&size=1000`);
  }

  //metodo que recupera de la BD un CENAD (por su id)
  getCenad(id): Observable<any> {
    return this.http.get<Cenad>(`${this.host}cenads/${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  //metodo que recupera de la BD el CENAD de una categoria
  getCenadDeCategoria(categoria: Categoria): Observable<any> {
    return this.http.get<Cenad>(`${this.urlEndPoint}${categoria.idCategoria}/cenad`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  //metodo que extrae el [] de cenads
  extraerCenads(respuestaApi: any): Cenad[] {
    const cenads: Cenad[] = [];
    respuestaApi._embedded.cenads.forEach(c => 
      cenads.push(this.mapearCenad(c)));
    return cenads;
  }

  //metodo que mapea un CENAD segun la interfaz
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

  //metodo que recupera de la BD los recursos de una categoria
  getRecursosDeCategoria(categoria: Categoria): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${categoria.idCategoria}/recursos/?page=0&size=1000`);
  }

  //metodo que extrae el [] de recursos
  extraerRecursos(respuestaApi: any): Recurso[] {
    const recursos: Recurso[] = [];
    respuestaApi._embedded.recursos.forEach(r => 
      recursos.push(this.mapearRecurso(r)));
    return recursos;
  }

  //metodo que mapea un recurso segun la interfaz
  mapearRecurso(recursoApi: any): RecursoImpl {
    const recurso = new RecursoImpl();
    recurso.nombre = recursoApi.nombre;
    recurso.descripcion = recursoApi.descripcion;
    recurso.otros = recursoApi.otros;
    recurso.conDatosEspecificosSolicitud = recursoApi.conDatosEspecificosSolicitud;
    recurso.datosEspecificosSolicitud = recursoApi.datosEspecificosSolicitud;
    recurso.url = recursoApi._links.self.href;
    recurso.idRecurso = recurso.getId(recurso.url);
    return recurso;
  }
}
