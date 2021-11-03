import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categoria } from 'src/app/categorias/models/categoria';
import { CategoriaImpl } from 'src/app/categorias/models/categoria-impl';
import { CategoriaFichero } from 'src/app/categoriasFichero/models/categoriaFichero';
import { CategoriaFicheroImpl } from 'src/app/categoriasFichero/models/categoriaFichero-impl';
import { AppConfigService } from 'src/app/services/app-config.service';
import { TipoFormulario } from 'src/app/tiposFormulario/models/tipoFormulario';
import { TipoFormularioImpl } from 'src/app/tiposFormulario/models/tipoFormulario-impl';
import { UsuarioGestor } from 'src/app/usuarios/models/usuarioGestor';
import { UsuarioGestorImpl } from 'src/app/usuarios/models/usuarioGestor-impl';
import { environment } from 'src/environments/environment';
import { Fichero } from '../models/fichero';
import { FicheroImpl } from '../models/fichero-impl';
import { Recurso } from '../models/recurso';
import { RecursoImpl } from '../models/recurso-impl';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  //endpoint raiz de la API
  private host: string = environment.hostSicenad;
  //endpoint especifico de los recursos
  private urlEndPoint: string = `${this.host}recursos/`;
  //endpoint del almacenamiento de archivos
  private urlFiles = `${this.host}files/`;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.host = appConfigService.hostSicenad ? appConfigService.hostSicenad : environment.hostSicenad;
    this.urlEndPoint = `${this.host}recursos/`;
    this.urlFiles = `${this.host}files/`;
   }
  
  //metodo para subir un archivo a la subcarpeta de un recurso
  upload(file: File, idRecurso: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.urlFiles}subirDocRecurso/${idRecurso}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req).pipe(
      catchError((e) => {
        if (e.status === 413) {
          alert("El archivo tiene un tamaño superior al permitido");
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );  }

  //metodo para borrar un archivo de la subcarpeta de un recurso
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

  //metodo para recuperar de la BD todos los recursos
  getRecursos(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  //metodo para recuperar de la BD los recursos de un cenad
  getRecursosDeCenad(idCenad: string): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${idCenad}/recursos/?page=0&size=1000`);
  }

  //metodo para recuperar de la BD los recursos de una categoria
  getRecursosDeCategoria(categoria: Categoria) {
    return this.http.get<any>(`${this.host}categorias/${categoria.idCategoria}/recursos/?page=0&size=1000`);
  }

  //metodo para recuperar de la BD los recursos pertenecientes a todas las subcategorias de una categoria
  getRecursosDeSubcategorias(categoria: Categoria) {
    return this.http.get<any>(`${this.host}categorias/${categoria.idCategoria}/recursosDeSubcategorias/?page=0&size=1000`);
  }

  //metodo para extraer el [] de recursos
  extraerRecursos(respuestaApi: any): Recurso[] {
    const recursos: Recurso[] = [];
    respuestaApi._embedded.recursos.forEach(r => 
      recursos.push(this.mapearRecurso(r)));
    return recursos;
  }

  //metodo para mapear un recurso segun la interfaz
  mapearRecurso(recursoApi: any): RecursoImpl {
    const recurso = new RecursoImpl();
    recurso.nombre = recursoApi.nombre;
    recurso.descripcion = recursoApi.descripcion;
    recurso.otros = recursoApi.otros;
    recurso.conDatosEspecificosSolicitud = recursoApi.conDatosEspecificosSolicitud;
    recurso.datosEspecificosSolicitud = recursoApi.datosEspecificosSolicitud;
    recurso.url = recursoApi._links.self.href;
    recurso.idRecurso = recurso.getId(recurso.url);
    this.getCategoria(recurso.idRecurso).subscribe((response) => 
    recurso.categoria= this.mapearCategoria(response));
    return recurso;
  }

  //metodo para crear un recurso
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

  //metodo para crear un fichero
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

  //metodo para borrar un recurso
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

  //metodo para editar un recurso
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

  //metodo para obtener el gestor de un recurso
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

  //metodo para obtener el gestor de un recurso
  getUsuarioGestorDeIdRecurso(idRecurso: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${idRecurso}/usuarioGestor`)
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

  //metodo para obtener la categoria de un recurso
  getCategoria(idRecurso: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${idRecurso}/categoria`)
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

  //metodo para obtener el tipo de formulario de un recurso
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

  //metodo para obetener todos los tipos de formulario
  getTiposFormulario(): Observable<any> {
    return this.http.get<any>(`${this.host}tipos_formulario/?page=0&size=1000`);
  }

  //metodos para extraer el [] de tipos de formulario
  extraerTiposFormulario(respuestaApi: any): TipoFormulario[] {
    const tiposFormulario: TipoFormulario[] = [];
    respuestaApi._embedded.tipos_formulario.forEach(r => 
      tiposFormulario.push(this.mapearTipoFormulario(r)));
    return tiposFormulario;
  }

  //metodo para mapear un tipo de formulario segun la interfaz
  mapearTipoFormulario(tipoFormularioApi: any): TipoFormularioImpl {
    const tipoFormulario = new TipoFormularioImpl();
    tipoFormulario.nombre = tipoFormularioApi.nombre;
    tipoFormulario.descripcion = tipoFormularioApi.descripcion;
    tipoFormulario.codTipo = tipoFormularioApi.codTipo;
    tipoFormulario.url = tipoFormularioApi._links.self.href;
    tipoFormulario.idTipoFormulario = tipoFormulario.getId(tipoFormulario.url);
    return tipoFormulario;
  }

  //metodo para obtener las categorias de un cenad
  getCategoriasDeCenad(idCenad:string): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${idCenad}/categorias/?page=0&size=1000`);
  }

  //metodo para obtener las categorias padre de un cenad
  getCategoriasPadreDeCenad(idCenad:string): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${idCenad}/categoriasPadre/?page=0&size=1000`);
  }

  //metodo para obetenr la categoria padre de una categoria
  getCategoriaPadre(categoria:Categoria): Observable<any> {
    return this.http.get<any>(`${this.host}categorias/${categoria.idCategoria}/categoriaPadre`);
  }

  //metodo para obtener las subcategorias de una categoria
  getSubcategorias(categoria:Categoria): Observable<any> {
    return this.http.get<any>(`${this.host}categorias/${categoria.idCategoria}/subcategorias/`);
  }

  //metodo para obetenr recursivamente todas las subcategorias anidadas a una categoria
  getSubcategoriasAnidadas(categoria:Categoria): Observable<any> {
    return this.http.get<any>(`${this.host}categorias/${categoria.idCategoria}/subcategoriasAnidadas/`);
  }

  //metodo para extraer el [] de categorias
  extraerCategorias(respuestaApi: any): Categoria[] {
    const categorias: Categoria[] = [];
    respuestaApi._embedded.categorias.forEach(c => 
      categorias.push(this.mapearCategoria(c)));
    return categorias;
  }

  //metodo para mapear una categoria segun la interfaz
  mapearCategoria(categoriaApi: any): CategoriaImpl {
    const categoria = new CategoriaImpl();
    categoria.nombre = categoriaApi.nombre;
    categoria.descripcion = categoriaApi.descripcion;
    categoria.url = categoriaApi._links.self.href;
    categoria.idCategoria = categoria.getId(categoria.url);
    return categoria;
  }

  //metodo para obtener los gestores de un cenad
  getUsuariosGestor(idCenad: string): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${idCenad}/usuariosGestores/?page=0&size=1000`);
  }

  //metodo para extraer el [] de usuarios
  extraerUsuarios(respuestaApi: any): UsuarioGestor[] {
    const usuarios: UsuarioGestor[] = [];
    respuestaApi._embedded.usuarios_gestor.forEach(u => 
      usuarios.push(this.mapearUsuario(u)));
    return usuarios;
  }

  //metodo para mapear un usuario segun la interfaz
  mapearUsuario(usuarioApi: any): UsuarioGestorImpl {
    const usuario = new UsuarioGestorImpl();
    usuario.nombre = usuarioApi.nombre;
    usuario.password = usuarioApi.password;
    usuario.tfno = usuarioApi.tfno;
    usuario.email = usuarioApi.email;
    usuario.descripcion = usuarioApi.descripcion;
    usuario.url = usuarioApi._links.self.href;
    usuario.idUsuario = usuario.getId(usuario.url);
    usuario.tipo = 'gestor';
    return usuario;
  }

  //metodo para obtener un recurso por su id
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

  //metodo para obetener los ficheros de un recurso
  getFicheros(idRecurso: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${idRecurso}/ficheros/?page=0&size=1000`);
  }

  //metodo para extraer el [] de ficheros
  extraerFicheros(respuestaApi: any): Fichero[] {
    const ficheros: Fichero[] = [];
    respuestaApi._embedded.ficheros.forEach(f => 
      ficheros.push(this.mapearFichero(f)));
    return ficheros;
  }

  //metodo para mapear un fichero segun la interfaz
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

  //metodo para borrar un fichero
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

  //metodo para editar un fichero
  updateFichero(fichero: Fichero): Observable<any> {
    return this.http
      .patch<any>(`${this.host}ficheros/${fichero.idFichero}`, fichero)
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

  //metodo para obtener todas las categorias de fichero
  getCategoriasFichero(): Observable<any> {
    return this.http.get<any>(`${this.host}categorias_fichero/?page=0&size=1000`);
  }

  //metodo para extraer el [] de categorias de fichero
  extraerCategoriasFichero(respuestaApi: any): CategoriaFichero[] {
    const categoriasFichero: CategoriaFichero[] = [];
    respuestaApi._embedded.categorias_fichero.forEach(c => 
      categoriasFichero.push(this.mapearCategoriaFichero(c)));
    return categoriasFichero;
  }

  //metodo para obtener la categoria de fichero de un fichero
  getCategoriaFichero(idFichero: string): Observable<any> {
    return this.http.get<any>(`${this.host}ficheros/${idFichero}/categoriaFichero/?page=0&size=1000`);
  }

  //metodo para mapear una categoria de fichero segun su interfaz
  mapearCategoriaFichero(categoriaFicheroApi: any): CategoriaFicheroImpl {
    const categoriaFichero = new CategoriaFicheroImpl();
    categoriaFichero.nombre = categoriaFicheroApi.nombre;
    categoriaFichero.tipo = categoriaFicheroApi.tipo;
    categoriaFichero.descripcion = categoriaFicheroApi.descripcion;
    categoriaFichero.url = categoriaFicheroApi._links.self.href;
    categoriaFichero.idCategoriaFichero = categoriaFichero.getId(categoriaFichero.url);
    return categoriaFichero;
  }

  //metodo para obtener el recurso de un fichero
  getRecursoDeFichero(idFichero: String) {
    return this.http.get<any>(`${this.host}ficheros/${idFichero}/recurso/?page=0&size=1000`);
  }

  //metodo para obtener las categorias de fichero de los ficheros de un recurso
  getCategoriasFicheroDeRecurso(idRecurso: String) {
    return this.http.get<any>(`${this.urlEndPoint}${idRecurso}/categoriasFichero/?page=0&size=1000`);
  }

    //metodo para recuperar de la BD los recursos de un gestor
    getRecursosDeGestor(idGestor: string): Observable<any> {
      return this.http.get<any>(`${this.host}usuarios_gestor/${idGestor}/recursos/?page=0&size=1000`);
    }
}