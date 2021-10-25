import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuarioAdministradorService } from 'src/app/usuarios/service/usuarioAdministrador.service';
import { environment } from 'src/environments/environment';
import { CenadImpl } from '../../models/cenad-impl';
import { CenadService } from '../../service/cenad.service';

@Component({
  selector: 'app-cenad-ficha',
  templateUrl: './cenad-ficha.component.html',
  styleUrls: ['./cenad-ficha.component.css']
})
export class CenadFichaComponent implements OnInit {
  //variable que trae del otro componente el cenad
  @Input() cenad: CenadImpl;
  //variables para emitir los eventos al otro componente para editar/eliminar un cenad
  @Output() cenadEliminar = new EventEmitter<CenadImpl>();
  @Output() cenadEditar = new EventEmitter<CenadImpl>();
  //variable que guarda el nombre del administrador
  administrador: string;
  //variables para la subida de archivos de escudos
  selectedFiles: FileList;
  currentFile: File;
  sizeMaxEscudo: string = environment.sizeMaxEscudo;
  //variable con todas las provincias
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

  //metodo que rescata el nombre del administrador del cenad
  actualizarAdministrador(): void {
    this.usuarioAdministradorService.getUsuarioAdministrador(this.cenad).subscribe((response) => this.administrador = this.usuarioAdministradorService.mapearUsuario(response).nombre);
  }

  //metodo que emite el evento para eliminar el cenad y elimina el archivo del escudo
  eliminar(): void {
    this.delete_Archivo(this.cenad);
    this.cenadEliminar.emit(this.cenad);
  }

  //metodo que emite el evento para editar el cenad y elimina el archivo anterior del escudo y carga el nuevo si es necesario
  editar(): void {
    if (this.selectedFiles) {
      this.delete_Archivo(this.cenad);
      this.upload();
      this.cenad.escudo = this.currentFile.name;
    }
    this.cenadEditar.emit(this.cenad);
  }

  //metodo para seleccionar el archivo a subir
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  //metodo para subir el archivo de escudo
  upload() {
    this.currentFile = this.selectedFiles.item(0);
    this.cenadService.upload(this.currentFile).subscribe(
      );
    this.selectedFiles = undefined;
  }

  //metodo para borrar el archivo de escudo del cenad
  delete_Archivo(cenad: CenadImpl) {
    this.cenadService.deleteArchivo(cenad.escudo).subscribe();
  }
}