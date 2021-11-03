import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { CenadImpl } from 'src/app/superadministrador/models/cenad-impl';
import { environment } from 'src/environments/environment';
import { UsuarioGestor } from '../models/usuarioGestor';
import { UsuarioGestorImpl } from '../models/usuarioGestor-impl';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGestorService {
  //endpoint raiz de la API
  private host: string = environment.hostSicenad;
  //endpoint especifico de los usuarios gestor
  private urlEndPoint: string = `${this.host}usuarios_gestor/`;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.host = appConfigService.hostSicenad ? appConfigService.hostSicenad : environment.hostSicenad;
    this.urlEndPoint = `${this.host}usuarios_gestor/`;
   }
  //metodo que recupera de la BD todos los usuarios gestor
  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  //metodo que extrae el [] de usuarios gestor
  extraerUsuarios(respuestaApi: any): UsuarioGestor[] {
    const usuarios: UsuarioGestor[] = [];
    respuestaApi._embedded.usuarios_gestor.forEach(u => 
      usuarios.push(this.mapearUsuario(u)));
    return usuarios;
  }

  //metodo para mapear un usuario gestor segun la interfaz
  mapearUsuario(usuarioApi: any): UsuarioGestorImpl {
    const usuario = new UsuarioGestorImpl();
    usuario.nombre = usuarioApi.nombre;
    usuario.password = usuarioApi.password;
    usuario.tfno = usuarioApi.tfno;
    usuario.email = usuarioApi.email;
    usuario.descripcion = usuarioApi.descripcion;
    usuario.url = usuarioApi._links.self.href;
    usuario.idUsuario = usuario.getId(usuario.url);
    this.getCenad(usuario).subscribe((response) => usuario.cenad = this.mapearCenad(response));
    usuario.tipo = 'gestor';
    return usuario;
  }

  //metodo para crear un usuario gestor
  create(usuario: UsuarioGestor): Observable<any> {
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

  //metodo para borrar un usuario gestor
  delete(usuario): Observable<UsuarioGestor> {
    return this.http.delete<UsuarioGestor>(`${this.urlEndPoint}${usuario.idUsuario}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  //metodo para editar un usuario gestor
  update(usuario: UsuarioGestor): Observable<any> {
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

  //metodo para recuperar un usuario gestor concreto
  getUsuario(id): Observable<any> {
    return this.http.get<UsuarioGestor>(`${this.urlEndPoint}${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  //metodo para recuperar los gestores de un cenad
  getUsuariosGestoresDeCenad(idCenad: string): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${idCenad}/usuariosGestores/`)
    .pipe(
      catchError((e) => {
        if (e.status === 404) {
          console.error('Este CENAD/CMT aún no tiene Usuarios Gestores');
        }
        else;
        return throwError(e);
      })
    );
  }

  //metodo para recuperar el cenad de un gestor
  getCenad(usuarioGestor: UsuarioGestor): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${usuarioGestor.idUsuario}/cenad/`)
      .pipe(
        catchError((e) => {
          if (e.status === 404) {
            console.error('');
          }
          return throwError(e);
        })
      );
  }

  //metodo que recupera de la BD todos los cenads
  getCenads(): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/?page=0&size=1000`);
  }

  //metodo que extrae el [] de cenads
  extraerCenads(respuestaApi: any): Cenad[] {
    const cenads: Cenad[] = [];
    respuestaApi._embedded.cenads.forEach(c =>
      cenads.push(this.mapearCenad(c)));
    return cenads;
  }

  //metodo para mapear un cenad segun la interfaz
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