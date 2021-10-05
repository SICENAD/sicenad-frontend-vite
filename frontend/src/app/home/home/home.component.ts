import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { CenadImpl } from 'src/app/superadministrador/models/cenad-impl';
import { HomeService } from '../service/home-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  inicio: boolean = true;
  idProvinciaSeleccionada: number;
  provinciaSeleccionada: string = "";
  cenads: Cenad[] = [];
  cenadsFiltro: Cenad[] = [];
  provincias = [{idProvincia:15, nombre:"A CORUÑA"}, {idProvincia:1, nombre:"ALAVA"}, {idProvincia:2, nombre:"ALBACETE"},
  {idProvincia:3, nombre:"ALICANTE"}, {idProvincia:4, nombre:"ALMERIA"}, {idProvincia:33, nombre:"ASTURIAS"},
  {idProvincia:5, nombre:"AVILA"}, {idProvincia:6, nombre:"BADAJOZ"}, {idProvincia:8, nombre:"BARCELONA"},
  {idProvincia:9, nombre:"BURGOS"}, {idProvincia:10, nombre:"CACERES"}, {idProvincia:11, nombre:"CADIZ"},
  {idProvincia:39, nombre:"CANTABRIA"}, {idProvincia:12, nombre:"CASTELLON"}, {idProvincia:51, nombre:"CEUTA"},
  {idProvincia:13, nombre:"CIUDAD REAL"}, {idProvincia:14, nombre:"CORDOBA"}, {idProvincia:16, nombre:"CUENCA"},
  {idProvincia:17, nombre:"GERONA"}, {idProvincia:18, nombre:"GRANADA"}, {idProvincia:19, nombre:"GUADALAJARA"},
  {idProvincia:20, nombre:"GUIPUZCOA"}, {idProvincia:21, nombre:"HUELVA"}, {idProvincia:22, nombre:"HUESCA"},
  {idProvincia:7, nombre:"ISLAS BALEARES"}, {idProvincia:23, nombre:"JAEN"}, {idProvincia:26, nombre:"LA RIOJA"},
  {idProvincia:24, nombre:"LEON"}, {idProvincia:25, nombre:"LERIDA"}, {idProvincia:27, nombre:"LUGO"},
  {idProvincia:28, nombre:"MADRID"}, {idProvincia:29, nombre:"MALAGA"}, {idProvincia:52, nombre:"MELILLA"},
  {idProvincia:30, nombre:"MURCIA"}, {idProvincia:31, nombre:"NAVARRA"}, {idProvincia:32, nombre:"OURENSE"},
  {idProvincia:34, nombre:"PALENCIA"}, {idProvincia:35, nombre:"LAS PALMAS"}, {idProvincia:36, nombre:"PONTEVEDRA"},
  {idProvincia:37, nombre:"SALAMANCA"}, {idProvincia:40, nombre:"SEGOVIA"}, {idProvincia:41, nombre:"SEVILLA"},
  {idProvincia:42, nombre:"SORIA"}, {idProvincia:38, nombre:"STA CRUZ TENERIFE"}, {idProvincia:43, nombre:"TARRAGONA"},
  {idProvincia:44, nombre:"TERUEL"}, {idProvincia:45, nombre:"TOLEDO"}, {idProvincia:46, nombre:"VALENCIA"},
  {idProvincia:47, nombre:"VALLADOLID"}, {idProvincia:48, nombre:"VIZCAYA"}, {idProvincia:49, nombre:"ZAMORA"},
  {idProvincia:50, nombre:"ZARAGOZA"}];

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit() {
  //  this.prueba();
   this.cargarCenads();
  }

  // función de prueba que crea objetos cenads
  prueba() {
    let cenad1: Cenad = new CenadImpl();
    cenad1.nombre = "CENAD SAN GREGORIO";
    cenad1.provincia = 50;
    let cenad2: Cenad = new CenadImpl();
    cenad2.nombre = "CENAD PRUEBA";
    cenad2.provincia = 50;
    let cenad3: Cenad = new CenadImpl();
    cenad3.nombre = "CMT ALVAREZ DE SOTOMAYOR";
    cenad3.provincia = 4;
    this.cenads.push(cenad1, cenad2, cenad3);
  }

  // función que carga los diferentes CENAD,s/CMT,s de la API
  cargarCenads() {
    this.homeService.getCenads().subscribe((response) => {
      this.cenads = this.homeService.extraerCenads(response);
    });
  }

  // Asigna al array cenadsFiltro todos los CENAD,s/CMT,s de una provincia
  // se le pasa como parámetro el código de la provincia
  buscarCenads(idProvincia: number): void {
    this.cenadsFiltro = this.cenads.filter(cenad => {
      if (cenad.provincia == idProvincia) {
        return cenad;
      }
    });
    this.provincias.forEach(p => {
      if (p.idProvincia == idProvincia) {
        this.provinciaSeleccionada = p.nombre;
        this.idProvinciaSeleccionada = p.idProvincia;
      }
    });
  }

  // Es invocada desde la capa presentación a través del filtro o al hacer click sobre una provincia
  respuesta(idProvincia: number): void {
    this.inicio = false;
    this.buscarCenads(idProvincia);
  }

  //CODIGO INTERESANTE (de ejemplo)
  //a.setAttributeNS(null, 'routerLink', 'cenads');  // cuando inserta el atributo en el DOM, mantiene la L mayúscula del routerLink

}
