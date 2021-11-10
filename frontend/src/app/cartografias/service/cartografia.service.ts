import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { CenadImpl } from 'src/app/superadministrador/models/cenad-impl';
import { environment } from 'src/environments/environment';
import { Cartografia } from '../models/cartografia';
import { CartografiaImpl } from '../models/cartografia-impl';

@Injectable({
  providedIn: 'root'
})
export class CartografiaService {
  //endpoint raiz de la API
  private host: string = environment.hostSicenad;
  //endpoint especifico de las cartografias
  private urlEndPoint: string = `${this.host}cartografias/`;
  //endpoint del almacenamiento de archivos
  private urlFiles = `${this.host}files/`;
  categoriaFicheroCartografia: string = environment.categoriaFicheroCartografia;

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService) { 
      this.host = this.appConfigService.hostSicenad ? this.appConfigService.hostSicenad : environment.hostSicenad;
      this.urlEndPoint =  `${this.host}cartografias/`;
      this.urlFiles =  `${this.host}files/`;
      this.categoriaFicheroCartografia = this.appConfigService.categoriaFicheroCartografia ? this.appConfigService.categoriaFicheroCartografia : environment.categoriaFicheroCartografia;
    }

  //metodo que recupera de la BD las cartografias de un CENAD/CMT
  getCartografiasDeCenad(idCenad:string): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${idCenad}/cartografias/?page=0&size=1000`);
  }

  //metodo que extrae el [] de cartografias
  extraerCartografias(respuestaApi: any): Cartografia[] {
    const cartografias: Cartografia[] = [];
    respuestaApi._embedded.cartografias.forEach(c => 
      cartografias.push(this.mapearCartografia(c)));
    return cartografias;
  }

  //metodo que mapea cada cartografia segun la interfaz
  mapearCartografia(cartografiaApi: any): CartografiaImpl {
    const cartografia = new CartografiaImpl();
    cartografia.nombre = cartografiaApi.nombre;
    cartografia.descripcion = cartografiaApi.descripcion;
    cartografia.nombreArchivo = cartografiaApi.nombreArchivo;
    cartografia.escala = cartografiaApi.escala;
    cartografia.sistemaReferencia = cartografiaApi.sistemaReferencia;
    cartografia.fechaCartografia = cartografiaApi.fechaCartografia;
    cartografia.url = cartografiaApi._links.self.href;
    cartografia.idCartografia = cartografia.getId(cartografia.url);
    return cartografia;
  }

  //metodo que crea en nuestra BD una nueva cartografia
  create(cartografia: Cartografia): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, cartografia).pipe(
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

  //metodo que borra de nuestra BD una cartografia
  delete(cartografia): Observable<Cartografia> {
    return this.http.delete<Cartografia>(`${this.urlEndPoint}${cartografia.idCartografia}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  //metodo que actualiza en nuestra BD una cartografia
  update(cartografia: Cartografia): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${cartografia.idCartografia}`, cartografia)
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

  //metodo que recupera de la BD todos los CENADS
  getCenads(): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/?page=0&size=1000`);
  }

  //metodo que recupera de la BD un CENAD (por su id)
  getCenad(id): Observable<any> {
    return this.http.get<Cenad>(`${this.host}cenads/${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  //metodo que recupera de la BD el CENAD de una cartografia
  getCenadDeCartografia(cartografia: Cartografia): Observable<any> {
    return this.http.get<Cenad>(`${this.urlEndPoint}${cartografia.idCartografia}/cenad`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  //metodo que extrae el [] de cenads
  extraerCenads(respuestaApi: any): Cenad[] {
    const cenads: Cenad[] = [];
    respuestaApi._embedded.cenads.forEach(c => 
      cenads.push(this.mapearCenad(c)));
    return cenads;
  }

  //metodo que mapea un CENAD segun la interfaz
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

  //metodo para subir un archivo a la subcarpeta de un cenad
  upload(file: File, idCenad: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.urlFiles}subirCartografia/${idCenad}`, formData, {
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

  //metodo para borrar un archivo de la subcarpeta de un recurso
  deleteArchivo(fileName: string, idCenad: string): Observable<any> {
    return this.http.get(`${this.urlFiles}borrarCartografia/${idCenad}/${fileName}`).pipe(
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
}