import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from 'src/app/services/app-config.service';
import { UsuarioAdministradorImpl } from 'src/app/usuarios/models/usuarioAdministrador-impl';
import { environment } from 'src/environments/environment';
import { Cenad } from '../models/cenad';
import { CenadImpl } from '../models/cenad-impl';

@Injectable({
  providedIn: 'root'
})
export class CenadService {
  //endpoint raiz de la API
  private host: string = environment.hostSicenad;
  //endpoint especifico de los cenads
  private urlEndPoint: string = `${this.host}cenads/`;
  //endpoint para almacenamiento de archivos
  private urlFiles = `${this.host}files/`;

  constructor(private http: HttpClient,
    private appConfigService: AppConfigService) { 
      this.host = appConfigService.hostSicenad ? appConfigService.hostSicenad : environment.hostSicenad;
      this.urlEndPoint = `${this.host}cenads/`;
      this.urlFiles = `${this.host}files/`;
    
    }

  //metodo para subir un archivo
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.urlFiles}subirEscudo`, formData, {
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
    );
  }

  //metodo para borrar un archivo
  deleteArchivo(fileName: string): Observable<any> {
    return this.http.get(`${this.urlFiles}borrarEscudo/${fileName}`).pipe(
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

  //metodo que recupera de la BD todos los cenads
  getCenads(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
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
  
  //metodo para mapear un usuario administrador segun la interfaz
  mapearUsuario(usuarioApi: any): UsuarioAdministradorImpl {
    const usuario = new UsuarioAdministradorImpl();
    usuario.nombre = usuarioApi.nombre;
    usuario.password = usuarioApi.password;
    usuario.tfno = usuarioApi.tfno;
    usuario.email = usuarioApi.email;
    usuario.descripcion = usuarioApi.descripcion;
    usuario.url = usuarioApi._links.self.href;
    usuario.idUsuario = usuario.getId(usuario.url);
    usuario.tipo = 'administrador';
    return usuario;
  }

  //metodo para crear un cenad
  create(cenad: Cenad): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, cenad).pipe(
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

  //metodo para borrar un cenad
  delete(cenad): Observable<Cenad> {
    return this.http.delete<Cenad>(`${this.urlEndPoint}${cenad.idCenad}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  //metodo para editar un cenad
  update(cenad: Cenad): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${cenad.idCenad}`, cenad)
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

  //metodo para recuperar un cenad concreto
  getCenad(id): Observable<any> {
    return this.http.get<Cenad>(`${this.urlEndPoint}${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  //metodo para recuperar el administardor de un cenad
  getUsuarioAdministrador(cenad: Cenad): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${cenad.idCenad}/usuarioAdministrador/`)
      .pipe(
        catchError((e) => {
          if (e.status === 404) {
            console.error('Este CENAD/CMT aún no tiene Usuario Administrador');
          }
          return throwError(e);
        })
      );
  }
}