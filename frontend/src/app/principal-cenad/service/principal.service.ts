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
  private host: string = environment.hostSicenad;
  private urlEndPoint: string = `${this.host}cenads`;

  constructor(private http: HttpClient) { }

  getCenads(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
  }

  extraerCenads(respuestaApi: any): Cenad[] {
    const cenads: Cenad[] = [];
    respuestaApi._embedded.cenads.forEach(c => {
      cenads.push(this.mapearCenad(c));
    });
    return cenads;
  }

  getCenad(id: string): Observable<Cenad> {
    return this.http.get<Cenad>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  mapearCenad(cenadApi: any): Cenad {
    let cenad: Cenad = new CenadImpl();
    cenad.idCenad = this.getId(cenadApi._links.cenad.href);
    cenad.nombre = cenadApi.nombre;
    cenad.descripcion = cenadApi.descripcion;
    cenad.direccion = cenadApi.direccion;
    cenad.tfno = cenadApi.tfno;
    cenad.email = cenadApi.email;
    cenad.escudo = cenadApi.escudo;
    cenad.provincia = cenadApi.provincia;
    return cenad;
  }

  getId(url: string): string {
    let posicionFinal: number = url.lastIndexOf('/');
    let numId: string = url.slice(posicionFinal + 1, url.length);
    return numId;
  }


}
