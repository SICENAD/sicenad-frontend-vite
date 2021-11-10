import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { AppConfigService } from 'src/app/services/app-config.service';
import { environment } from 'src/environments/environment';
import { Cartografia } from '../models/cartografia';
import { CartografiaImpl } from '../models/cartografia-impl';
import { CartografiaService } from '../service/cartografia.service';


@Component({
  selector: 'app-cartografia-form',
  templateUrl: './cartografia-form.component.html',
  styleUrls: ['./cartografia-form.component.css']
})
export class CartografiaFormComponent implements OnInit {
  //variable que recogera el host del properties.json
  hostSicenad: string = environment.hostSicenad;
  //variable para recuperar el id del CENAD/CMT
  idCenad: string = "";
  //variable con la que guardar la nueva cartografia
  cartografia: Cartografia = new CartografiaImpl();
  //variable para icono "volver"
  faVolver =faArrowAltCircleLeft;
  //variables para subida de archivos
  pathRelativo: string = `${this.hostSicenad}files/cartografias/${this.idCenad}/`;
  selectedFiles: FileList;
  currentFile: File;
  archivoSubido: boolean = false;
  //variable que marca el tamaño maximo de la cartografia a subir
  sizeMaxCartografia: number = environment.sizeMaxCartografia;
  //variable que guarda la categoria de fichero de cartografia 
  categoriaFicheroCartografia: string = environment.categoriaFicheroCartografia;

  constructor(
    private cartografiaService: CartografiaService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private appConfigService: AppConfigService) {
      this.hostSicenad = appConfigService.hostSicenad ? appConfigService.hostSicenad : environment.hostSicenad;
      this.sizeMaxCartografia = appConfigService.sizeMaxCartografia ? appConfigService.sizeMaxCartografia : environment.sizeMaxCartografia;
      this.categoriaFicheroCartografia = appConfigService.categoriaFicheroCartografia ? appConfigService.categoriaFicheroCartografia : environment.categoriaFicheroCartografia;

    }

  ngOnInit() {
    //recuperamos el id del CENAD de la barra de navegacion
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    //recuperamos del properties.json, si existe, el host
    this.hostSicenad = this.appConfigService.hostSicenad ? this.appConfigService.hostSicenad : environment.hostSicenad;
     //asigna el path relativo, que junto con el nombreArchivo del fichero formara la url en la que se encuentra el archivo
     this.pathRelativo = `${this.hostSicenad}files/cartografias/${this.idCenad}/`;
    //asignamos el CENAD a la categoria que creamos
    this.cartografia.cenad = `${this.hostSicenad}cenads/${this.idCenad}`;

    this.cartografia.categoriaFichero = `${this.hostSicenad}categoriasFichero/${this.categoriaFicheroCartografia}`;

  }

  //metodo para crear una nueva cartografia y volver al listado de cartografias de ese cenad
  crearCartografia(): void {//sube el archivo, le asigna el nombre al campo escudo y crea el cenad
    this.upload();
    this.cartografia.nombreArchivo = this.currentFile.name;
    //compruebo que el archivo se sube antes de crear el cenad
    if(this.archivoSubido) {
      this.cartografiaService.create(this.cartografia).subscribe((response) => {
        //actualizamos el localStorage
        this.cartografiaService.getCartografiasDeCenad(this.idCenad).subscribe((response) => {
          localStorage.setItem(`cartografias_${this.idCenad}`, JSON.stringify(this.cartografiaService.extraerCartografias(response)));
          console.log(`He creado la cartografia ${this.cartografia.nombre}`);
          this.router.navigate([`/principalCenad/${this.idCenad}/cartografias/${this.idCenad}`]);
        });
      });
    }
  }

  //metodo para seleccionar el archivo a subir
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  
  //metodo para subir los archivos
  upload() {
    this.currentFile = this.selectedFiles.item(0);
    //si supera el tamaño archivoSubido sera false, y no se creara el cenad
    this.archivoSubido = (this.currentFile.size > this.sizeMaxCartografia * 1024 * 1024 * 1024) ? false : true;//debo pasarlo a bytes y son gigas
    this.cartografiaService.upload(this.currentFile, this.idCenad).subscribe();
    this.selectedFiles = undefined;
  }

  //metodo para construir la url del archivo a mostrar o descargar
  pathArchivo(nombreArchivo: string): string {
    const pathImg: string = `${this.pathRelativo}${nombreArchivo}`;
    return pathImg;    
  }
}