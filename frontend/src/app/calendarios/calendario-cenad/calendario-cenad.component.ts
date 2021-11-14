import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/angular';
import { SolicitudRecurso } from 'src/app/solicitudes-recursos/models/solicitud-recurso';
import { SolicitudRecursoService } from 'src/app/solicitudes-recursos/service/solicitud-recurso.service';
import { INITIAL_EVENTS, createEventId } from '../event-utils';
import esLocale from '@fullcalendar/core/locales/es';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from 'src/app/categorias/models/categoria';
import { Unidad } from 'src/app/unidades/models/unidad';
import { RecursoService } from 'src/app/recursos/service/recurso.service';
import { Recurso } from 'src/app/recursos/models/recurso';
import { CategoriaImpl } from 'src/app/categorias/models/categoria-impl';
import { RecursoImpl } from 'src/app/recursos/models/recurso-impl';
import { UsuarioNormalImpl } from 'src/app/usuarios/models/usuarioNormal-impl';

@Component({
  selector: 'app-calendario-cenad',
  templateUrl: './calendario-cenad.component.html',
  styleUrls: ['./calendario-cenad.component.css'],
  providers: [DatePipe]
})
export class CalendarioCenadComponent implements OnInit {

  //icono FontAwesome
  faVista = faGlasses;
  //variables para guardar las solicitudes de un Cenad
  solicitudesCenad: SolicitudRecurso[] = [];
  //solicitudes validadas por el administrador del Cenad
  solicitudesCenadValidadas: SolicitudRecurso[] = [];
  //solicitudes solicitadas por la Unidad
  solicitudesCenadSolicitadas: SolicitudRecurso[] = [];
  //solicitudes validadas por el administrador del Cenad
  solicitudesCenadCalendarioValidadas: any[] = [];
  //solicitudes solicitadas por la Unidad
  solicitudesCenadCalendarioSolicitadas: any[] = [];
  //solicitudes planificadas por el superadministrador
  solicitudesCenadCalendarioPlanificadas: any[] = [];
  //solicitudes validadas FILTRADAS por el administrador del Cenad
  solicitudesCenadCalendarioValidadasFiltro: any[] = [];
  //solicitudes solicitadas FILTRADAS por la Unidad
  solicitudesCenadCalendarioSolicitadasFiltro: any[] = [];
  //solicitudes planificadas FILTRADAS por el superadministrador
  solicitudesCenadCalendarioPlanificadasFiltro: any[] = [];
  //id del Cenad
  idCenad: string = "";
  //fecha actual del sistema
  fechaActual: string;
  //variables para parsear las fechas
  fechaInicioParse: string;
  fechaFinParse: string;
  //comprobación si un usuario se ha autenticado
  isAutenticado: boolean = false;
  //si un Usuario es Normal
  isUsuarioNormal: boolean = false;
  // si un usuario es Administrador
  isAdministrador: boolean = false;
  // si un usuario es Gestor
  isGestor: boolean = false;
  //si la solicitud tiene el estado borrador
  isBorrador: boolean = false;
  //si el estado de la solicitud es Validad
  isValidada: boolean = false;
  //si el estado de la solicitud es Solicitada
  isSolicitada: boolean = true;
  //si el estado de la solicitud es Planificada
  isPlanificada: boolean = false;
  //array[] de las categorías de un Cenad
  categoriasCenad: Categoria[] = [];
  //array[] de las categorias filtradas (para filtro de Solicitadas/Validadas)
  categoriasFiltradas: Categoria[] = [];
  //array[] de las categorias filtradas (para filtro de Planificadas)
  categoriasFiltradasPlan: Categoria[] = [];
  //array[] de Unidades
  unidades: Unidad[] = [];
  //array[] de Recursos de una categoría (para filtro de Solicitadas/Validadas)
  recursosDeCategoria: Recurso[] = [];
  //array[] de Recursos de una categoría (para filtro de Planificadas)
  recursosDeCategoriaPlan: Recurso[] = [];
  //instancia objeto Categoría
  categoriaSeleccionada: Categoria = new CategoriaImpl();
  //instancia objeto Categoría
  categoriaSeleccionadaPlan: Categoria = new CategoriaImpl();
  //endpoint del recurso seleccionado
  uRlRecursoSeleccionado: string = "";
  //id del recurso seleccionado (filtro solicitudes Solicitadas/Validadas)
  idRecursoSeleccionado: string = "";
  //id del recurso seleccionado (filtro solicitudes Planificadas)
  idRecursoSeleccionadoPlan: string = "";
  //instancia objeto Recurso
  recurso: Recurso = new RecursoImpl();
  //si se muestra/oculta el calendario de solicitudes Solicitadas/Validadas
  calendarVisible: boolean = true;
  //si se muestra/oculta el calendario de solicitudes Planificadas
  calendarPlanVisible: boolean = true;
  //opciones de los diferentes calendarios
  calendarOptionsSolicitadas: CalendarOptions;
  calendarOptionsValidadas: CalendarOptions;
  calendarOptionsPlanificadas: CalendarOptions;

