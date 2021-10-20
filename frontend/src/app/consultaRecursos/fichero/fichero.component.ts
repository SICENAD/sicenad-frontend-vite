import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Fichero } from 'src/app/recursos/models/fichero';
import { FicheroImpl } from 'src/app/recursos/models/fichero-impl';
import { RecursoService } from 'src/app/recursos/service/recurso.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fichero',
  templateUrl: './fichero.component.html',
  styleUrls: ['./fichero.component.css']
})
export class FicheroComponent implements OnInit {
  //variable que trae el fichero del otro componente
  @Input() fichero: Fichero;
  //variable que emite un evento al otro componente para eliminar el fichero
  @Output() ficheroEliminar = new EventEmitter<FicheroImpl>();
  //variable para construir la url de descarga del archivo del fichero
  pathRelativo: string = '';
  //variable del icono "eliminar"
  faTrashAlt = faTrashAlt;

  constructor(private recursoService: RecursoService) {}

  ngOnInit() {
    //asigna al campo recurso del fichero el valor del recurso
    this.recursoService.getRecursoDeFichero(this.fichero.idFichero).subscribe((response) => this.fichero.recurso = this.recursoService.mapearRecurso(response));
    //le asigna al campo categoria fichero del fichero la categoria de fichero del mismo
    this.recursoService.getCategoriaFichero(this.fichero.idFichero).subscribe((response) => this.fichero.categoriaFichero = this.recursoService.mapearCategoriaFichero(response));
    setTimeout(() => {
      //construye el path relativo para la url de descarga del archivo
      this.pathRelativo = `${environment.hostSicenad}files/docRecursos/${this.fichero.recurso.idRecurso}/`;
    }, 2000);
  }

  //metodo que emite el evento para eliminar el fichero (y elimina el archivo)
  eliminar(fichero: FicheroImpl): void {
    //elimina el archivo al que se refiere el fichero
    this.recursoService.deleteArchivo(this.fichero.nombreArchivo, this.fichero.recurso.idRecurso).subscribe(); 
    this.ficheroEliminar.emit(fichero);
  }

  //metodo que construye la url de descarga del archivo
  pathArchivo(nombreArchivo: string): string {
    const pathImg: string = `${this.pathRelativo}${nombreArchivo}`;
    return pathImg;    
  }  
}