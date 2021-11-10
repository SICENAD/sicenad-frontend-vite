import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from 'src/app/services/app-config.service';
import { environment } from 'src/environments/environment';
import { CartografiaImpl } from '../../models/cartografia-impl';
import { CartografiaService } from '../../service/cartografia.service';


@Component({
  selector: 'app-cartografia-ficha',
  templateUrl: './cartografia-ficha.component.html',
  styleUrls: ['./cartografia-ficha.component.css']
})
export class CartografiaFichaComponent implements OnInit {
 //variable que recogera el host del properties.json
 hostSicenad: string = environment.hostSicenad;
 //variable para recuperar el id del CENAD/CMT
 idCenad: string = "";
  //variable que me comunica del otro componente la cartografia a ver/editar
  @Input() cartografia: CartografiaImpl;
  //variables que comunican al otro componente el evento para editar/eliminar la cartografia
  @Output() cartografiaEliminar = new EventEmitter<CartografiaImpl>();
  @Output() cartografiaEditar = new EventEmitter<CartografiaImpl>();
  //variables para la subida de archivos de escudos
  selectedFiles: FileList;
  currentFile: File;
  archivoSubido: boolean = false;  //variable que marca el tamaño maximo de la cartografia a subir
  sizeMaxCartografia: number = environment.sizeMaxCartografia;
 //variable que guarda la categoria de fichero de cartografia 
 categoriaFicheroCartografia: string = environment.categoriaFicheroCartografia;
  
 constructor(private activateRoute: ActivatedRoute, private cartografiaService: CartografiaService,
              private appConfigService: AppConfigService) {
                  this.hostSicenad = appConfigService.hostSicenad ? appConfigService.hostSicenad : environment.hostSicenad;
                  this.sizeMaxCartografia = appConfigService.sizeMaxCartografia ? appConfigService.sizeMaxCartografia : environment.sizeMaxCartografia;
                  this.categoriaFicheroCartografia = appConfigService.categoriaFicheroCartografia ? appConfigService.categoriaFicheroCartografia : environment.categoriaFicheroCartografia;
  }

  ngOnInit(): void {
    //recuperamos el id del CENAD de la barra de navegacion
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    //recuperamos del properties.json, si existe, el host
    this.hostSicenad = this.appConfigService.hostSicenad ? this.appConfigService.hostSicenad : environment.hostSicenad;
    //asignamos el CENAD a la categoria que creamos
    this.cartografia.cenad = `${this.hostSicenad}cenads/${this.idCenad}`;
    this.cartografia.categoriaFichero = `${this.hostSicenad}categoriasFichero/${this.categoriaFicheroCartografia}`;
  }

  //metodo que emite el evento al otro componente para eliminar la cartografia
  eliminar(): void {
    this.cartografiaEliminar.emit(this.cartografia);
  }

  //metodo que emite el evento al otro componente para editar la cartografia
  editar(): void {
    if (this.selectedFiles) { 
      this.upload();
      if(this.archivoSubido) {
        this.delete_Archivo(this.cartografia);
        this.cartografia.nombreArchivo = this.currentFile.name;
        this.cartografiaEditar.emit(this.cartografia);
      } 
    } else {
      this.cartografiaEditar.emit(this.cartografia);
    }
  }

  //metodo para seleccionar el archivo a subir
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  
  //metodo para subir el archivo 
  upload() {
    this.currentFile = this.selectedFiles.item(0);
    //compruebo si es imagen para aplicarle el tamaño maximo de imagen o el de docRecurso
    this.archivoSubido = (this.currentFile.size > this.sizeMaxCartografia * 1024 * 1024 * 1024) ? false : true;
    this.cartografiaService.upload(this.currentFile, this.idCenad).subscribe();
    this.selectedFiles = undefined;
  }
  
  //metodo para borrar el archivo del fichero
  delete_Archivo(cartografia: CartografiaImpl) {
    this.cartografiaService.deleteArchivo(cartografia.nombreArchivo, this.idCenad).subscribe(); 
  }
}