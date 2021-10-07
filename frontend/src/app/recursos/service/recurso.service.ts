import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categoria } from 'src/app/categorias/models/categoria';
import { CategoriaImpl } from 'src/app/categorias/models/categoria-impl';
import { UsuarioGestor } from 'src/app/superadministrador/models/usuarioGestor';
import { UsuarioGestorImpl } from 'src/app/superadministrador/models/usuarioGestor-impl';
import { TipoRecurso } from 'src/app/tiposRecurso/models/tipoRecurso';
import { TipoRecursoImpl } from 'src/app/tiposRecurso/models/tipoRecurso-impl';
import { environment } from 'src/environments/environment';
import { Recurso } from '../models/recurso';
import { RecursoImpl } from '../models/recurso-impl';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  private host: string = environment.hostSicenad;
  private urlEndPoint: string = `${this.host}recursos/`;

  constructor(private http: HttpClient) { }
  
  getRecursos(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  getRecursosDeCenad(idCenad: string): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${idCenad}/recursos/?page=0&size=1000`);
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
    this.getTipoRecurso(recurso).subscribe((response) => {
      recurso.tipoRecurso = this.mapearTipoRecurso(response)});
    this.getUsuarioGestor(recurso).subscribe((response) => {
      recurso.usuarioGestor = this.mapearUsuario(response)});
    return recurso;
  }

  create(recurso: Recurso): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, recurso).pipe(
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

  delete(recurso): Observable<Recurso> {
    return this.http.delete<Recurso>(`${this.urlEndPoint}${recurso.idRecurso}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  update(recurso: Recurso): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${recurso.idRecurso}`, recurso)
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

  getUsuarioGestor(recurso: Recurso): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${recurso.idRecurso}/usuarioGestor`)
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

  getCategoria(recurso: Recurso): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${recurso.idRecurso}/categoria`)
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

  getTipoRecurso(recurso: Recurso): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${recurso.idRecurso}/tipoRecurso`)
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


  getTiposRecurso(): Observable<any> {
    return this.http.get<any>(`${this.host}tipos_recurso/?page=0&size=1000`);
  }

  extraerTiposRecurso(respuestaApi: any): TipoRecurso[] {
    const tiposRecursos: TipoRecurso[] = [];
    respuestaApi._embedded.tipos_recurso.forEach(r => {
      tiposRecursos.push(this.mapearTipoRecurso(r));

    });
    return tiposRecursos;
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

  getCategoriasDeCenad(idCenad:string): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${idCenad}/categorias/?page=0&size=1000`);
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
    categoria.url = categoriaApi._links.self.href;
    categoria.idCategoria = categoria.getId(categoria.url);

    return categoria;
  }

  getUsuariosGestor(idCenad: string): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${idCenad}/gestores/?page=0&size=1000`);
  }

  extraerUsuarios(respuestaApi: any): UsuarioGestor[] {
    const usuarios: UsuarioGestor[] = [];
    respuestaApi._embedded.usuarios_gestor.forEach(u => {
      usuarios.push(this.mapearUsuario(u));

    });
    return usuarios;
  }

  mapearUsuario(usuarioApi: any): UsuarioGestorImpl {
    const usuario = new UsuarioGestorImpl();
    usuario.nombre = usuarioApi.nombre;
    usuario.password = usuarioApi.password;
    usuario.tfno = usuarioApi.tfno;
    usuario.email = usuarioApi.email;
    usuario.descripcion = usuarioApi.descripcion;
    usuario.url = usuarioApi._links.self.href;
    usuario.idUsuario = usuario.getId(usuario.url);

    return usuario;
  }

}
