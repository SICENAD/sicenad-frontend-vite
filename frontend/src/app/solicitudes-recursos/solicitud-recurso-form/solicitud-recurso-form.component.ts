import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faReadme } from '@fortawesome/free-brands-svg-icons';
import { faArrowAltCircleLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from 'src/app/categorias/models/categoria';
import { CategoriaImpl } from 'src/app/categorias/models/categoria-impl';
import { Recurso } from 'src/app/recursos/models/recurso';
import { RecursoService } from 'src/app/recursos/service/recurso.service';
import { Unidad } from 'src/app/unidades/models/unidad';
import { UnidadImpl } from 'src/app/unidades/models/unidad-impl';
import { UnidadService } from 'src/app/unidades/service/unidad.service';
import { UsuarioAdministrador } from 'src/app/usuarios/models/usuarioAdministrador';
import { UsuarioAdministradorImpl } from 'src/app/usuarios/models/usuarioAdministrador-impl';
import { UsuarioNormal } from 'src/app/usuarios/models/usuarioNormal';
import { UsuarioNormalImpl } from 'src/app/usuarios/models/usuarioNormal-impl';
import { SolicitudRecurso } from '../models/solicitud-recurso';
import { SolicitudRecursoImpl } from '../models/solicitud-recurso-impl';
import { SolicitudRecursoService } from '../service/solicitud-recurso.service';

@Component({
  selector: 'app-solicitud-recurso-form',
  templateUrl: './solicitud-recurso-form.component.html',
  styleUrls: ['./solicitud-recurso-form.component.css'],
  providers: [DatePipe]
})
export class SolicitudRecursoFormComponent implements OnInit {

  //iconos FontAwesome
  faVolver =faArrowAltCircleLeft;
  faLectura = faReadme;
  faEdit = faEdit;
  //id de la solicitud
  idSolicitud: string = "";
  //id del Cenad
  idCenad: string = "";
  //variables para parsear las fechas
  fechaSolicitudParse: string;
  fechaInicioParse: string;
  fechaFinParse: string;
  //estado de la solicitud
  estadoSeleccionado: string = "";
  //estado anterior de la solicitud
  estadoAnterior: string = "";
  //nombre de la unidad
  unidad: string = "";
  //para cambiar de edición/creación en el formulario
  boton: boolean = true;
  //comprobación si un usuario se ha autenticado
  isAutenticado: boolean = true;
  //si un usuairo es normal
  isUsuarioNormal: boolean = true;
  // si un usuario en administrador
  isAdministrador: boolean = false;
  //si la solicitud tiene el estado borrador
  isBorrador: boolean;
  //instancia objeto SolicitudRecurso
  solicitud: SolicitudRecurso = new SolicitudRecursoImpl();
  //instancia objeto usuario Administrador
  usuarioAdministrador: UsuarioAdministrador;
  //instancia objeto UsuarioNormal
  usuarioNormal: UsuarioNormal;
  //instancia objeto Categoría
  categoriaSeleccionada: Categoria = new CategoriaImpl();
  //instancia objeto Unidad
  unidadSeleccionada: Unidad = new UnidadImpl();
  //endpoint del recurso seleccionado
  uRlRecursoSeleccionado: string = "";
  //array[] de Recursos de una categoría
  recursosDeCategoria: Recurso [] = [];
  //array[] de las categorías de un Cenad
  categoriasCenad: Categoria [] = [];
  //array[] de las categorias filtradas
  categoriasFiltradas: Categoria [] = [];
  //array[] de Unidades
  unidades: Unidad [] = [];
  //fecha actual del sistema
  fechaActual: string;

  constructor(private activateRoute: ActivatedRoute, private solicitudService: SolicitudRecursoService,
    private recursoService: RecursoService, private router: Router, private miDatePipe: DatePipe, private unidadService: UnidadService) { }

  ngOnInit() {
    this.getParams();
    this.getFechaActual();
    this.cargaDatosPruebas();
    this.getCategorias();
    this.getUcos();
    this.iniCreateEditSolicitud();
  }

  //método que comprueba si llega como parámetro, a través de la barra de navegación, el id de la solicitud a editar
  //inicializando las variables correspondientes
  iniCreateEditSolicitud(): void {
    if (this.idSolicitud != "") { //edición
      this.boton = false;
      this.solicitudService.getSolicitud(this.idSolicitud).subscribe((response) => {
        this.solicitud = this.solicitudService.mapearSolicitud(response);
        this.fechaSolicitudParse = this.actualizarFechaInv(this.solicitud.fechaSolicitud);
        this.fechaInicioParse = this.solicitud.fechaHoraInicioRecurso;
        this.fechaFinParse = this.solicitud.fechaHoraFinRecurso;
        this.solicitud.estado === "Borrador" ? this.isBorrador = true : this.isBorrador = false;
        this.estadoSeleccionado = this.solicitud.estado;
      });
      setTimeout(()=> {
        this.solicitudService.getUsuarioNormalDeSolicitud(this.idSolicitud).subscribe((response)=> {
             this.solicitud.usuarioNormal = this.solicitudService.mapearUsuarioNormal(response);
          });
        this.solicitudService.getRecursoDeSolicitud(this.idSolicitud).subscribe((response)=> {
              this.solicitud.recurso = this.solicitudService.mapearRecurso((response));
          });
      }, 700);

      setTimeout(()=> {
        this.uRlRecursoSeleccionado = this.solicitud.recurso.url;
        this.categoriaSeleccionada = this.solicitud.recurso.categoria;
        this.unidad = this.solicitud.usuarioNormal.unidad.nombre;
        this.filtrar();
      }, 1000);

    } else { //creación
      this.solicitud.estado = "Borrador";
      this.isBorrador = true;
      this.unidad = this.usuarioNormal.unidad.nombre;
      this.fechaSolicitudParse = this.fechaActual;
    }
  }

  // método que obtiene del local storage todas las categorías del Cenad
  getCategorias(): void {
    this.categoriasCenad = JSON.parse(localStorage.getItem(`categorias_${this.idCenad}`));
  }

  // método que obtiene del local storage todas las Unidades
  getUcos(): void {
    this.unidades = JSON.parse(localStorage.unidades);
  }

  //método que captura los parámetros (idSolicitud y idCenad) de la barra de navegación
  getParams(): void {
    this.idSolicitud = this.activateRoute.snapshot.params['idSolicitud'];
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
  }

  //método para cargar datos de pruebas
  cargaDatosPruebas(): void {
    this.usuarioAdministrador = new UsuarioAdministradorImpl();
    this.usuarioAdministrador.nombre = "ADMIN CENAD SG";
    this.usuarioNormal = new UsuarioNormalImpl();
    this.usuarioNormal.url = "http://localhost:8081/api/usuarios_normal/3";
    this.usuarioNormal.nombre = "ring8-s3";
    let unidadPrueba: Unidad = new UnidadImpl();
    unidadPrueba.nombre = "RING-8";
    this.usuarioNormal.unidad = unidadPrueba;
  }

  //método que captura la fecha actual y actualiza la variable local fechaActual: string en formato YYYY-MM-dd (input date)
  getFechaActual(): void {
    const tiempoTranscurrido = Date.now();
    this.fechaActual = this.cambiarFormatoDateStringsinHora(new Date(tiempoTranscurrido).toString());
  }

  //método que asigna los valores de las fechas del formulario a los distintos campos del objeto solicitud
  actualizarFechas(): void {
    this.solicitud.fechaSolicitud = this.actualizarFechaSolicitud(this.fechaSolicitudParse);
    this.solicitud.fechaHoraInicioRecurso = this.fechaInicioParse;
    this.solicitud.fechaHoraFinRecurso = this.fechaFinParse;
  }

  //método que actualiza datos
  actualizarDatos(): void {
    this.actualizarFechas();
    //si el usuario logeado es administrador puede cambiar el estado de una solicitud
    this.isAdministrador ? this.solicitud.estado = this.estadoSeleccionado : "";
    //asigna el endpoint del usuario normal que ha realizado la solicitud
    this.solicitud.usuarioNormal = this.usuarioNormal.url;
    //asigna el endopint del recurso seleccionado en la solicitud
    this.solicitud.recurso = this.uRlRecursoSeleccionado;
  }

  //método que crea una solicitud con los datos del formulario y redirecciona a la página de solicitudes de recursos
  create(): void {
    this.actualizarDatos();
    this.solicitudService.create(this.solicitud).subscribe((response)=> {
      //console.log(response);
      this.router.navigate([`/principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}`]);
    });
  }

  //método que borra una solicitud, solicitando previamente confirmación
  borrarSolicitud(): void {
    if (confirm('Va a eliminar una Solicitud, ¿Está seguro?')) {
      this.solicitudService.delete(this.solicitud).subscribe((response)=> {
        console.log(response);
       this.router.navigate([`/principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}`]);
      });
    }
  }

  //método que se ejecuta al hacer click sobre el botón Actualilzar
  //actualiza los datos del formulario y solicita confirmación para tramitar la solicitud
  //en caso afirmativo, cambia el estado y redirecciona a la paǵina de solicitudes de recursos
  actualizar(): void {
    this.actualizarDatos();
    if (confirm ('¿Tramitar la Solicitud?')) {
      this.solicitud.estado = "Solicitada";
    }
    this.solicitudService.update(this.solicitud).subscribe((response)=> {
      //console.log(response);
    });
    this.router.navigate([`/principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}`]);
  }

  //método que se ejecuta al hacer click sobre el botón Tramitar Solicitud
  //cambia el estado de dicha solicitud a Solicitada y solicita confirmación para guardar los cambios
  //en caso afirmativo actualiza los datos y posteriormente los guarda y redirecciona a la página de
  //solicitudes de recursos
  tramitarSolicitud(): void {
      this.solicitud.estado = "Solicitada";
      if (confirm ('¿Guardar los Cambios?')) {
        this.actualizarDatos();
      }
      this.solicitudService.update(this.solicitud).subscribe((response)=> {
       // console.log(response);
      });
     this.router.navigate([`/principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}`]);
  }

  //método que se ejecuta cuando se produce un cambio en el imput de la fecha del formulario
  //comprueba si la fecha de fin de recurso es menor que la fecha de inicio
  //en caso afirmativo muestra un mensaje por pantalla e inicializa el valor de la fecha
  verificarFechas(): void {
    if (this.fechaFinParse < this.fechaInicioParse) {
      alert('La fecha de FIN debe ser mayor que la de INICIO');
      this.fechaFinParse = "";
    }
  }

  //método que recibe un parámetro Date y lo transforma a un Date con formato yyyy-MM-dd HH:mm:ss
  cambiarFormatoDate(date: Date): Date {
    let stringDate =  this.miDatePipe.transform(date, 'dd-MM-yyyy HH:mm:ss');
    let arrayDate: any[] = stringDate.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[2], arrayDate[1]-1, arrayDate[0], arrayDate[3], arrayDate[4], arrayDate[5]);
    return fechaDate;
  }

 //método que recibe un parámetro Date y lo transforma a un Date con formato yyyy-MM-dd
  cambiarFormatoDatesinHora(date: Date): Date {
    let stringDate =  this.miDatePipe.transform(date, 'dd-MM-yyyy');
    let arrayDate: any[] = stringDate.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[2], arrayDate[1]-1, arrayDate[0]);
    return fechaDate;
  }

  //método que recibe un parámetro string y lo transforma a un Date con formato yyyy-MM-dd HH:mm:ss
  cambiarFormatoDate2(date: string): Date {
    let arrayDate: any[] = date.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[2], arrayDate[1]-1, arrayDate[0], arrayDate[3], arrayDate[4], arrayDate[5]);
    return fechaDate;
  }

  //método que recibe un parámetro string y lo transforma a un Date con formato yyyy-MM-dd HH:mm:ss
  cambiarFormatoDate2sinHora(date: string): Date {
     let arrayDate: any[] = date.split(/[/\s\:\-]/g);
     let fechaDate: Date = new Date(arrayDate[2], arrayDate[1]-1, arrayDate[0]);
     return fechaDate;
   }

   //método que recibe un parámetro string y lo transforma a un string con formato yyyy-MM-dd
   cambiarFormatoDateStringsinHora(date: string): string {
     let stringDate =  this.miDatePipe.transform(date, 'yyyy-MM-dd');
     return stringDate;
   }

   //método que recibe un parámetro string y lo transforma a un string con formato yyyy-MM-dd
   actualizarFechaInv(fecha: string): string {
    let fechaActualizadaInv = fecha.slice(6,10) + "-" + fecha.slice(3,5) + "-" + fecha.slice(0,2);
    return  fechaActualizadaInv;
  }

  //método que recibe como parámetro string la fecha de la solicitud y lo transforma a un string con formato dd-MM-yyyy 00:00:00
  actualizarFechaSolicitud(fecha: string): string {
    let fechaActualizada = fecha.slice(8,11) + "-" + fecha.slice(5,7) + "-" + fecha.slice(0,4) + " 00:00:00";
    return fechaActualizada;
  }


  //método que guarda el estado anterior
  guardarEstadoAnterior(): void {
    this.estadoAnterior = this.estadoSeleccionado;
  }

  //método que solicita confirmación al administrador cuando cambia el estado a la solicitud
  preguntar(): void {
     if (confirm('Ha cambiado el estado, ¿Está seguro?')) {
       this.solicitud.estado = this.estadoSeleccionado;
     } else {
       this.estadoSeleccionado = this.estadoAnterior;
     }
   }

  //metodo para filtrar recursivamente las categorias
  filtrar() {
    //rescata de la BD las subcategorias de la categoria seleccionada
    this.recursoService.getSubcategorias(this.categoriaSeleccionada).subscribe((response) =>
      this.categoriasFiltradas = this.recursoService.extraerCategorias(response));
    setTimeout(() => {
      //si la categoria seleccionada no tiene subcategorias muestra los recursos de esa categoria
      if (this.categoriasFiltradas.length === 0) {
    //rescatamos de la BD los recursos de ese cenad de esa categoria seleccionada
        this.recursoService.getRecursosDeCategoria(this.categoriaSeleccionada).subscribe((response) => {
          if (response._embedded) {//con este condicional elimino el error de consola si no hay ningun recurso
            this.recursosDeCategoria = this.recursoService.extraerRecursos(response);
          }
        });
      } else {//muestra los recursos de sus subcategorias, esten al nivel que esten
              this.recursoService.getRecursosDeSubcategorias(this.categoriaSeleccionada).subscribe((response) => this.recursosDeCategoria = this.recursoService.extraerRecursos(response));
          }
    }, 500);
  }

  //metodo que resetea los filtros y regresa al listado de recursos del cenad
  borrarFiltros() {
    //rescata del local storage las categorias padre del cenad
    this.categoriasFiltradas = JSON.parse(localStorage.getItem(`categoriasPadre_${this.idCenad}`));
    //rescatamos del local storage los recursos de ese cenad
    this.recursosDeCategoria = JSON.parse(localStorage.getItem(`recursos_${this.idCenad}`));
    //resetea la categoria seleccionada
    this.categoriaSeleccionada = null;
  }
}
