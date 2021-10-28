import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { SolicitudRecurso } from '../models/solicitud-recurso';
import { SolicitudRecursoService } from '../service/solicitud-recurso.service';

@Component({
  selector: 'app-solicitud-recurso',
  templateUrl: './solicitud-recurso.component.html',
  styleUrls: ['./solicitud-recurso.component.css']
})
export class SolicitudRecursoComponent implements OnInit {

  @Input() solicitud: SolicitudRecurso;
  @Input() idCenad: string;
  //variable icono FontAwesome
  faEdit = faEdit;
  //variable para parsear la fecha de la solicitud
  fechaSolicitudParse: Date;


  constructor(private router: Router, private solicitudService: SolicitudRecursoService) { }

  ngOnInit() {
    //cambiar el formato de la fecha de la solicitud
    this.fechaSolicitudParse = this.cambiarFormatoDate2sinHora(this.solicitud.fechaSolicitud);
    //obtiene el objeto UsuarioNormal de la solicitud pasada como parámetro
    this.solicitudService.getUsuarioNormalDeSolicitud(this.solicitud.idSolicitud).subscribe((response)=> {
      this.solicitud.usuarioNormal = this.solicitudService.mapearUsuarioNormal(response);
   });
   //obtiene el objeto Recurso de la solicitud pasada como parámetro
   this.solicitudService.getRecursoDeSolicitud(this.solicitud.idSolicitud).subscribe((response)=> {
       this.solicitud.recurso = this.solicitudService.mapearRecurso((response));
   });
  }

  //método que al recibir como parámetro una solicitud, redirecciona el navegador al componente formulario para su edición
  editar(solicitudEdicion: SolicitudRecurso): void {
    this.router.navigate([`principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}/formulario/${this.idCenad}/${solicitudEdicion.idSolicitud}`]);
  }

  //método que recibe una variable string en formato fecha y devuelte una variable Date
  cambiarFormatoDate2sinHora(date: string): Date {
     let arrayDate: any[] = date.split(/[/\s\:\-]/g);
     let fechaDate: Date = new Date(arrayDate[2], arrayDate[1]-1, arrayDate[0]);
     return fechaDate;
   }

}
