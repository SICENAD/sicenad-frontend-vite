import { Injectable} from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import {Location} from '@angular/common';

@Injectable()
export class CanActivateViaLoggingLogeado implements CanActivateChild {

    idCenad: string ='';

    constructor(private router: Router, private location: Location) { }

    canActivateChild(): boolean {
        // si el usuario no está loggeado le dará un alert y le llevará a la pagina principal del cenad de donde venia
        let resultado: boolean = false;
        if (!sessionStorage.isAdmin && !sessionStorage.isGestor && !sessionStorage.isNormal) {
            let url = location.toString();
            this.idCenad = this.getId(url);
            this.router.navigate([`/principalCenad/${this.idCenad}`]);
            alert('Debes identificarte para continuar');
        } else {
          resultado = true;
        }
        return resultado;
    }

    //metodo para extraer el id de la url
    getId(url: string): string {
        return url.slice(url.lastIndexOf('/') + 1, url.length);
      }
}
