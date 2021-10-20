import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    usuario.unidad = usuarioApi.unidad;
    usuario.url = usuarioApi._links.self.href;
    usuario.idUsuario = usuario.getId(usuario.url);
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
}