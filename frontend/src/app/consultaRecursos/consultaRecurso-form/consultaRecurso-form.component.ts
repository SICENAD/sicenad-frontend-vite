import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { CategoriaFichero } from 'src/app/categoriasFichero/models/categoriaFichero';
import { HeaderComponent } from 'src/app/core/shell/header/header.component';
import { Fichero } from 'src/app/recursos/models/fichero';
import { FicheroImpl } from 'src/app/recursos/models/fichero-impl';
import { Recurso } from 'src/app/recursos/models/recurso';
import { RecursoImpl } from 'src/app/recursos/models/recurso-impl';
import { RecursoService } from 'src/app/recursos/service/recurso.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consultaRecurso-form',
  templateUrl: './consultaRecurso-form.component.html',
  styleUrls: ['./consultaRecurso-form.component.css']
})
export class ConsultaRecursoFormComponent implements OnInit {
  //variable que define el usuario gestor que accede para modificar recursos
  idUsuarioGestor: string = '';
  //variable que dice si el usuario esta loggeado como gestor de ese recurso
  isGestorRecurso: boolean = false;
  //variable para cambiar el boton de la vista gestor/previa
  cambioBoton: boolean = false;
  //variable para ver el rol que se esta usando. se borrara cuando haya logging
  rol: string = 'Previa';
  //variable para el icono "volver"
  faVolver =faArrowAltCircleLeft;
  //variable con la que rescatamos de la barra de navegacion el idCenad
  idCenad: string = "";
  //variable con la que rescatamos de la barra de navegacion el idRecurso
  idRecurso: string = '';
  //variable sobre la que se carga el recurso
  recurso: Recurso = new RecursoImpl();
  //variable que da visibilidad al formulario de crear fichero
  nuevoFichero: boolean = false;
  //variable que comunicara los datos del fichero
  ficheroVerDatos: Fichero;
  //variable sobre la que crearemos un fichero nuevo
  fichero: FicheroImpl = new FicheroImpl();
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
  sizeMaxDocRecurso: string = environment.sizeMaxDocRecurso;
  //variables para el modal de imagen
  showModal: boolean;
  imagenModal: Fichero = new FicheroImpl();
  
  constructor(
    private recursoService: RecursoService,
    private router: Router, private activateRoute: ActivatedRoute, private appConfigService: AppConfigService) { }

  //metodo para q el boton cambie de rol. se borrara cuando haya logging
  cambiaRol() {
    this.cambioBoton = this.cambioBoton ? false : true;
    this.rol = this.cambioBoton ? 'Previa' : 'Gestor';
  }

  ngOnInit() {
    //recupera de la BD todas las categorias de fichero y las guarda en la variable para poder seleccionarlas si se añade un fichero nuevo
    this.recursoService.getCategoriasFichero().subscribe((response) => this.categoriasFichero = this.recursoService.extraerCategoriasFichero(response));
    //se recupera el id del recurso de la barra de navegacion
    this.idRecurso = this.activateRoute.snapshot.params['idRecurso'];
    //se recuperan de la BD las categorias de fichero de los ficheros del recurso y se asignan a la variable. esto posibilita filtrar que apartados tendra la vista de usuario
    this.recursoService.getCategoriasFicheroDeRecurso(this.idRecurso).subscribe((response) => {
      if (response._embedded) {//con este condicional elimino el error de consola si no hay ningun fichero
        this.categoriasFicheroDeRecurso = this.recursoService.extraerCategoriasFichero(response);
      }});
    //carga el recurso cuyo id hemos recuperado
    this.cargarRecurso(this.idRecurso);
    //se recupera el id del cenad de la barra de navegacion
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    //se ejecuta con retardo para asegurar que cuando hace la llamada ya tiene el id.
    setTimeout(() => {
      //recupero el idUsuario del gestor del recurso  
      this.recursoService.getUsuarioGestorDeIdRecurso(this.idRecurso).subscribe((response) => {
        // if (response._embedded) {//con este condicional elimino el error de consola si no hay ningun fichero
          this.idUsuarioGestor = this.recursoService.mapearUsuario(response).idUsuario;
      //comprobamos si el usuario es un gestor de este recurso
      if(HeaderComponent.isGestor && (HeaderComponent.idUsuario === this.idUsuarioGestor)) {
        this.isGestorRecurso = this.cambioBoton = true;
      }
    });
      //recupera de la BD lso ficheros del recurso y los asigna a la variable
      this.recursoService.getFicheros(this.idRecurso).subscribe((response) => 
        this.ficheros = this.recursoService.extraerFicheros(response));
      //recupera de la BD la categoria del recurso y se la asigna al campo de la variable del mismo
      this.recursoService.getCategoria(this.idRecurso).subscribe((response) => this.recurso.categoria = this.recursoService.mapearCategoria(response));
      //asigna el path relativo, que junto con el nombreArchivo del fichero formara la url en la que se encuentra el archivo
      this.pathRelativo = `${environment.hostSicenad}files/docRecursos/${this.recurso.idRecurso}/`;  
    }, 1000);
    //para que use el valor del properties.json
    this.sizeMaxDocRecurso = this.appConfigService.sizeMaxDocRecurso;
  }

