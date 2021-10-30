import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { CenadImpl } from 'src/app/superadministrador/models/cenad-impl';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  inicio: boolean = true;
  //variables para la seleccion de la provincia
  idProvinciaSeleccionada: number;
  provinciaSeleccionada: string = "";
  //variable que recoge todos los cenads
  cenads: Cenad[] = [];
  //variable que contendra los cenads de la provincia seleccionada
  cenadsFiltro: Cenad[] = [];
  //[] que contiene todas las provincias
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
    this.cenads = JSON.parse(localStorage.cenads);

  }

  // Asigna al array cenadsFiltro todos los CENAD,s/CMT,s de una provincia
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
}