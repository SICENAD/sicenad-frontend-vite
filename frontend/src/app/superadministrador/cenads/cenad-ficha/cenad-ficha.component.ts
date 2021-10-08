import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CenadImpl } from '../../models/cenad-impl';
import { CenadService } from '../../service/cenad.service';
import { UsuarioAdministradorService } from '../../service/usuarioAdministrador.service';

@Component({
  selector: 'app-cenad-ficha',
  templateUrl: './cenad-ficha.component.html',
  styleUrls: ['./cenad-ficha.component.css']
})
export class CenadFichaComponent implements OnInit {

  @Input() cenad: CenadImpl;
  @Output() cenadEliminar = new EventEmitter<CenadImpl>();
  @Output() cenadEditar = new EventEmitter<CenadImpl>();
  administrador: string;
  selectedFiles: FileList;
  currentFile: File;
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

  constructor(private usuarioAdministradorService: UsuarioAdministradorService, private cenadService: CenadService) { }

  ngOnInit(): void {
    this.actualizarAdministrador();
  }

  actualizarAdministrador(): void {
    this.usuarioAdministradorService.getUsuarioAdministrador(this.cenad).subscribe((response) => this.administrador = this.usuarioAdministradorService.mapearUsuario(response).nombre);
  }

  eliminar(): void {
    this.delete_Archivo(this.cenad);
    this.cenadEliminar.emit(this.cenad);
  }

  editar(): void {
    if (this.selectedFiles) {
      this.delete_Archivo(this.cenad);
      this.upload();
      this.cenad.escudo = this.currentFile.name;
    }
    this.cenadEditar.emit(this.cenad);
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

  delete_Archivo(cenad: CenadImpl) {
    this.cenadService.deleteArchivo(cenad.escudo).subscribe();
  }
}
