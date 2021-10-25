import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioNormal } from 'src/app/usuarios/models/usuarioNormal';
import { UsuarioNormalImpl } from 'src/app/usuarios/models/usuarioNormal-impl';
import { environment } from 'src/environments/environment';
import { Unidad } from '../models/unidad';
import { UnidadImpl } from '../models/unidad-impl';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  //endpoint raiz de la API
  private host: string = environment.hostSicenad;
  //endpoint especifico de las unidades
  private urlEndPoint: string = `${this.host}unidades/`;

  constructor(private http: HttpClient) { }

  //metodo que rescata de la BD todas unidades
  getUnidades(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
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

  //metodo que materializa la creacion de una unidad
  create(unidad: Unidad): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, unidad).pipe(
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

  //metodo que materializa la eliminacion de una unidad
  delete(unidad): Observable<Unidad> {
    return this.http.delete<Unidad>(`${this.urlEndPoint}${unidad.idUnidad}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  //metodo que materializa la edicion de una unidad
  update(unidad: Unidad): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${unidad.idUnidad}`, unidad)
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

  //metodo que rescata de la BD los usuarios normales que tiene una unidad
  getUsuariosNormalDeUnidad(unidad: Unidad): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${unidad.idUnidad}/usuariosNormal`);
  }

  //metodo que extrae el [] de usuarios normal
  extraerUsuariosNormal(respuestaApi: any): UsuarioNormal[] {
    const usuariosNormal: UsuarioNormal[] = [];
    respuestaApi._embedded.usuarios_normal.forEach(u => 
      usuariosNormal.push(this.mapearUsuarioNormal(u)));
    return usuariosNormal;
  }

  //metodo que mapea un usuario normal segun la interfaz
  mapearUsuarioNormal(recursoApi: any): UsuarioNormalImpl {
    const usuarioNormal = new UsuarioNormalImpl();
    usuarioNormal.nombre = recursoApi.nombre;
    usuarioNormal.password = recursoApi.password;
    usuarioNormal.email = recursoApi.email;
    usuarioNormal.tfno = recursoApi.tfno;
    usuarioNormal.descripcion = recursoApi.descripcion;
    usuarioNormal.url = recursoApi._links.self.href;
    usuarioNormal.idUsuario = usuarioNormal.getId(usuarioNormal.url);
    usuarioNormal.tipo ='normal';
    return usuarioNormal;
  }
}