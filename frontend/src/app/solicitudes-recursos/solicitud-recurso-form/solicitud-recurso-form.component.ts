import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faReadme } from '@fortawesome/free-brands-svg-icons';
import { faArrowAltCircleLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from 'src/app/categorias/models/categoria';
import { CategoriaImpl } from 'src/app/categorias/models/categoria-impl';
import { Recurso } from 'src/app/recursos/models/recurso';
import { RecursoService } from 'src/app/recursos/service/recurso.service';
import { TipoFormulario } from 'src/app/tiposFormulario/models/tipoFormulario';
import { Unidad } from 'src/app/unidades/models/unidad';
import { UnidadImpl } from 'src/app/unidades/models/unidad-impl';
import { UnidadService } from 'src/app/unidades/service/unidad.service';
import { UsuarioAdministrador } from 'src/app/usuarios/models/usuarioAdministrador';
import { UsuarioNormal } from 'src/app/usuarios/models/usuarioNormal';
import { SolicitudRecurso } from '../models/solicitud-recurso';
import { SolicitudRecursoImpl } from '../models/solicitud-recurso-impl';
import { SolicitudRecursoService } from '../service/solicitud-recurso.service';
import { SolicitudesRecursosComponent } from '../solicitudes-recursos/solicitudes-recursos.component';

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
  //estado seleccionado de la solicitud
  estadoSeleccionado: string = "";
  //estado anterior de la solicitud
  estadoAnterior: string = "";
  //estado de la solicitud
  estado: string = "";
  //nombre de la unidad
  unidad: string = "";
  //para cambiar de edición/creación en el formulario
  boton: boolean = true;
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
  isSolicitada: boolean = false;
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
  //array[] de Usuarios Normales
  usuariosNormales: UsuarioNormal [] = [];
  //array[] de Tipos de Formularios
  tiposFormulario: TipoFormulario [] = [];
  //array[] de Solicitudes del Cenad
  solicitudesCenad: SolicitudRecurso [] = [];
  //array[] de disponibildiad de Solicitudes del Cenad
  solicitudesDisponibilidadCenad: SolicitudRecurso [] = [];
  //fecha actual del sistema
  fechaActual: string;
  //nombre del usuario loggeado
  nombreUser: string = "";
  //id del usuario logggeado
  idUser: string = "";
  //id de la unidad del usuario normal
  idUnidad: string = "";
  //unidad del usuario normal loggeado
  nombreUnidad: string = "";
  //endpoint usuario normal loggeado
  urlUsuarioNormal: string = "";
  //codigo del Tipo de Formulario seleccionado
  codTipoFormSeleccionado: string = "";


  constructor(private activateRoute: ActivatedRoute, private solicitudService: SolicitudRecursoService,
    private recursoService: RecursoService, private router: Router, private miDatePipe: DatePipe, private unidadService: UnidadService) { }

  ngOnInit() {
    this.getParams();
    this.comprobarUser();
    this.getFechaActual();
    this.getCategorias();
    this.getUcos();
    this.getUsuariosNormales();
    this.getTiposFormulario();
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

  //metodo que obtiene del local storage todos los Usuarios Normales
  getUsuariosNormales(): void {
    this.usuariosNormales = JSON.parse(localStorage.usuariosNormal);
  }

  getTiposFormulario(): void {
    this.tiposFormulario = JSON.parse(localStorage.tiposFormulario);
    //console.log('tiposForm', this.tiposFormulario);
  }

  //método para cargar datos de pruebas
  cargaDatos(): void {
    this.nombreUser = sessionStorage.nombreUsuario;
    this.idUser = sessionStorage.idUsuario;
    if (sessionStorage.isNormal == "true") {
        this.idUnidad = sessionStorage.idUnidad;
        this.unidades.forEach(u => {
          u.idUnidad == this.idUnidad ? this.nombreUnidad = u.nombre : "";
        });
    }
    this.solicitudesCenad = SolicitudesRecursosComponent.solicitudesCenad;
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
        this.solicitud.estado == "Solicitada" ? this.isSolicitada = true : this.isSolicitada = false;
        this.solicitud.estado == "Validada" ? this.isValidada = true : this.isValidada = false;
        this.isAdministrador ? this.estadoSeleccionado = this.solicitud.estado : this.estado = this.solicitud.estado;
      });
      setTimeout(()=> {
        this.solicitudService.getUsuarioNormalDeSolicitud(this.idSolicitud).subscribe((response)=> {
             this.solicitud.usuarioNormal = this.solicitudService.mapearUsuarioNormal(response);
          });
        this.solicitudService.getRecursoDeSolicitud(this.idSolicitud).subscribe((response)=> {
              this.solicitud.recurso = this.solicitudService.mapearRecurso((response));
          });
      }, 600);

      setTimeout(()=> {
        this.uRlRecursoSeleccionado = this.solicitud.recurso.url;
        this.categoriaSeleccionada = this.solicitud.recurso.categoria;
        this.unidad = this.solicitud.usuarioNormal.unidad.nombre;
        this.filtrar();
      }, 800);

    } else { //creación
      this.estado = "Borrador";
      this.solicitud.estado = "Borrador";
      this.isBorrador = true;
      this.unidad = this.nombreUnidad;
      this.fechaSolicitudParse = this.fechaActual;
    }

  }

  //método que asigna los valores de las fechas del formulario a los distintos campos del objeto solicitud
  actualizarFechas(): void {
    this.solicitud.fechaSolicitud = this.actualizarFechaSolicitud(this.fechaSolicitudParse);
    this.solicitud.fechaHoraInicioRecurso = this.fechaInicioParse;
    this.solicitud.fechaHoraFinRecurso = this.fechaFinParse;
  }

  //metodo que busca en el array de usuarios normales su endpoint
  buscarUserNormal(idUserNormal: string): void {
    this.usuariosNormales.forEach(u => {
      if (u.idUsuario == idUserNormal) {
        this.urlUsuarioNormal = u.url;
      }
    });
  }

  //método que actualiza datos
  actualizarDatos(): void {
    this.actualizarFechas();
    if (this.isAdministrador) {
    //si el usuario logeado es administrador puede cambiar el estado de una solicitud
    this.solicitud.estado = this.estadoSeleccionado;
    //buscar el usuario normal de la solicitud y asigna su endpoint
    this.buscarUserNormal(this.solicitud.usuarioNormal.idUsuario);
    }
    if (this.isUsuarioNormal) {
    //asigna el endpoint del usuario normal que ha realizado la solicitud
    this.buscarUserNormal(this.idUser);
  }
    this.solicitud.usuarioNormal = this.urlUsuarioNormal;
    //asigna el endopint del recurso seleccionado en la solicitud
    this.solicitud.recurso = this.uRlRecursoSeleccionado;
  }

  //método que crea una solicitud con los datos del formulario y redirecciona a la página de solicitudes de recursos
  create(): void {
    this.actualizarDatos();
    this.solicitudService.create(this.solicitud).subscribe((response)=> {
      this.router.navigate([`/principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}`]);
    });
  }

  //método que borra una solicitud, solicitando previamente confirmación
  borrarSolicitud(): void {
    if (confirm('Va a eliminar una Solicitud, ¿Está seguro?')) {
      this.solicitudService.delete(this.solicitud).subscribe((response)=> {
       this.router.navigate([`/principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}`]);
      });
    }
  }

  //método que se ejecuta al hacer click sobre el botón Actualilzar
  //actualiza los datos del formulario y solicita confirmación para tramitar la solicitud
  //en caso afirmativo, cambia el estado y redirecciona a la paǵina de solicitudes de recursos
  actualizar(): void {
    this.actualizarDatos();
    if (this.isAdministrador && !this.isValidada && this.estadoSeleccionado != "Validada") {
      if (confirm ('¿Validar la Solicitud?')) {
        this.solicitud.estado = "Validada";
      }
    }
    if (this.isUsuarioNormal) {
      if (confirm ('¿Tramitar la Solicitud?')) {
      this.solicitud.estado = "Solicitada";
      }
    }
    this.solicitudService.update(this.solicitud).subscribe((response)=> {
      this.router.navigate([`/principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}`]);
    });
  }

  //método que se ejecuta al hacer click sobre el botón Tramitar Solicitud
  //cambia el estado de dicha solicitud a Solicitada y solicita confirmación para guardar los cambios
  //en caso afirmativo actualiza los datos y posteriormente los guarda y redirecciona a la página de
  //solicitudes de recursos
  tramitarSolicitud(): void {
      this.solicitud.estado = "Solicitada";
      this.actualizarDatos();
      this.solicitudService.update(this.solicitud).subscribe((response)=> {
       // console.log(response);
       this.router.navigate([`/principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}`]);
      });
  }

  //método que se ejecuta al hacer click sobre el botón Validar Solicitud
  //cambia el estado de la solicitud (Solicitada, Rechazada, Cancelada) a Validada
  validarSolicitud(): void {
    this.actualizarDatos();
    this.solicitud.estado = "Validada";
    this.solicitudService.update(this.solicitud).subscribe((response)=> {
     //console.log(response);
     this.router.navigate([`/principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}`]);
  });
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

  //
  comprobarDisponibilidad(): void {
    this.solicitudesDisponibilidadCenad = [];
    this.solicitudesDisponibilidadCenad = this.solicitudesCenad.filter(s => this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) <= this.cambiarFormatoDate2(this.solicitud.fechaHoraInicioRecurso)
      && this.cambiarFormatoDate2(s.fechaHoraFinRecurso) >= this.cambiarFormatoDate2(this.solicitud.fechaHoraInicioRecurso) && s.estado == "Validada" && s.recurso.idRecurso == this.solicitud.recurso.idRecurso).sort(function (a, b): number {
        let resultado: number = 0;
        if (a.usuarioNormal.unidad.nombre == b.usuarioNormal.unidad.nombre) {
          a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
        } else {
          a.usuarioNormal.unidad.nombre > b.usuarioNormal.unidad.nombre ? resultado = 1 : resultado = -1;
        }
        return resultado;
      });
  }
}
