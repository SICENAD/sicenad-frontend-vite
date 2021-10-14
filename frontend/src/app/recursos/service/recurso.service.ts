import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categoria } from 'src/app/categorias/models/categoria';
import { CategoriaImpl } from 'src/app/categorias/models/categoria-impl';
import { UsuarioGestor } from 'src/app/superadministrador/models/usuarioGestor';
import { UsuarioGestorImpl } from 'src/app/superadministrador/models/usuarioGestor-impl';
import { TipoFormulario } from 'src/app/tiposFormulario/models/tipoFormulario';
import { TipoFormularioImpl } from 'src/app/tiposFormulario/models/tipoFormulario-impl';
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

  getRecursosDeCategoria(categoria: Categoria) {
    return this.http.get<any>(`${this.host}categorias/${categoria.idCategoria}/recursos/?page=0&size=1000`);
  }

  getRecursosDeSubcategorias(categoria: Categoria) {
    return this.http.get<any>(`${this.host}categorias/${categoria.idCategoria}/recursosDeSubcategorias/?page=0&size=1000`);
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
    this.getTipoFormulario(recurso).subscribe((response) => {
      recurso.tipoFormulario= this.mapearTipoFormulario(response)});
    this.getUsuarioGestor(recurso).subscribe((response) => {
      recurso.usuarioGestor = this.mapearUsuario(response)});
    this.getCategoria(recurso).subscribe((response) => recurso.categoria = this.mapearCategoria(response));
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

  getTipoFormulario(recurso: Recurso): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${recurso.idRecurso}/tipoFormulario`)
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


  getTiposFormulario(): Observable<any> {
    return this.http.get<any>(`${this.host}tipos_formulario/?page=0&size=1000`);
  }

  extraerTiposFormulario(respuestaApi: any): TipoFormulario[] {
    const tiposFormulario: TipoFormulario[] = [];
    respuestaApi._embedded.tipos_formulario.forEach(r => {
      tiposFormulario.push(this.mapearTipoFormulario(r));

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

    return tipoFormulario;
  }

  getCategoriasDeCenad(idCenad:string): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${idCenad}/categorias/?page=0&size=1000`);
  }

  getCategoriasPadreDeCenad(idCenad:string): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${idCenad}/categoriasPadre/?page=0&size=1000`);
  }

  getCategoriaPadre(categoria:Categoria): Observable<any> {
    return this.http.get<any>(`${this.host}categorias/${categoria.idCategoria}/categoriaPadre`);
  }

  getSubcategorias(categoria:Categoria): Observable<any> {
    return this.http.get<any>(`${this.host}categorias/${categoria.idCategoria}/subcategorias/`);
  }

  getSubcategoriasAnidadas(categoria:Categoria): Observable<any> {
    return this.http.get<any>(`${this.host}categorias/${categoria.idCategoria}/subcategoriasAnidadas/`);
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
