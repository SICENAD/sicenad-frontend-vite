import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cenad } from '../models/cenad';
import { CenadImpl } from '../models/cenad-impl';
import { UsuarioAdministrador } from '../models/usuarioAdministrador';
import { UsuarioAdministradorImpl } from '../models/usuarioAdministrador-impl';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAdministradorService {

  private host: string = environment.hostSicenad;
  private urlEndPoint: string = `${this.host}usuarios_administrador/`;

  constructor(
    private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  extraerUsuarios(respuestaApi: any): UsuarioAdministrador[] {
    const usuarios: UsuarioAdministrador[] = [];
    respuestaApi._embedded.usuarios_administrador.forEach(u => {
      usuarios.push(this.mapearUsuario(u));

    });
    return usuarios;
  }

  mapearUsuario(usuarioApi: any): UsuarioAdministradorImpl {
    const usuario = new UsuarioAdministradorImpl();
    usuario.nombre = usuarioApi.nombre;
    usuario.password = usuarioApi.password;
    usuario.tfno = usuarioApi.tfno;
    usuario.email = usuarioApi.email;
    usuario.descripcion = usuarioApi.descripcion;
    usuario.url = usuarioApi._links.self.href;
    usuario.idUsuario = usuario.getId(usuario.url);
    this.getCenad(usuario).subscribe((response) => usuario.cenad = this.mapearCenad(response));

    return usuario;
  }

  create(usuario: UsuarioAdministrador): Observable<any> {
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

  delete(usuario): Observable<UsuarioAdministrador> {
    return this.http.delete<UsuarioAdministrador>(`${this.urlEndPoint}${usuario.idUsuario}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  update(usuario: UsuarioAdministrador): Observable<any> {
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

  getUsuario(id): Observable<any> {
    return this.http.get<UsuarioAdministrador>(`${this.urlEndPoint}${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
  getUsuarioAdministrador(cenad: Cenad): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${cenad.idCenad}/usuarioAdministrador/`)
    .pipe(
      catchError((e) => {
        if (e.status === 404) {
          console.error('Este CENAD/CMT aún no tiene Usuario Administrador');
        }
        else cenad.tieneAdmin = true;
        return throwError(e);
      })
    );
  }

  getCenad(usuarioAdministrador: UsuarioAdministrador): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${usuarioAdministrador.idUsuario}/cenad/`)
      .pipe(
        catchError((e) => {
          if (e.status === 404) {
            console.error('');
          }
          return throwError(e);
        })
      );
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
    // this.getUsuarioAdministrador(cenad).subscribe((response) => cenad.usuarioAdministrador = this.mapearUsuario(response));

    return cenad;
  }
}
