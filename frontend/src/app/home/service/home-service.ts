import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cenad } from '../models/cenad';
import { CenadImpl } from '../models/cenad-impl';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
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
    //console.log(cenads);
    return cenads;
  }

  mapearCenad(cenadApi: any): Cenad {
    //console.log(cenadApi);
    let cenad: Cenad = new CenadImpl();
    cenad.idCenad = this.getId(cenadApi._links.cenad.href);
    cenad.nombre = cenadApi.nombre;
    cenad.descripcion = cenadApi.descripcion;
    cenad.direccion = cenadApi.direccion;
    cenad.tfno = cenadApi.tfno;
    cenad.email = cenadApi.email;
    cenad.escudo = cenadApi.escudo;
    cenad.provincia = cenadApi.provincia;
    // console.log(cenad);
    return cenad;
  }

  getId(url: string): string {
    let posicionFinal: number = url.lastIndexOf('/');
    let numId: string = url.slice(posicionFinal + 1, url.length);
    //console.log(numId);
    return numId;
  }

}
