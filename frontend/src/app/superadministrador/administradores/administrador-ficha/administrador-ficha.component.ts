import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cenad } from '../../models/cenad';
import { UsuarioAdministradorImpl } from '../../models/usuarioAdministrador-impl';
import { CenadService } from '../../service/cenad.service';
import { UsuarioAdministradorService } from '../../service/usuarioAdministrador.service';

@Component({
  selector: 'app-administrador-ficha',
  templateUrl: './administrador-ficha.component.html',
  styleUrls: ['./administrador-ficha.component.css']
})
export class AdministradorFichaComponent implements OnInit {

  @Input() usuarioAdministrador: UsuarioAdministradorImpl;
  @Output() usuarioAdministradorEliminar = new EventEmitter<UsuarioAdministradorImpl>();
  @Output() usuarioAdministradorEditar = new EventEmitter<UsuarioAdministradorImpl>();
  cenads: Cenad[] = [];
  cenadsSinAdmin: Cenad[] = [];

  constructor(private usuarioAdministradorService: UsuarioAdministradorService,
    private cenadService: CenadService) { }

  ngOnInit() {
    this.cenadService.getCenads().subscribe((response) => this.cenads = this.cenadService.extraerCenads(response));
    
    setTimeout(()=> {
      for (let c of this.cenads) {
        this.usuarioAdministradorService.getUsuarioAdministrador(c).subscribe((response) => c.usuarioAdministrador = this.usuarioAdministradorService.mapearUsuario(response));
    
        setTimeout(() => {
          if (c.usuarioAdministrador) {
            c.tieneAdmin = true;
          }
          this.cenadsSinAdmin = this.cenads.filter(c => !c.tieneAdmin);
        }, 700);
      }
    }, 800);
    
  }

  eliminar(): void {
    this.usuarioAdministradorEliminar.emit(this.usuarioAdministrador);
  }

  editar(): void {
    this.usuarioAdministradorEditar.emit(this.usuarioAdministrador);
  }
}
