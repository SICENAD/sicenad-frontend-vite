import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { CategoriaFichero } from 'src/app/categoriasFichero/models/categoriaFichero';
import { Fichero } from 'src/app/recursos/models/fichero';
import { FicheroImpl } from 'src/app/recursos/models/fichero-impl';
import { Recurso } from 'src/app/recursos/models/recurso';
import { RecursoImpl } from 'src/app/recursos/models/recurso-impl';
import { RecursoService } from 'src/app/recursos/service/recurso.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consultaRecurso-form',
  templateUrl: './consultaRecurso-form.component.html',
  styleUrls: ['./consultaRecurso-form.component.css']
})
export class ConsultaRecursoFormComponent implements OnInit {

  faVolver =faArrowAltCircleLeft;
  
  //variable con la que rescatamos de la barra de navegacion el idCenad
  idCenad: string = "";

  //variable con la que rescatamos de la barra de navegacion el idRecurso
  idRecurso: string = '';
  
  //variable sobre la que se carga el recurso
  recurso: Recurso = new RecursoImpl();

  //variable que varia la vista gestor y la vista usuario
  isGestor: boolean = true;

  //variable que da visibilidad al formulario de crear fichero
  nuevoFichero: boolean = false;

  //variable sobre la que crearemos un fichero nuevo
  fichero: Fichero = new FicheroImpl();
  
  //variable con todos los ficheros del recurso
  ficheros: Fichero[];

  //variable para dar al gestor la opcion de elegir que categoria de fichero asignar a cada fichero
  categoriasFichero: CategoriaFichero[] = [];
  
  //variable que me filtra las categorias de fichero, y por tanto los apartados, a mostrar en la vista no gestor
  categoriasFicheroDeRecurso: CategoriaFichero[] = [];
  
  //variables para subida de archivos
  pathRelativo: string = `${environment.hostSicenad}files/docRecursos/${this.recurso.idRecurso}/`;
  selectedFiles: FileList;
  currentFile: File;

  //variables para el modal de imagen
  showModal: boolean;
  imagenModal: Fichero = new FicheroImpl();
  
  constructor(
    private recursoService: RecursoService,
    private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.recursoService.getCategoriasFichero().subscribe((response) => this.categoriasFichero = this.recursoService.extraerCategoriasFichero(response));
    this.idRecurso = this.activateRoute.snapshot.params['idRecurso'];
    this.recursoService.getCategoriasFicheroDeRecurso(this.idRecurso).subscribe((response) => {
      this.categoriasFicheroDeRecurso = this.recursoService.extraerCategoriasFichero(response);});
    this.cargarRecurso(this.idRecurso);
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    setTimeout(() => {
      this.recursoService.getFicheros(this.recurso.idRecurso).subscribe((response) => {
        this.ficheros = this.recursoService.extraerFicheros(response);
      });
      this.recursoService.getCategoria(this.recurso).subscribe((response) => this.recurso.categoria = this.recursoService.mapearCategoria(response));
      this.pathRelativo = `${environment.hostSicenad}files/docRecursos/${this.recurso.idRecurso}/`;  
    }, 1000);
  }
//metodo que habilita el formulario para crear fichero
  mostrarNuevoFichero() {
    this.nuevoFichero = true;

  }
//metodo para crear un nuevo fichero
  crearFichero() {
    this.upload();
    this.fichero.nombreArchivo = this.currentFile.name;
    this.recursoService.createFichero(this.fichero).subscribe((response) =>
      console.log(`He creado el fichero ${this.fichero.nombre}`));
    setTimeout(() => {
      this.recursoService.getFicheros(this.recurso.idRecurso).subscribe((response) => {
        this.ficheros = this.recursoService.extraerFicheros(response);
      });
    }, 1000); 
    this.nuevoFichero = false;
    this.fichero = new FicheroImpl();
  }

  //metodo para eliminar un fichero
  onEliminarFichero(fichero: Fichero): void {
    this.recursoService.deleteFichero(fichero).subscribe(response => {
      console.log(`He eliminado el fichero ${fichero.nombre}`);
      this.recursoService.getFicheros(this.recurso.idRecurso).subscribe((response) => {
        this.ficheros = this.recursoService.extraerFicheros(response);
      });
    });
  }

//metodo para seleccionar el archivo a subir
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
//metodo para subir un archivo
  upload() {
    this.currentFile = this.selectedFiles.item(0);
    this.recursoService.upload(this.currentFile, this.recurso.idRecurso).subscribe(
      );
    this.selectedFiles = undefined;
  }
//metodo para construir la url del archivo a mostrar o descargar
  pathArchivo(nombreArchivo: string): string {
    const pathImg: string = `${this.pathRelativo}${nombreArchivo}`;
    return pathImg;    
  }
//metodo para cargar el recurso
  cargarRecurso(id): void {
    if (id) {
      this.recursoService.getRecurso(id).subscribe((recurso) => {
        this.recurso = this.recursoService.mapearRecurso(recurso);
        this.fichero.recurso = this.recursoService.mapearRecurso(recurso).url;    
      });
    }    
  }

  //metodo para modificar el recurso
  actualizar(): void {
    this.recursoService.update(this.recurso).subscribe(
      (recurso) => {
        console.log(`He actualizado el recurso ${this.recurso.nombre}`);
        this.router.navigate([`/principalCenad/${this.idCenad}/consultaRecursos/${this.idCenad}`]);
      });
  }
//metodos para filtrar en la vista de usuario no gestor
  filtrarPorCategoriaFichero(ficheros: Fichero[], categoriaFichero: CategoriaFichero): Fichero[] {
    return ficheros.filter(f => f.categoriaFichero.idCategoriaFichero === categoriaFichero.idCategoriaFichero);
  }

  categoriasFicheroImagenes(categoriasFichero: CategoriaFichero[]):CategoriaFichero[] {
    return categoriasFichero.filter(c => c.tipo ===0);
  }

  categoriasFicheroHref(categoriasFichero: CategoriaFichero[]):CategoriaFichero[] {
    return categoriasFichero.filter(c => c.tipo !==0);
  }

    //metodo para mostrar el modal de una imagen
    show(imagen: Fichero)
    {
      this.showModal = true; // Show-Hide Modal Check
      this.imagenModal = imagen;
      
    }

    //metodo para cerrar el modal de las imagenes
    hide()
    {
      this.showModal = false;
    }
}



