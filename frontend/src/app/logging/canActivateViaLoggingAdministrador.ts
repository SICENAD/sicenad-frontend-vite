import { Injectable} from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { HeaderComponent } from '../core/shell/header/header.component';
import {Location} from '@angular/common';

@Injectable()
export class CanActivateViaLoggingAdministrador implements CanActivateChild {

    idCenad: string ='';

    constructor(private router: Router, private location: Location) { }

    canActivateChild() {
        // si el usuario no está loggeado como administrador le dará un alert y le llevará a la pagina principal del cenad de donde venia
        if ((sessionStorage.isAdmin !== 'true')) {
            let url = location.toString();
            this.idCenad = this.getId(url);
            this.router.navigate([`/principalCenad/${this.idCenad}`]);
            alert('Debes identificarte como administrador para continuar');
            return false;
        }
        return true;
    }

    //metodo para extraer el id de la url
    getId(url: string): string {
        return url.slice(url.lastIndexOf('/') + 1, url.length);
      }
}