  //metodo que habilita el formulario para crear fichero
  mostrarNuevoFichero() {
    this.nuevoFichero = true;
  }

  //metodo para crear un nuevo fichero
  crearFichero() {
    //sube el archivo
    this.upload();
    //asigna el nombre del mismo al campo del fichero
    this.fichero.nombreArchivo = this.currentFile.name;
    //crea el fichero propiamente dicho
    this.recursoService.createFichero(this.fichero).subscribe((response) =>
      console.log(`He creado el fichero ${this.fichero.nombre}`));
    setTimeout(() => {
      //actualiza el [] con los ficheros del recurso
      this.recursoService.getFicheros(this.idRecurso).subscribe((response) => 
        this.ficheros = this.recursoService.extraerFicheros(response));
    }, 1000); 
    //cierra el formulario de crear fichero y resetea la variable
    this.nuevoFichero = false;
    this.fichero = new FicheroImpl();
    this.fichero.recurso = `${environment.hostSicenad}recursos/${this.recurso.idRecurso}`;    
  }

  //metodo para eliminar un fichero
  onEliminarFichero(fichero: Fichero): void {
    this.recursoService.deleteFichero(fichero).subscribe(response => {
      console.log(`He eliminado el fichero ${fichero.nombre}`);
      //actualiza el [] con los ficheros del recurso
      this.recursoService.getFicheros(this.idRecurso).subscribe((response) => 
        this.ficheros = this.recursoService.extraerFicheros(response));
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
        //asigna al campo recurso del fichero que se vaya a crear el valor de ese recurso
        this.fichero.recurso = this.recursoService.mapearRecurso(recurso).url;    
      });
    }    
  }

  //metodo para modificar el recurso y volver al listado de los recursos de ese cenad
  actualizar(): void {
    this.recurso.categoria = this.recurso.categoria.url;
    this.recursoService.update(this.recurso).subscribe(
      (recurso) => {
        console.log(`He actualizado el recurso ${this.recurso.nombre}`);
        this.router.navigate([`/principalCenad/${this.idCenad}/consultaRecursos/${this.idCenad}`]);
      });
  }
  //metodos para filtrar en la vista de usuario no gestor
  //metodo que desprecia las categorias de fichero de las cuales el recurso no tiene ningun fichero
  filtrarPorCategoriaFichero(ficheros: Fichero[], categoriaFichero: CategoriaFichero): Fichero[] {
    if (ficheros) {
      return ficheros.filter(f => f.categoriaFichero && f.categoriaFichero.idCategoriaFichero === categoriaFichero.idCategoriaFichero);
    }
  }

  //metodo que selecciona solo las categorias de fichero que son imagenes. implicara que sus ficheros se muestren como imagen
  categoriasFicheroImagenes(categoriasFichero: CategoriaFichero[]):CategoriaFichero[] {
    return categoriasFichero.filter(c => c.tipo ===0);
  }

  //metodo que selecciona solo las categorias de fichero que no son imagenes. implicara que sus ficheros se muestren como enlaces de descarga
  categoriasFicheroHref(categoriasFichero: CategoriaFichero[]):CategoriaFichero[] {
    return categoriasFichero.filter(c => c.tipo !==0);
  }

  //metodo para mostrar el modal de una imagen
  show(imagen: Fichero) {
    // Show-Hide Modal Check
    this.showModal = true; 
    this.imagenModal = imagen;
  }

  //metodo para cerrar el modal de las imagenes
  hide() {
  this.showModal = false;
  }

  //metodo para traspasar los datos del fichero
  verDatosFichero(fichero: Fichero): void {
    this.ficheroVerDatos = fichero;
  }

  //metodo para editar un fichero
  onFicheroEditar(fichero: FicheroImpl): void {
    this.recursoService.updateFichero(fichero).subscribe(response => {
      console.log(`He actualizado el fichero ${fichero.nombre}`);
    //actualiza el [] con los ficheros del recurso
    this.recursoService.getFicheros(this.idRecurso).subscribe((response) => 
    this.ficheros = this.recursoService.extraerFicheros(response));
    });
  }
}