  constructor(private activateRoute: ActivatedRoute, private solicitudService: SolicitudRecursoService,
    private miDatePipe: DatePipe, private router: Router, private recursoService: RecursoService) { }

  ngOnInit() {
    this.getParams();
    this.getFechaActual();
    this.comprobarUser();
    this.getCategorias();
    this.getUcos();
    this.iniciarCalendario();
  }

  //método que captura los parámetros (idSolicitud y idCenad) de la barra de navegación
  getParams(): void {
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
  }

  //método que captura la fecha actual y actualiza la variable local fechaActual: string en formato YYYY-MM-dd (input date)
  getFechaActual(): void {
    const tiempoTranscurrido = Date.now();
    this.fechaActual = this.cambiarFormatoDateStringsinHora(new Date(tiempoTranscurrido).toString());
  }

  //método que comprueba el rol del usuario logeado en el sistema
  comprobarUser(): void {
    this.isAutenticado = sessionStorage.isLogged;
    if (this.isAutenticado) {
      if (sessionStorage.isAdmin == "true" && this.idCenad == sessionStorage.idCenad) {
        this.isAdministrador = true;
      } else if (sessionStorage.isGestor == "true" && this.idCenad == sessionStorage.idCenad) {
        this.isGestor = true;
      } else if (sessionStorage.isNormal == "true") {
        this.isUsuarioNormal = true;
      }
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

  //metodo que carga en el calendario las solicitudes de la API
  iniciarCalendario(): void {
    this.cargarSolicitudes();
    setTimeout(() => {
      this.cargarParametrosCalendario();
    }, 2000);
  }

  //metodo que obtiene un array de las solicitudes de un Cenad y posteriormente filtra este array:
  //por el estado de la solicitud
  //generando un array por cada estado (Validada, Solicitada y Planificada)
  cargarSolicitudes(): void {
    //obtiene de la API las solicitudes con estado Validadas
    this.solicitudService.getSolicitudesDeCenadEstado(this.idCenad, "Validada").subscribe((response) => {
      this.solicitudesCenadCalendarioValidadas = this.solicitudService.extraerSolicitudesCalendario(response);
      setTimeout(() => {
        this.solicitudesCenadCalendarioValidadas = this.actualizarDatosSolicitudes(this.solicitudesCenadCalendarioValidadas);
      }, 700);
    });
    //obtiene de la API las solicitudes con estado Solicitada
    this.solicitudService.getSolicitudesDeCenadEstado(this.idCenad, "Solicitada").subscribe((response) => {
      this.solicitudesCenadCalendarioSolicitadas = this.solicitudService.extraerSolicitudesCalendario(response);
      setTimeout(() => {
        this.solicitudesCenadCalendarioSolicitadas = this.actualizarDatosSolicitudes(this.solicitudesCenadCalendarioSolicitadas);
      }, 700);
    });
    //obtiene de la API las solicitudes con estado Planificada
    this.solicitudService.getSolicitudesDeCenadEstado(this.idCenad, "Planificada").subscribe((response) => {
      this.solicitudesCenadCalendarioPlanificadas = this.solicitudService.extraerSolicitudesCalendario(response);
      setTimeout(() => {
        this.solicitudesCenadCalendarioPlanificadas = this.actualizarDatosSolicitudes(this.solicitudesCenadCalendarioPlanificadas);
      }, 700);
    });
  }

  //metodo que inicializa los datos de los calendarios
  cargarParametrosCalendario(): void {
    this.calendarOptionsSolicitadas = {
      locale: esLocale,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'listYear,dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialView: 'timeGridWeek',
      events: this.solicitudesCenadCalendarioSolicitadas,
      weekends: true,
      editable: false,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      displayEventEnd: true,
      displayEventTime: true
    };

    this.calendarOptionsValidadas = {
      locale: esLocale,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'listYear,dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialView: 'timeGridWeek',
      events: this.solicitudesCenadCalendarioValidadas,
      weekends: true,
      editable: false,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      displayEventEnd: true,
      displayEventTime: true
    };

    this.calendarOptionsPlanificadas = {
      locale: esLocale,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'listYear, dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialView: 'listYear',
      events: this.solicitudesCenadCalendarioPlanificadas,
      weekends: true,
      editable: false,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      displayEventEnd: true,
      displayEventTime: true
    };
  }



  //metodo que recorre un array de objetos pasado como parametro (que contiene los datos para el calendario) 
  //y actualiza el nombre del recurso, el nombre del usuario y el nombre de la Unidad, obteniendo estos datos de la API
  actualizarDatosSolicitudes(arraySolicitudes: any[]): any[] {
    arraySolicitudes.forEach((s) => {
      this.solicitudService.getRecursoUrl(s.urlRecurso).subscribe((response) => {
        s.recurso = this.solicitudService.mapearRecurso(response).nombre;
        s.idRecurso = this.solicitudService.mapearRecurso(response).idRecurso;
      });
      this.solicitudService.getUsuarioNormalDeSolicitud(s.id).subscribe((response) => {
        let user = new UsuarioNormalImpl();
        user = this.solicitudService.mapearUsuarioNormal(response);
        s.usuario = this.solicitudService.mapearUsuarioNormal(response).nombre;
        this.solicitudService.getUnidadDeUsuarioNormal(user.idUsuario).subscribe((response) => {
          s.title = "h  -  " + this.solicitudService.mapearUnidad(response).nombre + "  -  " + s.recurso;
        });
      });
      s.url = `/principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}/formulario/${this.idCenad}/${s.id}`;
    });
    return arraySolicitudes;
  }


  //método que recibe un parámetro string y lo transforma a un string con formato yyyy-MM-dd
  cambiarFormatoDateStringsinHora(date: string): string {
    let stringDate = this.miDatePipe.transform(date, 'yyyy-MM-dd');
    return stringDate;
  }

  //metodo que filtra las solicitudes mostradas en el calendario
  //por el recurso seleccionado o cuando borra los filtros
  filtrarCalendario(estado: string): void {
    if (estado == "Planificada") {
      this.isPlanificada = true;
      this.solicitudesCenadCalendarioPlanificadasFiltro = this.solicitudesCenadCalendarioPlanificadas.filter(s => s.idRecurso.valueOf().toString() == this.idRecursoSeleccionadoPlan);
      this.calendarOptionsPlanificadas.events = this.solicitudesCenadCalendarioPlanificadasFiltro;
    }
    if (estado == "Otro" && this.isSolicitada) {
      this.solicitudesCenadCalendarioSolicitadasFiltro = this.solicitudesCenadCalendarioSolicitadas.filter(s => s.idRecurso.valueOf().toString() == this.idRecursoSeleccionado);
      this.isValidada = false;
      this.calendarOptionsSolicitadas.events = this.solicitudesCenadCalendarioSolicitadasFiltro;
    }
    if (estado == "Otro" && this.isValidada) {
      this.solicitudesCenadCalendarioValidadasFiltro = this.solicitudesCenadCalendarioValidadas.filter(s => s.idRecurso.valueOf().toString() == this.idRecursoSeleccionado);
      this.isSolicitada = false;
      this.calendarOptionsValidadas.events = this.solicitudesCenadCalendarioValidadasFiltro;
    }
    if (estado == "borradoFiltros" && this.isSolicitada) {
      this.isValidada = false;
      this.calendarOptionsSolicitadas.events = this.solicitudesCenadCalendarioSolicitadas;
    }
    if (estado == "borradoFiltros" && this.isValidada) {
      this.isSolicitada = false;
      this.calendarOptionsValidadas.events = this.solicitudesCenadCalendarioValidadas;
    }
    if (estado == "borradoFiltros" && this.isPlanificada) {
      this.isPlanificada = false;
      this.calendarOptionsPlanificadas.events = this.solicitudesCenadCalendarioPlanificadas;
    }
  }

  //metodo para filtrar recursivamente las categorias
  filtrar(estado: string) {
    if (estado == "Solicitadas-Validadas") { //categoria seleccionada en el select de Solicitadas/Validadas
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
    } else if (estado == "Planificadas") { //categoria seleccionada en el select de Planificadas
      //rescata de la BD las subcategorias de la categoria seleccionada
      this.recursoService.getSubcategorias(this.categoriaSeleccionadaPlan).subscribe((response) =>
        this.categoriasFiltradasPlan = this.recursoService.extraerCategorias(response));
      setTimeout(() => {
        //si la categoria seleccionada no tiene subcategorias muestra los recursos de esa categoria
        if (this.categoriasFiltradasPlan.length === 0) {
          //rescatamos de la BD los recursos de ese cenad de esa categoria seleccionada
          this.recursoService.getRecursosDeCategoria(this.categoriaSeleccionadaPlan).subscribe((response) => {
            if (response._embedded) {//con este condicional elimino el error de consola si no hay ningun recurso
              this.recursosDeCategoriaPlan = this.recursoService.extraerRecursos(response);
            }
          });
        } else {//muestra los recursos de sus subcategorias, esten al nivel que esten
          this.recursoService.getRecursosDeSubcategorias(this.categoriaSeleccionadaPlan).subscribe((response) => this.recursosDeCategoriaPlan = this.recursoService.extraerRecursos(response));
        }
      }, 500);
    }
  }

  //metodo que resetea los filtros y regresa al listado de recursos del cenad
  borrarFiltros(estado: string) {
    if (estado == "Solicitadas-Validadas") {
      //rescata del local storage las categorias padre del cenad
      this.categoriasFiltradas = JSON.parse(localStorage.getItem(`categoriasPadre_${this.idCenad}`));
      //rescatamos del local storage los recursos de ese cenad
      this.recursosDeCategoria = JSON.parse(localStorage.getItem(`recursos_${this.idCenad}`));
      //resetea la categoria seleccionada
      this.categoriaSeleccionada = new CategoriaImpl();
      this.idRecursoSeleccionado = "";
    }
    if (estado == "Planificadas") {
      //rescata del local storage las categorias padre del cenad
      this.categoriasFiltradasPlan = JSON.parse(localStorage.getItem(`categoriasPadre_${this.idCenad}`));
      //rescatamos del local storage los recursos de ese cenad
      this.recursosDeCategoriaPlan = JSON.parse(localStorage.getItem(`recursos_${this.idCenad}`));
      //resetea la categoria seleccionada
      this.categoriaSeleccionadaPlan = new CategoriaImpl();
      this.idRecursoSeleccionadoPlan = "";
    }
    this.filtrarCalendario('borradoFiltros');
  }

  //método que se ejecuta al hacer click sobre "Ver Todas"
  //asigna a la variable estática estadoSolicitud el valor del estado de la solicitud donde se ha realizado click
  //y redirecciona a la página solicitudesTodas
  verTodas(): void {
    // SolicitudesRecursosComponent.estadoSolicitud = estado;
    this.router.navigate([`/principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}`]);
  }

  //metodo que cuando se realiza click sobre el radioButton cambia el valor de una variable boolenada
  cambiarEstado(estado: string): void {
    if (estado == "Solicitada") {
      this.isSolicitada = true;
      this.isValidada = false;
    } else {
      this.isSolicitada = false;
      this.isValidada = true;
    }
  }

  //metodo utilizado para ocultar o mostrar el calendario de Planificadas
  mostrarCalendarioPlan() {
    this.calendarPlanVisible = !this.calendarPlanVisible;
  }

  //metodo utilizado para ocultar o mostrar el calendario de Solicitadas/Planificadas
  mostrarCalendario() {
    this.calendarVisible = !this.calendarVisible;
  }
}
