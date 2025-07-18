import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { CenadImpl } from 'src/app/superadministrador/models/cenad-impl';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  /**
   * endpoint raiz de la API
   */
  private host: string = environment.hostSicenad;
  /**
   * endpoint especifico de los cenads
   */
  private urlEndPoint: string = `${this.host}cenads`;

  /**
   *
   * @param http Para usar los metodos HTTP
   * @param appConfigService Para usar las variables del `properties`
   */
  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.host = appConfigService.hostSicenad ? appConfigService.hostSicenad : environment.hostSicenad;
    this.urlEndPoint = `${this.host}cenads`;
   }

  /**
   * metodo que rescata de la BD todos los cenads
   */
  getCenads(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
  }

  /**
   * metodo que extrae el [] de cenads
   * @param respuestaApi [] de Cenad API
   * @returns Devuelve un [] de Cenad
   */
  extraerCenads(respuestaApi: any): Cenad[] {
    const cenads: Cenad[] = [];
    respuestaApi._embedded.cenads.forEach(c =>
      cenads.push(this.mapearCenad(c)));
    return cenads;
  }

  /**
   * metodo que rescata de la BD el Cenad con ese id
   * @param id Id del Cenad
   */
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

  /**
   * metodo que mapea un cenad segun la interfaz
   * @param cenadApi Cenad API
   * @returns Devuelve un CenadImpl
   */
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
