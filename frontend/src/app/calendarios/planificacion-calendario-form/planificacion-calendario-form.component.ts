import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faReadme } from '@fortawesome/free-brands-svg-icons';
import { faArrowAltCircleLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from 'src/app/categorias/models/categoria';
import { CategoriaImpl } from 'src/app/categorias/models/categoria-impl';
import { Recurso } from 'src/app/recursos/models/recurso';
import { RecursoImpl } from 'src/app/recursos/models/recurso-impl';
import { RecursoService } from 'src/app/recursos/service/recurso.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { SolicitudRecursoService } from 'src/app/solicitudes-recursos/service/solicitud-recurso.service';
import { Unidad } from 'src/app/unidades/models/unidad';
import { UnidadService } from 'src/app/unidades/service/unidad.service';
import { SolicitudCalendario } from '../models/solicitud-calendario';
import { SolicitudCalendarioImpl } from '../models/solicitud-calendario-impl';

@Component({
  selector: 'app-planificacion-calendario-form',
  templateUrl: './planificacion-calendario-form.component.html',
  styleUrls: ['./planificacion-calendario-form.css'],
  providers: [DatePipe]
})
export class PlanificacionCalendarioFormComponent implements OnInit {

  //iconos FontAwesome
  faVolver = faArrowAltCircleLeft;
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

  //para cambiar de edición/creación en el formulario
  boton: boolean = true;
  //comprobación si un usuario se ha autenticado
  isAutenticado: boolean = false;
  //si un Usuario es superAdministrador
  isSuperAdmin: boolean = false;
  //instancia objeto Solicitud
  solicitud: SolicitudCalendario = new SolicitudCalendarioImpl();
  //instancia objeto Categoría
  categoriaSeleccionada: Categoria = new CategoriaImpl();
  //endpoint del recurso seleccionado
  uRlRecursoSeleccionado: string = "";
  //instancia objeto Recurso
  recurso: Recurso = new RecursoImpl();
  //array[] de Recursos de una categoría
  recursosDeCategoria: Recurso[] = [];
  //array[] de las categorías de un Cenad
  categoriasCenad: Categoria[] = [];
  //array[] de las categorias filtradas
  categoriasFiltradas: Categoria[] = [];
  //array[] de Unidades
  unidades: Unidad[] = [];
  //fecha actual del sistema
  fechaActual: string;
  //nombre del usuario loggeado
  nombreUser: string = "";
  //id del usuario logggeado
  idUser: string = "";
  //nombre de la unidad
  unidadSeleccionada: string = "";


  constructor(private activateRoute: ActivatedRoute, private solicitudService: SolicitudRecursoService,
    private recursoService: RecursoService, private router: Router, private miDatePipe: DatePipe,
    private unidadService: UnidadService, private appConfigService: AppConfigService) { }

  ngOnInit() {
    this.getParams();
    this.comprobarUser();
    this.getFechaActual();
    this.getCategorias();
    this.getUcos();
    this.cargaDatos();
    this.iniCreateEditSolicitud();
  }

  //método que captura los parámetros (idSolicitud y idCenad) de la barra de navegación
  getParams(): void {
    this.idSolicitud = this.activateRoute.snapshot.params['idSolicitud'];
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
  }

  //método que comprueba el rol del usuario logeado en el sistema
  comprobarUser(): void {
    if (sessionStorage.isLogged == undefined) {
      this.isAutenticado = false;
    } else {
      sessionStorage.isLogged.toString() == "true" ? this.isAutenticado = true : this.isAutenticado = false;
    }
    if (this.isAutenticado) {
      if (sessionStorage.isSuperAdmin == "true") {
        this.isSuperAdmin = true;
      }
    }
  }

  //método que captura la fecha actual y actualiza la variable local fechaActual: string en formato YYYY-MM-dd (input date)
  getFechaActual(): void {
    const tiempoTranscurrido = Date.now();
    this.fechaActual = this.cambiarFormatoDateStringsinHora(new Date(tiempoTranscurrido).toString());
  }

  // método que obtiene del local storage todas las categorías del Cenad
  getCategorias(): void {
    this.categoriasCenad = JSON.parse(localStorage.getItem(`categorias_${this.idCenad}`));
  }

  // método que obtiene del local storage todas las Unidades
  getUcos(): void {
    this.unidades = JSON.parse(localStorage.unidades);
  }

  //método para cargar los datos iniciales
  cargaDatos(): void {
    this.nombreUser = sessionStorage.nombreUsuario;
  }


  //método que comprueba si llega como parámetro, a través de la barra de navegación, el id de la solicitud a editar
  //inicializando las variables correspondientes
  iniCreateEditSolicitud(): void {
    if (this.idSolicitud != "") { //edición
      this.boton = false;
      this.solicitudService.getSolicitudCalendario(this.idSolicitud).subscribe((response) => {
        this.solicitud = this.solicitudService.mapearSolicitudPlanificada(response);
        this.fechaSolicitudParse = this.actualizarFechaInv(this.solicitud.fechaSolicitud);
        this.fechaInicioParse = this.actualizarFechaInv(this.solicitud.fechaHoraInicioRecurso);
        this.fechaFinParse = this.actualizarFechaInv(this.solicitud.fechaHoraFinRecurso);
        this.unidadSeleccionada = this.solicitud.unidadUsuaria;
      });
      setTimeout(() => {
        this.solicitudService.getRecursoDeSolicitud(this.idSolicitud).subscribe((response) => {
          this.solicitud.recurso = this.solicitudService.mapearRecurso((response));
        });
      }, 700);

      setTimeout(() => {
        this.uRlRecursoSeleccionado = this.solicitud.recurso.url;
        this.categoriaSeleccionada = this.solicitud.recurso.categoria;
        this.filtrar();
      }, 900);

    } else { //creación
      this.solicitud.estado = "Planificada";
      this.solicitud.etiqueta = "#1CC7F2"
      this.fechaSolicitudParse = this.fechaActual;
    }
  }


  //método que asigna los valores de las fechas del formulario a los distintos campos del objeto solicitud
  actualizarFechas(): void {
    this.solicitud.fechaSolicitud = this.actualizarFechaSolicitud(this.fechaSolicitudParse);
    this.solicitud.fechaHoraInicioRecurso = this.actualizarFechaSolicitud(this.fechaInicioParse);
    this.solicitud.fechaHoraFinRecurso = this.actualizarFechaSolicitud(this.fechaFinParse);
  }


  //método que actualiza datos
  actualizarDatos(): void {
    this.actualizarFechas();
    //asigna el nombre de la Unidad seleccionada en el form (select)
    this.solicitud.unidadUsuaria = this.unidadSeleccionada;
    //asigna el endopint del recurso seleccionado en la solicitud
    this.solicitud.recurso = this.uRlRecursoSeleccionado;
  }

  //método que crea una solicitud con los datos del formulario y redirecciona a la página de solicitudes de recursos
  create(): void {
    this.actualizarDatos();
    this.solicitudService.createSolicitudCalendario(this.solicitud).subscribe((response) => {
      this.router.navigate([`/principalCenad/${this.idCenad}/calendarios/${this.idCenad}`]);
    });
  }

  //método que borra una solicitud, solicitando previamente confirmación
  borrarSolicitud(): void {
    if (confirm('Va a eliminar una Solicitud, ¿Está seguro?')) {
      this.solicitudService.deleteSolicitudCalendario(this.solicitud).subscribe((response) => {
        this.router.navigate([`/principalCenad/${this.idCenad}/calendarios/${this.idCenad}`]);
      });
    }
  }

  //método que se ejecuta al hacer click sobre el botón Actualizar
  //actualiza los datos del formulario y solicita confirmación para tramitar la solicitud
  //en caso afirmativo, cambia el estado y redirecciona a la paǵina de solicitudes de recursos
  actualizar(): void {
    this.actualizarDatos();

    this.solicitudService.updateSolicitudCalendario(this.idSolicitud, this.solicitud).subscribe((response) => {

      this.router.navigate([`/principalCenad/${this.idCenad}/calendarios/${this.idCenad}`]);
    });
  }



  //método que se ejecuta cuando se produce un cambio en el input de la fecha del formulario
  //comprueba si la fecha de fin de recurso es menor que la fecha de inicio
  //en caso afirmativo muestra un mensaje por pantalla e inicializa el valor de la fecha
  verificarFechas(): void {
    if (this.cambiarFormatoDate2sinHora(this.fechaFinParse) < this.cambiarFormatoDate2sinHora(this.fechaInicioParse)) {
      alert('La fecha de FIN debe ser mayor que la de INICIO');
      this.fechaFinParse = "";
    }
  }

  //método que recibe un parámetro string y lo transforma a un Date con formato yyyy-MM-dd
  cambiarFormatoDate2sinHora(date: string): Date {
    let arrayDate: any[] = date.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0]);
    return fechaDate;
  }

  //método que recibe un parámetro string y lo transforma a un string con formato yyyy-MM-dd
  cambiarFormatoDateStringsinHora(date: string): string {
    let stringDate = this.miDatePipe.transform(date, 'yyyy-MM-dd');
    return stringDate;
  }

  //método que recibe un parámetro string y lo transforma a un string con formato yyyy-MM-dd
  actualizarFechaInv(fecha: string): string {
    let fechaActualizadaInv = fecha.slice(6, 10) + "-" + fecha.slice(3, 5) + "-" + fecha.slice(0, 2);
    return fechaActualizadaInv;
  }

  //método que recibe como parámetro string la fecha de la solicitud y lo transforma a un string con formato dd-MM-yyyy 00:00:00
  actualizarFechaSolicitud(fecha: string): string {
    let fechaActualizada = fecha.slice(8, 11) + "-" + fecha.slice(5, 7) + "-" + fecha.slice(0, 4) + " 00:00:01";
    return fechaActualizada;
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
    this.categoriaSeleccionada = new CategoriaImpl();
    this.uRlRecursoSeleccionado = "";
  }

}
