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

  @Input() fichero: Fichero;
  @Output() ficheroEliminar = new EventEmitter<FicheroImpl>();

  pathRelativo: string = '';
  faTrashAlt = faTrashAlt;

  constructor(private recursoService: RecursoService) { }

  ngOnInit() {
    this.recursoService.getRecursoDeFichero(this.fichero.idFichero).subscribe((response) => this.fichero.recurso = this.recursoService.mapearRecurso(response));
    this.recursoService.getCategoriaFichero(this.fichero.idFichero).subscribe((response) => this.fichero.categoriaFichero = this.recursoService.mapearCategoriaFichero(response));
    setTimeout(() => {
      this.pathRelativo = `${environment.hostSicenad}files/docRecursos/${this.fichero.recurso.idRecurso}/`;
    }, 2000);
  }

  eliminar(fichero: FicheroImpl): void {
    this.recursoService.deleteArchivo(this.fichero.nombreArchivo, this.fichero.recurso.idRecurso).subscribe(); 
    this.ficheroEliminar.emit(fichero);

  }

  pathArchivo(nombreArchivo: string): string {
    const pathImg: string = `${this.pathRelativo}${nombreArchivo}`;
    return pathImg;    
  }  
}
