import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from 'src/app/categorias/models/categoria';
import { Unidad } from 'src/app/unidades/models/unidad';
import { SolicitudRecurso } from '../models/solicitud-recurso';
import { SolicitudRecursoService } from '../service/solicitud-recurso.service';
import { SolicitudesRecursosComponent } from '../solicitudes-recursos/solicitudes-recursos.component';

@Component({
  selector: 'app-solicitudes-todas',
  templateUrl: './solicitudes-todas.component.html',
  styleUrls: ['./solicitudes-todas.component.css'],
  providers: [DatePipe]
})
export class SolicitudesTodasComponent implements OnInit {

  //icono FontAwesome
  faVolver = faArrowAltCircleLeft;
  // id del Cenad
  idCenad: string = "";
  //array[] de solicitudes filtradas
  solicitudesFiltradas: SolicitudRecurso[] = [];
  //array de las solicitudes del Cenad
  solicitudesCenad: SolicitudRecurso[];
  //array[] de las categorias del Cenad
  categoriasCenad: Categoria[] = [];
  //array[] de las Categorias filtradas
  categoriasFiltradas: Categoria[] = [];
  //array[] de Unidades
  unidades: Unidad[] = [];
  //estado de la solicitud seleccionado
  estadoSeleccionado: string = "";
  //instancia de Categoria seleccionada
  categoriaSeleccionada: Categoria;
  //instancia objeto Unidad seleccionada
  unidadSeleccionada: Unidad;
  //filtros de fecha
  fechaInicioSeleccionada: Date;
  fechaFinSeleccionada: Date;
  //si se ha producido un error
  isError: boolean = false;
  //si es la fecha actual
  isFechaActual: boolean = false;
  //fecha actual del sistema
  fechaActual: Date;

  constructor(private solicitudService: SolicitudRecursoService,
    private router: Router, private activateRoute: ActivatedRoute, private miDatePipe: DatePipe) { }

  ngOnInit() {
    this.getParams();
    this.getFechaActual();
    this.getDatosInicio();
  }

  //método que obtiene el id del Cenad pasado como parámetro en la barra de navegación
  getParams(): void {
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
  }

  //método que obtiene la fecha actual del sistema
  getFechaActual(): void {
    const tiempoTranscurrido = Date.now();
    this.fechaActual = this.cambiarFormatoDate(new Date(tiempoTranscurrido));
  }

  //método que obtiene los datos iniciales
  getDatosInicio(): void {
    //asigna los valores de las variables estáticas
    this.solicitudesCenad = SolicitudesRecursosComponent.solicitudesCenad;
    this.estadoSeleccionado = SolicitudesRecursosComponent.estadoSolicitud;
    this.filtrar();
    //obtiene del local storage las categorias del Cenad
    this.categoriasCenad = JSON.parse(localStorage.getItem(`categorias_${this.idCenad}`));
    //obtiene del local storage las unidades
    this.unidades = JSON.parse(localStorage.unidades);
  }

  //método que se ejecuta al hacer click sobre el botón Borrar Filtro
  //inicializa las variables en función del filtro donde se haya hecho click
  borrarFiltro(filtro: string): void {
    if (filtro === 'categoria') {
      this.categoriaSeleccionada = null;
    }
    if (filtro === 'fecha') {
      this.fechaInicioSeleccionada = null;
      this.fechaFinSeleccionada = null;
    }
    if (filtro === 'unidad') {
      this.unidadSeleccionada = null;
    }
    this.filtrar();
  }

