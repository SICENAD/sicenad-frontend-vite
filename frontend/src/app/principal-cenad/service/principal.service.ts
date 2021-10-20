import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { CenadImpl } from 'src/app/superadministrador/models/cenad-impl';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  //endpoint raiz de la API
  private host: string = environment.hostSicenad;
  //endpoint especifico de los cenads
  private urlEndPoint: string = `${this.host}cenads/`;

  constructor(private http: HttpClient) { }

  //metodo que rescata de la BD todos los cenads
  getCenads(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
  }

  //metodo que extrae el [] de cenads
  extraerCenads(respuestaApi: any): Cenad[] {
    const cenads: Cenad[] = [];
    respuestaApi._embedded.cenads.forEach(c => 
      cenads.push(this.mapearCenad(c)));
    return cenads;
  }

  //metodo que rescata de la BD el Cenad con ese id
  getCenad(id: string): Observable<Cenad> {
    return this.http.get<Cenad>(`${this.urlEndPoint}${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  //metodo que mapea un cenad segun la interfaz
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