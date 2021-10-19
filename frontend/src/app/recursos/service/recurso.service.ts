import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categoria } from 'src/app/categorias/models/categoria';
import { CategoriaImpl } from 'src/app/categorias/models/categoria-impl';
import { CategoriaFichero } from 'src/app/categoriasFichero/models/categoriaFichero';
import { CategoriaFicheroImpl } from 'src/app/categoriasFichero/models/categoriaFichero-impl';
import { UsuarioGestor } from 'src/app/superadministrador/models/usuarioGestor';
import { UsuarioGestorImpl } from 'src/app/superadministrador/models/usuarioGestor-impl';
import { TipoFormulario } from 'src/app/tiposFormulario/models/tipoFormulario';
import { TipoFormularioImpl } from 'src/app/tiposFormulario/models/tipoFormulario-impl';
import { environment } from 'src/environments/environment';
import { Fichero } from '../models/fichero';
import { FicheroImpl } from '../models/fichero-impl';
import { Recurso } from '../models/recurso';
import { RecursoImpl } from '../models/recurso-impl';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  private host: string = environment.hostSicenad;
  private urlEndPoint: string = `${this.host}recursos/`;
  private urlFiles = `${this.host}files/`;

  constructor(private http: HttpClient) { }
  
  upload(file: File, idRecurso: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.urlFiles}subirDocRecurso/${idRecurso}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  deleteArchivo(fileName: string, idRecurso: string): Observable<any> {

    return this.http.get(`${this.urlFiles}borrarDocRecurso/${idRecurso}/${fileName}`).pipe(
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
    // this.getTipoFormulario(recurso).subscribe((response) => {
    //   recurso.tipoFormulario= this.mapearTipoFormulario(response)});
    // this.getUsuarioGestor(recurso).subscribe((response) => {
    //   recurso.usuarioGestor = this.mapearUsuario(response)});
    // this.getCategoria(recurso).subscribe((response) => recurso.categoria = this.mapearCategoria(response));
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

  createFichero(fichero: Fichero): Observable<any> {
    return this.http.post(`${this.host}ficheros/`, fichero).pipe(
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
    return this.http.get<any>(`${this.host}cenads/${idCenad}/usuariosGestores/?page=0&size=1000`);
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

  getRecurso(id): Observable<any> {
    return this.http.get<Recurso>(`${this.urlEndPoint}${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getFicheros(idRecurso: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${idRecurso}/ficheros/?page=0&size=1000`);
  }

  extraerFicheros(respuestaApi: any): Fichero[] {
    const ficheros: Fichero[] = [];
    respuestaApi._embedded.ficheros.forEach(f => {
      ficheros.push(this.mapearFichero(f));

    });
    return ficheros;
  }

  mapearFichero(ficheroApi: any): FicheroImpl {
    const fichero = new FicheroImpl();
    fichero.nombre = ficheroApi.nombre;
    fichero.nombreArchivo = ficheroApi.nombreArchivo;
    fichero.imagen = ficheroApi.imagen;
    fichero.descripcion = ficheroApi.descripcion;
    fichero.url = ficheroApi._links.self.href;
    fichero.idFichero = fichero.getId(fichero.url);
    this.getCategoriaFichero(fichero.idFichero).subscribe((response) => 
      fichero.categoriaFichero= this.mapearCategoriaFichero(response));
    
    return fichero;
  }

  deleteFichero(fichero: Fichero): Observable<Fichero> {
    return this.http.delete<Fichero>(`${this.host}ficheros/${fichero.idFichero}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  getCategoriasFichero(): Observable<any> {
    return this.http.get<any>(`${this.host}categorias_fichero/?page=0&size=1000`);
  }

  extraerCategoriasFichero(respuestaApi: any): CategoriaFichero[] {
    const categoriasFichero: CategoriaFichero[] = [];
    respuestaApi._embedded.categorias_fichero.forEach(c => {
      categoriasFichero.push(this.mapearCategoriaFichero(c));

    });
    return categoriasFichero;
  }

  getCategoriaFichero(idFichero: string): Observable<any> {
    return this.http.get<any>(`${this.host}ficheros/${idFichero}/categoriaFichero/?page=0&size=1000`);
  }

  mapearCategoriaFichero(categoriaFicheroApi: any): CategoriaFicheroImpl {
    const categoriaFichero = new CategoriaFicheroImpl();
    categoriaFichero.nombre = categoriaFicheroApi.nombre;
    categoriaFichero.tipo = categoriaFicheroApi.tipo;
    categoriaFichero.descripcion = categoriaFicheroApi.descripcion;
    categoriaFichero.url = categoriaFicheroApi._links.self.href;
    categoriaFichero.idCategoriaFichero = categoriaFichero.getId(categoriaFichero.url);
    
    return categoriaFichero;
  }

  getRecursoDeFichero(idFichero: String) {
    return this.http.get<any>(`${this.host}ficheros/${idFichero}/recurso/?page=0&size=1000`);
  }

  getCategoriasFicheroDeRecurso(idRecurso: String) {
    return this.http.get<any>(`${this.urlEndPoint}${idRecurso}/categoriasFichero/?page=0&size=1000`);
  }

}