  //métodos utilizados para parsear las fechas
  //método que recibe como parámetro un dato tipo Date y devuelve un dato tipo Date con el formato 'yyyy-MM-dd HH:mm:ss'
  cambiarFormatoDate(date: Date): Date {
    let stringDate = this.miDatePipe.transform(date, 'dd-MM-yyyy HH:mm:ss');
    let arrayDate: any[] = stringDate.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0], arrayDate[3], arrayDate[4], arrayDate[5]);
    return fechaDate;
  }

  //método que recibe como parámetro un dato tipo Date y devuelve un dato tipo Date con el formato 'yyyy-MM-dd'
  cambiarFormatoDatesinHora(date: Date): Date {
    let stringDate = this.miDatePipe.transform(date, 'dd-MM-yyyy');
    let arrayDate: any[] = stringDate.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0]);
    console.log(fechaDate);
    return fechaDate;
  }

  //método que recibe como parámetro un dato tipo string y devuelve un dato tipo Date con el formato 'yyyy-MM-dd HH:mm:ss'
  cambiarFormatoDate2(date: string): Date {
    let arrayDate: any[] = date.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0], arrayDate[3], arrayDate[4], arrayDate[5]);
    return fechaDate;
  }

  //método que recibe como parámetro un dato tipo string y devuelve un dato tipo Date con el formato 'yyyy-MM-dd'
  cambiarFormatoDate2sinHora(date: string): Date {
    let arrayDate: any[] = date.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0]);
    console.log(fechaDate);
    return fechaDate;
  }

  //método principal que realiza los filtros en los diferentes arrays de solicitudes
  filtrar(): void {
    if (this.estadoSeleccionado == "Todas") {
      this.filtrarTodas();
    } else if (!this.isFechaActual) {
      if (this.fechaFinSeleccionada >= this.fechaInicioSeleccionada || !this.fechaInicioSeleccionada && !this.fechaFinSeleccionada) {
        if (this.unidadSeleccionada && this.categoriaSeleccionada && this.fechaInicioSeleccionada && this.fechaFinSeleccionada) {
          let dateIni = this.cambiarFormatoDate(this.fechaInicioSeleccionada);
          let dateFin = this.cambiarFormatoDate(this.fechaFinSeleccionada);
          this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.estado == this.estadoSeleccionado && s.usuarioNormal.unidad.nombre == this.unidadSeleccionada.nombre &&
            s.recurso.categoria.nombre == this.categoriaSeleccionada.nombre && this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) >= dateIni
            && this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) <= dateFin).sort(function (a, b): number {
              let resultado: number = 0;
              if (a.estado == b.estado) {
                a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
              } else {
                a.estado > b.estado ? resultado = 1 : resultado = -1;
              }
              return resultado;
            });
        } else if (this.unidadSeleccionada && this.categoriaSeleccionada) {
          this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.estado == this.estadoSeleccionado && s.usuarioNormal.unidad.nombre == this.unidadSeleccionada.nombre
            && s.recurso.categoria.nombre == this.categoriaSeleccionada.nombre).sort(function (a, b): number {
              let resultado: number = 0;
              if (a.estado == b.estado) {
                a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
              } else {
                a.estado > b.estado ? resultado = 1 : resultado = -1;
              }
              return resultado;
            });
        } else if (this.categoriaSeleccionada && this.fechaInicioSeleccionada && this.fechaFinSeleccionada) {
          let dateIni = this.cambiarFormatoDate(this.fechaInicioSeleccionada);
          let dateFin = this.cambiarFormatoDate(this.fechaFinSeleccionada);
          this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.estado == this.estadoSeleccionado && s.recurso.categoria.nombre == this.categoriaSeleccionada.nombre
            && this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) >= dateIni
            && this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) <= dateFin).sort(function (a, b): number {
              let resultado: number = 0;
              if (a.estado == b.estado) {
                a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
              } else {
                a.estado > b.estado ? resultado = 1 : resultado = -1;
              }
              return resultado;
            });
        } else if (this.unidadSeleccionada && this.fechaInicioSeleccionada && this.fechaFinSeleccionada) {
          let dateIni = this.cambiarFormatoDate(this.fechaInicioSeleccionada);
          let dateFin = this.cambiarFormatoDate(this.fechaFinSeleccionada);
          this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.estado == this.estadoSeleccionado && s.usuarioNormal.unidad.nombre == this.unidadSeleccionada.nombre
            && this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) >= dateIni
            && this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) <= dateFin).sort(function (a, b): number {
              let resultado: number = 0;
              if (a.estado == b.estado) {
                a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
              } else {
                a.estado > b.estado ? resultado = 1 : resultado = -1;
              }
              return resultado;
            });
        } else if (this.unidadSeleccionada) {
          this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.estado == this.estadoSeleccionado && s.usuarioNormal.unidad.nombre == this.unidadSeleccionada.nombre).sort(function (a, b): number {
            let resultado: number = 0;
            if (a.estado == b.estado) {
              a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
            } else {
              a.estado > b.estado ? resultado = 1 : resultado = -1;
            }
            return resultado;
          });
        } else if (this.categoriaSeleccionada) {
          this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.estado == this.estadoSeleccionado && s.recurso.categoria.nombre == this.categoriaSeleccionada.nombre).sort(function (a, b): number {
            let resultado: number = 0;
            if (a.estado == b.estado) {
              a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
            } else {
              a.estado > b.estado ? resultado = 1 : resultado = -1;
            }
            return resultado;
          });
        } else if (this.fechaInicioSeleccionada && this.fechaFinSeleccionada) {
          let dateIni = this.cambiarFormatoDate(this.fechaInicioSeleccionada);
          let dateFin = this.cambiarFormatoDate(this.fechaFinSeleccionada);
          this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.estado == this.estadoSeleccionado && this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) >= dateIni
            && this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) <= dateFin).sort(function (a, b): number {

              return a.fechaHoraInicioRecurso > b.fechaHoraInicioRecurso ? 1
                : a.fechaHoraInicioRecurso < b.fechaHoraInicioRecurso ? -1 : 0;
            });
        } else {
          this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.estado == this.estadoSeleccionado).sort(function (a, b): number {
            let resultado: number = 0;
            if (a.estado == b.estado) {
              a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
            } else {
              a.estado > b.estado ? resultado = 1 : resultado = -1;
            }
            return resultado;
          });
        }
      }
      //this.isFechaActual
    } else if (this.unidadSeleccionada && this.categoriaSeleccionada) {
      this.fechaInicioSeleccionada && this.fechaFinSeleccionada ? this.borrarFiltro('fecha') : '';
      this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.estado == this.estadoSeleccionado && s.usuarioNormal.unidad.nombre == this.unidadSeleccionada.nombre
        && s.recurso.categoria.nombre == this.categoriaSeleccionada.nombre && this.cambiarFormatoDate2sinHora(s.fechaHoraInicioRecurso).valueOf() == this.cambiarFormatoDatesinHora(this.fechaActual).valueOf()).sort(function (a, b): number {
          let resultado: number = 0;
          if (a.estado == b.estado) {
            a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
          } else {
            a.estado > b.estado ? resultado = 1 : resultado = -1;
          }
          return resultado;
        });
    } else if (this.unidadSeleccionada) {
      this.fechaInicioSeleccionada && this.fechaFinSeleccionada ? this.borrarFiltro('fecha') : '';
      this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.estado == this.estadoSeleccionado && s.usuarioNormal.unidad.nombre == this.unidadSeleccionada.nombre
        && this.cambiarFormatoDate2sinHora(s.fechaHoraInicioRecurso).valueOf() == this.cambiarFormatoDatesinHora(this.fechaActual).valueOf()).sort(function (a, b): number {
          let resultado: number = 0;
          if (a.estado == b.estado) {
            a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
          } else {
            a.estado > b.estado ? resultado = 1 : resultado = -1;
          }
          return resultado;
        });
    } else if (this.categoriaSeleccionada) {
      this.fechaInicioSeleccionada && this.fechaFinSeleccionada ? this.borrarFiltro('fecha') : '';
      this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.estado == this.estadoSeleccionado && s.recurso.categoria.nombre == this.categoriaSeleccionada.nombre
        && this.cambiarFormatoDate2sinHora(s.fechaHoraInicioRecurso).valueOf() == this.cambiarFormatoDatesinHora(this.fechaActual).valueOf()).sort(function (a, b): number {
          let resultado: number = 0;
          if (a.estado == b.estado) {
            a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
          } else {
            a.estado > b.estado ? resultado = 1 : resultado = -1;
          }
          return resultado;
        });
    } else {
      this.fechaInicioSeleccionada && this.fechaFinSeleccionada ? this.borrarFiltro('fecha') : '';
      this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.estado == this.estadoSeleccionado
        && this.cambiarFormatoDate2sinHora(s.fechaHoraInicioRecurso).valueOf() == this.cambiarFormatoDatesinHora(this.fechaActual).valueOf()).sort(function (a, b): number {
          let resultado: number = 0;
          if (a.estado == b.estado) {
            a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
          } else {
            a.estado > b.estado ? resultado = 1 : resultado = -1;
          }
          return resultado;
        });
    }
  }

  //método que realiza los filtros en el array de solicitudes del cenad
  filtrarTodas(): void {
    console.log(this.isFechaActual);
    if (!this.isFechaActual) {
      if (this.fechaFinSeleccionada >= this.fechaInicioSeleccionada || !this.fechaInicioSeleccionada && !this.fechaFinSeleccionada) {
        if (this.unidadSeleccionada && this.categoriaSeleccionada && this.fechaInicioSeleccionada && this.fechaFinSeleccionada) {
          let dateIni = this.cambiarFormatoDate(this.fechaInicioSeleccionada);
          let dateFin = this.cambiarFormatoDate(this.fechaFinSeleccionada);
          this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.usuarioNormal.unidad.nombre == this.unidadSeleccionada.nombre &&
            s.recurso.categoria.nombre == this.categoriaSeleccionada.nombre && this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) >= dateIni
            && this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) <= dateFin).sort(function (a, b): number {
              let resultado: number = 0;
              if (a.estado == b.estado) {
                a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
              } else {
                a.estado > b.estado ? resultado = 1 : resultado = -1;
              }
              return resultado;
            });
        } else if (this.unidadSeleccionada && this.categoriaSeleccionada) {
          this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.usuarioNormal.unidad.nombre == this.unidadSeleccionada.nombre
            && s.recurso.categoria.nombre == this.categoriaSeleccionada.nombre).sort(function (a, b): number {
              let resultado: number = 0;
              if (a.estado == b.estado) {
                a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
              } else {
                a.estado > b.estado ? resultado = 1 : resultado = -1;
              }
              return resultado;
            });
        } else if (this.categoriaSeleccionada && this.fechaInicioSeleccionada && this.fechaFinSeleccionada) {
          let dateIni = this.cambiarFormatoDate(this.fechaInicioSeleccionada);
          let dateFin = this.cambiarFormatoDate(this.fechaFinSeleccionada);
          this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.recurso.categoria.nombre == this.categoriaSeleccionada.nombre
            && this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) >= dateIni
            && this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) <= dateFin).sort(function (a, b): number {
              let resultado: number = 0;
              if (a.estado == b.estado) {
                a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
              } else {
                a.estado > b.estado ? resultado = 1 : resultado = -1;
              }
              return resultado;
            });
        } else if (this.unidadSeleccionada && this.fechaInicioSeleccionada && this.fechaFinSeleccionada) {
          let dateIni = this.cambiarFormatoDate(this.fechaInicioSeleccionada);
          let dateFin = this.cambiarFormatoDate(this.fechaFinSeleccionada);
          this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.usuarioNormal.unidad.nombre == this.unidadSeleccionada.nombre
            && this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) >= dateIni
            && this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) <= dateFin).sort(function (a, b): number {
              let resultado: number = 0;
              if (a.estado == b.estado) {
                a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
              } else {
                a.estado > b.estado ? resultado = 1 : resultado = -1;
              }
              return resultado;
            });
        } else if (this.unidadSeleccionada) {
          this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.usuarioNormal.unidad.nombre == this.unidadSeleccionada.nombre).sort(function (a, b): number {
            let resultado: number = 0;
            if (a.estado == b.estado) {
              a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
            } else {
              a.estado > b.estado ? resultado = 1 : resultado = -1;
            }
            return resultado;
          });
        } else if (this.categoriaSeleccionada) {
          this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.recurso.categoria.nombre == this.categoriaSeleccionada.nombre).sort(function (a, b): number {
            let resultado: number = 0;
            if (a.estado == b.estado) {
              a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
            } else {
              a.estado > b.estado ? resultado = 1 : resultado = -1;
            }
            return resultado;
          });
        } else if (this.fechaInicioSeleccionada && this.fechaFinSeleccionada) {
          let dateIni = this.cambiarFormatoDate(this.fechaInicioSeleccionada);
          let dateFin = this.cambiarFormatoDate(this.fechaFinSeleccionada);
          this.solicitudesFiltradas = this.solicitudesCenad.filter(s => this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) >= dateIni
            && this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) <= dateFin).sort(function (a, b): number {

              return a.fechaHoraInicioRecurso > b.fechaHoraInicioRecurso ? 1
                : a.fechaHoraInicioRecurso < b.fechaHoraInicioRecurso ? -1 : 0;
            });
        } else {
          this.solicitudesFiltradas = this.solicitudesCenad.sort(function (a, b): number {
            let resultado: number = 0;
            if (a.estado == b.estado) {
              a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
            } else {
              a.estado > b.estado ? resultado = 1 : resultado = -1;
            }
            return resultado;
          });
        }
      }
      //this.isFechaActual
    } else if (this.unidadSeleccionada && this.categoriaSeleccionada) {
      this.fechaInicioSeleccionada && this.fechaFinSeleccionada ? this.borrarFiltro('fecha') : '';
      this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.usuarioNormal.unidad.nombre == this.unidadSeleccionada.nombre
        && s.recurso.categoria.nombre == this.categoriaSeleccionada.nombre && this.cambiarFormatoDate2sinHora(s.fechaHoraInicioRecurso).valueOf() == this.cambiarFormatoDatesinHora(this.fechaActual).valueOf()).sort(function (a, b): number {
          let resultado: number = 0;
          if (a.estado == b.estado) {
            a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
          } else {
            a.estado > b.estado ? resultado = 1 : resultado = -1;
          }
          return resultado;
        });
    } else if (this.unidadSeleccionada) {
      this.fechaInicioSeleccionada && this.fechaFinSeleccionada ? this.borrarFiltro('fecha') : '';
      this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.usuarioNormal.unidad.nombre == this.unidadSeleccionada.nombre
        && this.cambiarFormatoDate2sinHora(s.fechaHoraInicioRecurso).valueOf() == this.cambiarFormatoDatesinHora(this.fechaActual).valueOf()).sort(function (a, b): number {
          let resultado: number = 0;
          if (a.estado == b.estado) {
            a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
          } else {
            a.estado > b.estado ? resultado = 1 : resultado = -1;
          }
          return resultado;
        });
    } else if (this.categoriaSeleccionada) {
      this.fechaInicioSeleccionada && this.fechaFinSeleccionada ? this.borrarFiltro('fecha') : '';
      this.solicitudesFiltradas = this.solicitudesCenad.filter(s => s.recurso.categoria.nombre == this.categoriaSeleccionada.nombre
        && this.cambiarFormatoDate2sinHora(s.fechaHoraInicioRecurso).valueOf() == this.cambiarFormatoDatesinHora(this.fechaActual).valueOf()).sort(function (a, b): number {
          let resultado: number = 0;
          if (a.estado == b.estado) {
            a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
          } else {
            a.estado > b.estado ? resultado = 1 : resultado = -1;
          }
          return resultado;
        });
    } else {
      this.fechaInicioSeleccionada && this.fechaFinSeleccionada ? this.borrarFiltro('fecha') : '';
      this.solicitudesFiltradas = this.solicitudesCenad.filter(s => this.cambiarFormatoDate2sinHora(s.fechaHoraInicioRecurso).valueOf() == this.cambiarFormatoDatesinHora(this.fechaActual).valueOf()).sort(function (a, b): number {
        let resultado: number = 0;
        if (a.estado == b.estado) {
          a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
        } else {
          a.estado > b.estado ? resultado = 1 : resultado = -1;
        }
        return resultado;
      });
    }
  }
}