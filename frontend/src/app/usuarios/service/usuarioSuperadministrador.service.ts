import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from 'src/app/services/app-config.service';
import { environment } from 'src/environments/environment';
import { UsuarioSuperadministrador } from '../models/usuarioSuperadministrador';
import { UsuarioSuperadministradorImpl } from '../models/usuarioSuperadministrador-impl';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSuperadministradorService {
  //endpoint raiz de la API
  private host: string = environment.hostSicenad;
  //endpoint especifico de los usuarios superadministrador
  private urlEndPoint: string = `${this.host}usuarios_superadministrador/`;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.host = appConfigService.hostSicenad ? appConfigService.hostSicenad : environment.hostSicenad;
    this.urlEndPoint = `${this.host}usuarios_superadministrador/`;
   }
  //metodo que recupera de la BD todos los usuarios superadministrador
  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  //metodo que extrae el [] de usuarios superadministrador
  extraerUsuarios(respuestaApi: any): UsuarioSuperadministrador[] {
    const usuarios: UsuarioSuperadministrador[] = [];
    respuestaApi._embedded.usuarios_superadministrador.forEach(u => 
      usuarios.push(this.mapearUsuario(u)));
    return usuarios;
  }

  //metodo para mapear un usuario superadministrador segun la interfaz
  mapearUsuario(usuarioApi: any): UsuarioSuperadministradorImpl {
    const usuario = new UsuarioSuperadministradorImpl();
    usuario.nombre = usuarioApi.nombre;
    usuario.password = usuarioApi.password;
    usuario.tfno = usuarioApi.tfno;
    usuario.email = usuarioApi.email;
    usuario.descripcion = usuarioApi.descripcion;
    usuario.url = usuarioApi._links.self.href;
    usuario.idUsuario = usuario.getId(usuario.url);
    usuario.tipo = 'superadministrador';
    return usuario;
  }

  //metodo para crear un usuario superadministrador
  create(usuario: UsuarioSuperadministrador): Observable<any> {
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

  //metodo para borrar un usuario superadministrador
  delete(usuario): Observable<UsuarioSuperadministrador> {
    return this.http.delete<UsuarioSuperadministrador>(`${this.urlEndPoint}${usuario.idUsuario}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  //metodo para editar un usuario superadministrador
  update(usuario: UsuarioSuperadministrador): Observable<any> {
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

  //metodo para recuperar un usuario superadministrador concreto
  getUsuario(id): Observable<any> {
    return this.http.get<UsuarioSuperadministrador>(`${this.urlEndPoint}${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}