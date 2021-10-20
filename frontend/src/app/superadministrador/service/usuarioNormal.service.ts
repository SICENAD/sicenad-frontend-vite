import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Unidad } from 'src/app/unidades/models/unidad';
import { UnidadImpl } from 'src/app/unidades/models/unidad-impl';
import { environment } from 'src/environments/environment';
import { UsuarioNormal } from '../models/usuarioNormal';
import { UsuarioNormalImpl } from '../models/usuarioNormal-impl';

@Injectable({
  providedIn: 'root'
})
export class UsuarioNormalService {
  //endpoint raiz de la API
  private host: string = environment.hostSicenad;
  //endpoint especifico de los usuarios normal
  private urlEndPoint: string = `${this.host}usuarios_normal/`;

  constructor(private http: HttpClient) { }

  //metodo que recupera de la Bd todos los usuarios normal
  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  //metodo que extrae el [] de usuarios normal
  extraerUsuarios(respuestaApi: any): UsuarioNormal[] {
    const usuarios: UsuarioNormal[] = [];
    respuestaApi._embedded.usuarios_normal.forEach(u => 
      usuarios.push(this.mapearUsuario(u)));
    return usuarios;
  }

  //metodo para mapear un usuario normal segun la interfaz
  mapearUsuario(usuarioApi: any): UsuarioNormalImpl {
    const usuario = new UsuarioNormalImpl();
    usuario.nombre = usuarioApi.nombre;
    usuario.password = usuarioApi.password;
    usuario.tfno = usuarioApi.tfno;
    usuario.email = usuarioApi.email;
    usuario.descripcion = usuarioApi.descripcion;
    usuario.url = usuarioApi._links.self.href;
    usuario.idUsuario = usuario.getId(usuario.url);
    this.getUnidad(usuario.idUsuario).subscribe((response) => 
      usuario.unidad= this.mapearUnidad(response)); 
    return usuario;
  }

  //metodo para crear un usuario normal
  create(usuario: UsuarioNormal): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, usuario).pipe(
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

  //metodo para borrar un usuario normal
  delete(usuario): Observable<UsuarioNormal> {
    return this.http.delete<UsuarioNormal>(`${this.urlEndPoint}${usuario.idUsuario}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  //metodo para editar un usuario normal
  update(usuario: UsuarioNormal): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${usuario.idUsuario}`, usuario)
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

  //metodo para recuperar un usuario normal concreto
  getUsuario(id): Observable<any> {
    return this.http.get<UsuarioNormal>(`${this.urlEndPoint}${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  //metodo que rescata de la BD todas unidades
  getUnidades(): Observable<any> {
    return this.http.get<any>(`${this.host}unidades/?page=0&size=1000`);
  }

  //metodo que extrae el [] de unidades
  extraerUnidades(respuestaApi: any): Unidad[] {
    const unidades: Unidad[] = [];
    respuestaApi._embedded.unidades.forEach(u => 
      unidades.push(this.mapearUnidad(u)));
    return unidades;
  }

  //metodo que mapea una unidad segun la interfaz
  mapearUnidad(unidadApi: any): UnidadImpl {
    const unidad = new UnidadImpl();
    unidad.nombre = unidadApi.nombre;
    unidad.direccion = unidadApi.direccion;
    unidad.email = unidadApi.email;
    unidad.tfno = unidadApi.tfno;
    unidad.poc = unidadApi.poc;
    unidad.url = unidadApi._links.self.href;
    unidad.idUnidad = unidad.getId(unidad.url);
    return unidad;
  }

    //metodo que rescata de la BD la unidad del usuarioNormal seleccionado
    getUnidad(idUsuario: string): Observable<any> {
      return this.http.get<any>(`${this.urlEndPoint}${idUsuario}/unidad/`);
    }
}