import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { CenadImpl } from '../../models/cenad-impl';
import { UsuarioAdministrador } from '../../models/usuarioAdministrador';
import { CenadService } from '../../service/cenad.service';
import { UsuarioAdministradorService } from '../../service/usuarioAdministrador.service';

@Component({
  selector: 'app-cenad-form',
  templateUrl: './cenad-form.component.html',
  styleUrls: ['./cenad-form.component.css']
})
export class CenadFormComponent implements OnInit {

  cenad: CenadImpl = new CenadImpl();
  administradores: UsuarioAdministrador[] = [];

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

  selectedFiles: FileList;
  currentFile: File;

  faVolver =faArrowAltCircleLeft;

  constructor(
    private cenadService: CenadService,
    private usuarioAdministradorService: UsuarioAdministradorService,
    private router: Router) { }

    ngOnInit(): void {
      this.usuarioAdministradorService.getUsuarios().subscribe((response) => this.administradores = this.usuarioAdministradorService.extraerUsuarios(response));
    }

  crearCenad(): void {
    this.upload();
    this.cenad.escudo = this.currentFile.name;
    this.cenadService.create(this.cenad).subscribe((response) => {
      console.log(`He creado el CENAD/CMT ${this.cenad.nombre}`);
      this.router.navigate(['/superadministrador']);
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFile = this.selectedFiles.item(0);
    this.cenadService.upload(this.currentFile).subscribe(
      );
    this.selectedFiles = undefined;
  }

}
