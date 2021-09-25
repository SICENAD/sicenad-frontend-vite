import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cenad } from 'src/app/cenads/models/cenad';
import { CenadImpl } from 'src/app/cenads/models/cenad-impl';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria';
import { CategoriaImpl } from '../models/categoria-impl';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private host: string = environment.hostSicenad;
  private urlEndPoint: string = `${this.host}categorias/`;

  constructor(
    private http: HttpClient) { }

  getCategorias(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  extraerCategorias(respuestaApi: any): Categoria[] {
    const categorias: Categoria[] = [];
    respuestaApi._embedded.categorias.forEach(c => {
      categorias.push(this.mapearCategoria(c));

    });
    return categorias;
  }

  mapearCategoria(categoriaApi: any): CategoriaImpl {
    const categoria = new CategoriaImpl();
    categoria.nombre = categoriaApi.nombre;
    categoria.descripcion = categoriaApi.descripcion;
    categoria.subcategorias = categoriaApi.subcategorias;
    // categoria.categoriaPadre = categoriaApi.categoriaPadre;
    categoria.url = categoriaApi._links.self.href;
    categoria.idCategoria = categoria.getId(categoria.url);

    return categoria;
  }

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

  update(categoria: Categoria): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}${categoria.idCategoria}`, categoria)
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

  getCategoriaPadre(categoria: Categoria): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${categoria.idCategoria}/categoriaPadre/`)
    .pipe(
      catchError((e) => {
        if (e.status === 404) {
          console.error('Esta categoría no tiene categoría Padre');
        }
        return throwError(e);
      })
    );
  }

  getCenads(): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/?page=0&size=1000`);
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
}