import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app-config.service';
import { environment } from 'src/environments/environment';
import { Cartografia } from '../models/cartografia';
import { CartografiaImpl } from '../models/cartografia-impl';
import { CartografiaService } from '../service/cartografia.service';

@Component({
  selector: 'app-cartografias',
  templateUrl: './cartografias.component.html',
  styleUrls: ['./cartografias.component.css']
})
export class CartografiasComponent implements OnInit {
  //variable para recuperar el id del CENAD/CMT
  idCenad: string = "";
  //variable que recoge todas las cartografias del cenad
  cartografias: Cartografia[] = [];
  //variable que posibilita la comunicacion de datos con el otro componente para mostrar los datos de una cartografia
  cartografiaVerDatos: Cartografia;
  hostSicenad: string = environment.hostSicenad;
  //variable boolean que dice si eres administrador de ese CENAD y por tanto puedes editarla
  isAdminCenad: boolean = true;

  constructor(
    private cartografiaService: CartografiaService,
    private router: Router
    , private activateRoute: ActivatedRoute,
    private appConfigService: AppConfigService) {
      this.hostSicenad = appConfigService.hostSicenad ? appConfigService.hostSicenad : environment.hostSicenad;
    }

    ngOnInit(): void {
    //recuperamos el id del CENAD de la barra de navegacion
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    //comprueba si estas loggeado como administrador de este cenad
    this.isAdminCenad = (this.idCenad === sessionStorage.idCenad && (sessionStorage.isAdmin === 'true'));
    //metemos en la variable todas las cartografias del cenad
    this.cartografias = JSON.parse(localStorage.getItem(`cartografias_${this.idCenad}`));
    }

    //metodo que asigna los datos de la cartografia para la comunicacion al otro componente
    verDatos(cartografia: Cartografia): void {
      this.cartografiaVerDatos = cartografia;
    }

    //metodo que materializa la eliminacion de una cartografia y vuelve al listado de cartografias del cenad
    onCartografiaEliminar(cartografia: CartografiaImpl): void {
      this.cartografiaService.delete(cartografia).subscribe(response => {
        //actualizamos el localStorage
        this.cartografiaService.getCartografiasDeCenad(this.idCenad).subscribe((response) => {
          localStorage.setItem(`cartografias_${this.idCenad}`, JSON.stringify(this.cartografiaService.extraerCartografias(response)));
          console.log(`He borrado la cartografia ${cartografia.nombre}`);
          this.router.navigate([`/principalCenad/${this.idCenad}/cartografias/${this.idCenad}`]);
        });
      });
    }

    //metodo que materializa la edicion de una cartografia y vuelve al listado de cartografias del cenad
    onCartografiaEditar(cartografia: CartografiaImpl): void {
      cartografia.cenad = `${this.hostSicenad}cenads/${this.idCenad}`;
      this.cartografiaService.update(cartografia).subscribe(response => {
        //actualizamos el localStorage
        this.cartografiaService.getCartografiasDeCenad(this.idCenad).subscribe((response) => {
          localStorage.setItem(`cartografias_${this.idCenad}`, JSON.stringify(this.cartografiaService.extraerCartografias(response)));
          console.log(`He actualizado la cartografia ${cartografia.nombre}`);
          this.router.navigate([`/principalCenad/${this.idCenad}/cartografias/${this.idCenad}`]);
        });
      });
    }
  }